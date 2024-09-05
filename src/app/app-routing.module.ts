import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { UserComponent } from './screens/user/user.component';
import { PostsComponent } from './screens/posts/posts.component';
import { CreateComponent } from './screens/create/create.component';
import { PostViewComponent } from './screens/post-view/post-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'create', component: CreateComponent },
  { path: 'post', component: PostViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
