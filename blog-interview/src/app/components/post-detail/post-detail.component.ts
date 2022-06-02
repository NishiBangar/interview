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

  constructor(
    private _blogService: BlogService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* this._blogService.getPostById(0).subscribe((post) => {
      this.post = post;
    }); */

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // this.postId = paramMap.get('postId');
      console.log(typeof Number(this.route.snapshot.paramMap.get('id')));
      this.postId = Number(this.route.snapshot.paramMap.get('id'));
      this._blogService.getPostById(this.postId).subscribe((post) => {
        this.post = post;
      });
    });
  }

  onUpdateForm(form: NgForm) {
    console.log('---- Update form ----');
    this._blogService.editPost(this.post);
  }
}
