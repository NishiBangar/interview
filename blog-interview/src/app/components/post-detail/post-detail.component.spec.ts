import { ComponentFixture, TestBed } from '@angular/core/testing';
import { from, Observable, of } from 'rxjs';

import { PostDetailComponent } from './post-detail.component';
import { BlogService } from '../../services/blog-service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
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

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let blogService: BlogService;
  let editPostSpy: jasmine.Spy;
  let mockPost: {
    title: string;
    content: string;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [BlogService],
      imports: [RouterTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    blogService = TestBed.inject(BlogService);
    editPostSpy = spyOn(blogService, 'editPost').and.returnValue(of(true));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create comoponent without error', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      mockPost = {
        title: 'updated title',
        content: 'updated some fantastic content',
      };

      spy = spyOn(blogService, 'getPostById').and.returnValue(of(mockPost));

      component.ngOnInit();
    });

    it('should call service.getPostById()', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('should set the post property with the item returned from the service to update', () => {
      expect(component.post).toEqual(mockPost);
    });
  });

  // Edit Post form
  describe('Edit Post Form', () => {
    it('should have input field to Edit post title', () => {
      const title = fixture.nativeElement.querySelector('#title');
      expect(title).toBeTruthy();
    });

    it('should have text-area to Edit post content', () => {
      const content = fixture.nativeElement.querySelector('#content');
      expect(content).toBeTruthy();
    });

    it('should have submit button to update/save new post', () => {
      const submitButton = fixture.nativeElement.querySelector('#submitButton');
      expect(submitButton).toBeTruthy();
    });
  });

  // OnEditPost()
  describe('onEditPost()', () => {
    let createSpy: jasmine.Spy;
    beforeEach(() => {
      mockPost = {
        title: 'updatd title',
        content: 'updated some fantastic content',
      };

      fixture.nativeElement.querySelector('#title').value = mockPost.title;
      fixture.nativeElement
        .querySelector('#title')
        .dispatchEvent(new Event('input'));

      fixture.nativeElement.querySelector('#content').value = mockPost.content;

      fixture.nativeElement
        .querySelector('#content')
        .dispatchEvent(new Event('input'));
      fixture.detectChanges();
    });

    it('should call updatePost() service method when form is submitted', () => {
      fixture.nativeElement.querySelector('#submitButton').click();
      fixture.detectChanges();

      expect(editPostSpy).toHaveBeenCalled();
    });
  });
});
