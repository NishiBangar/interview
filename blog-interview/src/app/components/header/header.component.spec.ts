import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create comoponent without error', () => {
    expect(component).toBeTruthy();
  });

  it('should show create button', () => {
    const createButton = fixture.nativeElement.querySelector('#create-button');
    expect(createButton).toBeTruthy();
  });

  describe('routerLink', () => {
    let debugElements:
      | DebugElement[]
      | { properties: { [x: string]: string } }[];

    beforeEach(() => {
      debugElements = fixture.debugElement.queryAll(
        By.directive(RouterLinkWithHref)
      );
    });

    it('should navigate user to create post form when create button is clicked', () => {
      let index = debugElements.findIndex(
        (de) => de.properties['href'] === '/create'
      );

      expect(index).toBeGreaterThan(-1);
    });

    it('should navigate user to post details page, on Blog name is clicked', () => {
      let index = debugElements.findIndex(
        (de) => de.properties['href'] === '/posts'
      );

      expect(index).toBeGreaterThan(-1);
    });
  });
});
