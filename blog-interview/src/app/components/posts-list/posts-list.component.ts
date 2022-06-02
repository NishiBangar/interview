import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BlogService } from '../../services/blog-service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  public posts: Post[] = [];

  // private postsSub: Subscription;
  private postsSub: any;

  constructor(private _blogService: BlogService) {}

  ngOnInit(): void {
    this._blogService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });

    // Setup up a listener to the subject
    this.postsSub = this._blogService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: any) {
    console.log('---- Delete post componenet');
    console.log(postId);
    this._blogService.deletePost(postId);
  }

  // To avoid memory leak, destroy the subscription data,
  // when the componenet dies.
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
