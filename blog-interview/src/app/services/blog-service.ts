import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

// Assume this class is generated - no need to make any changes here

@Injectable()
export class BlogService {
  private _latestId: number = 1;
  private _posts: Post[] = [
    {
      title: 'My first post',
      content:
        'This is the first post. Testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing',
      id: 0,
      comments: [],
    },
  ];

  public getPosts(): Observable<Post[]> {
    return of(this._posts);
  }

  public getPostById(id: number): Observable<Post> {
    // @ts-ignore
    return of(
      this._posts.find((post) => {
        return post.id === id;
      })
    );
  }

  public createPost(post: Post): Observable<boolean> {
    console.log('------ Inside Blog Service ------');
    console.log(post);
    this._posts.push({ ...post, id: this._latestId++, comments: [] });
    return of(true);
  }

  public editPost(post: Post): Observable<boolean> {
    let postToEdit = this._posts.find((postToFind) => {
      return postToFind.id === post.id;
    });

    if (postToEdit) {
      postToEdit.title = post.title;
      postToEdit.content = post.content;
      return of(true);
    }

    return of(false);
  }

  public deletePost(id: number): Observable<boolean> {
    this._posts = this._posts.filter((post) => {
      return post.id !== id;
    });
    return of(true);
  }

  public createComment(postId: number, comment: Comment): Observable<boolean> {
    this._posts
      .find((post) => {
        return post.id === postId;
      })
      ?.comments?.push(comment);

    return of(true);
  }
}
