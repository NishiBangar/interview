import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { BlogService } from './blog-service';

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

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        BlogService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
      declarations: [],
    });
    service = TestBed.inject(BlogService);
  });

  it('should create a service without error', () => {
    expect(service).toBeTruthy();
  });

  describe('Router navigate()', () => {
    let mockPost: {
      title: string;
      content: string;
      id: number;
    };
    beforeEach(() => {
      mockPost = {
        title: 'New Post',
        content: 'New Content',
        id: 1,
      };
    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should redirect to the List page after createPost()', () => {
      let router = TestBed.inject(Router);

      let spy = spyOn(router, 'navigate');

      service.createPost(mockPost);

      expect(spy).toHaveBeenCalledWith(['/posts']);
    });
    it('should redirect to the Edit page after editPost()', () => {
      let router = TestBed.inject(Router);
      let spy = spyOn(router, 'navigate');
      service._posts = [mockPost];
      service.editPost({
        title: 'updated title',
        content: 'updated content',
        id: 1,
      });

      expect(spy).toHaveBeenCalledWith(['/posts']);
    });
  });
});
