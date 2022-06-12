import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';

import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { Router } from '@angular/router';

// Assume this class is generated - no need to make any changes here

@Injectable()
export class BlogService {
  constructor(private router: Router) {}
  private _latestId: number = 1;
  /* private _posts: Post[] = [
    {
      title: 'My first post',
      content:
        'This is the first post. Testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing',
      id: 0,
      comments: [],
    },
  ]; */
  _posts: Post[] = [];

  private postsUpdated = new Subject<Post[]>();

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
    this._posts.push({ ...post, id: this._latestId++, comments: [] });
    this.postsUpdated.next([...this._posts]);
    this.router.navigate(['/posts']);
    return of(true);
  }

  public editPost(post: Post): Observable<boolean> {
    let postToEdit = this._posts.find((postToFind) => {
      return postToFind.id === post.id;
    });

    if (postToEdit) {
      postToEdit.title = post.title;
      postToEdit.content = post.content;
      this.router.navigate(['/posts']);
      return of(true);
    }

    return of(false);
  }

  public deletePost(id: number): Observable<boolean> {
    this._posts = this._posts.filter((post) => {
      return post.id !== id;
    });
    this.postsUpdated.next([...this._posts]);
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

  // Listen to the object, ones the data is updated
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
