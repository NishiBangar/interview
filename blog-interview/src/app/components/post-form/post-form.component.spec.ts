import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { BlogService } from '../../services/blog-service';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/post';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Stub class for Router
class RouterStub {
  navigate(params: any) {
    return params;
  }
}

//Stub class for ActivatedRoute
class ActivatedRouteStub {
  params: Observable<any> = of(true);
}

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let blogService: BlogService;
  let createPostSpy: jasmine.Spy;
  let mockPost: {
    title: string;
    content: string;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostFormComponent],
      providers: [BlogService],
      imports: [RouterTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    blogService = TestBed.inject(BlogService);
    createPostSpy = spyOn(blogService, 'createPost').and.returnValue(of(true));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create comoponent without error', () => {
    expect(component).toBeTruthy();
  });

  // Create Post form
  describe('Create Post Form', () => {
    it('should have input field to enter post title', () => {
      const title = fixture.nativeElement.querySelector('#title');
      expect(title).toBeTruthy();
    });

    it('should have text-area to enter post content', () => {
      const content = fixture.nativeElement.querySelector('#content');
      expect(content).toBeTruthy();
    });

    it('should have submit button to create/save new post', () => {
      const submitButton = fixture.nativeElement.querySelector('#submitButton');
      expect(submitButton).toBeTruthy();
    });
  });

  // Create Post() method
  describe('onSavePost()', () => {
    let form: NgForm;
    let createSpy: jasmine.Spy;
    beforeEach(() => {
      mockPost = {
        title: 'test title',
        content: 'some fantastic content',
      };

      fixture.nativeElement.querySelector('#title').value = mockPost.title;
      fixture.nativeElement
        .querySelector('#title')
        .dispatchEvent(new Event('input'));

      fixture.nativeElement.querySelector('#content').value = mockPost.content;
      console.log(fixture.nativeElement.querySelector('#content').value);
      fixture.nativeElement
        .querySelector('#content')
        .dispatchEvent(new Event('input'));

      fixture.nativeElement.querySelector('#submitButton').click();
    });

    it('should update isLoading to true on submit event', () => {
      expect(component.isLoading).toBe(true);
    });

    it('should call createPost() service method when form is submitted', () => {
      expect(createPostSpy).toHaveBeenCalled();
    });
  });
});
