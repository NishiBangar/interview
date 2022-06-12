import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListComponent } from './posts-list.component';
import { BlogService } from '../../services/blog-service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let blogService: BlogService;
  let getPostsSpy: jasmine.Spy;
  let mockPost: {
    title: string;
    content: string;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsListComponent],
      providers: [BlogService],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    blogService = TestBed.inject(BlogService);
    fixture.detectChanges();
  });

  it('should create comoponent without error', () => {
    expect(component).toBeTruthy();
  });

  // on ngOnInit()
  describe('ngOnInit()', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      mockPost = {
        title: 'test title',
        content: 'some fantastic content',
      };
    });

    it('should call service.getPosts()', () => {
      spy = spyOn(blogService, 'getPosts').and.returnValue(from([[mockPost]]));

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

    it('should set posts with the items returned from the service, when items > 0', () => {
      spy = spyOn(blogService, 'getPosts').and.returnValue(from([[mockPost]]));

      component.ngOnInit();

      expect(component.posts).toEqual([mockPost]);
      expect(component.posts.length).toBeGreaterThan(0);
    });

    it('should set posts with [ ], when 0 items received from the service', () => {
      spyOn(blogService, 'getPosts').and.callThrough();

      component.ngOnInit();

      expect(component.posts).toEqual([]);
      expect(component.posts.length).toEqual(0);
    });
  });

  // onDelete()
  describe('onDelete()', () => {
    let deleteSpy: jasmine.Spy;
    let mockPost: {
      title: string;
      content: string;
      id: number;
    };

    let mockPosts = [
      { title: 'New Post', content: 'New content', id: 1 },
      { title: 'Edit Post', content: 'Edit content', id: 2 },
    ];

    beforeEach(() => {
      component.posts = mockPosts;

      deleteSpy = spyOn(blogService, 'deletePost').and.callThrough();

      component.onDelete(mockPosts[0]);
    });

    it('should call deletePost() service method on Delete button clicked', () => {
      expect(deleteSpy).toHaveBeenCalled();
    });

    it('should update posts[ ] after a post is removed', () => {
      expect(component.posts.indexOf(mockPosts[0])).toEqual(-1);
    });
  });
});
