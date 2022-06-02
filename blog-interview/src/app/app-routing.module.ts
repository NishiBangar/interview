import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

const routes: Routes = [
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'posts/new', component: PostFormComponent },
  {
    path: 'posts',
    component: PostsListComponent,
  },
  { path: 'create', component: PostFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
