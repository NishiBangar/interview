import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { BlogService } from '../../services/blog-service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  // @ts-ignore
  public post: Post;
  private postId: number = 0;
  isLoading = false;

  constructor(
    private _blogService: BlogService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Loading spinner
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = Number(this.route.snapshot.paramMap.get('id'));
      this._blogService.getPostById(this.postId).subscribe((post) => {
        this.isLoading = false;
        this.post = { ...post };
      });
    });
  }

  onUpdateForm(form: NgForm) {
    // Loading spinner
    this.isLoading = true;
    console.log('---- Update form ----');
    this._blogService.editPost(this.post);
  }
}
