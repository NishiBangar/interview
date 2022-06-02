import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../../models/post';
import { BlogService } from '../../services/blog-service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  // Making Agular aware that an event will be emitted
  // Turns this property into an EVENT, which can be listened to from the outside (PARENT COMPONENT)
  // @Output() postCreated = new EventEmitter<Post>();

  enteredData = {
    title: '',
    content: '',
  };
  private mode = 'create';
  private postId: string = '';
  // post: Post;

  constructor(public blogService: BlogService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    // if Create or Edit post route
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        // this.postId = paramMap.get('postId');
        // this.post = this.blogService.getPost(this.postId);
      } else {
        this.mode = 'create';
        // this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    console.log('----- Form content');
    console.log(form);
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      // this.blogService.addPost(form.value.title, form.value.content);
      this.blogService.createPost({
        title: form.value.title,
        content: form.value.content,
      });
    } else {
      // this.blogService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
