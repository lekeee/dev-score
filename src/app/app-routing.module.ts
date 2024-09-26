import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { postOwnerGuard } from './core/guards/post-owner.guard';
import { userGuard } from './core/guards/user.guard';
import { AboutComponent } from './screens/about/about.component';
import { CreateComponent } from './screens/create/create.component';
import { EditComponent } from './screens/edit/edit.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { PostViewComponent } from './screens/post-view/post-view.component';
import { PostsComponent } from './screens/posts/posts.component';
import { RegisterComponent } from './screens/register/register.component';
import { UserComponent } from './screens/user/user.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent, canActivate: [userGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [userGuard] },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'create', component: CreateComponent, canActivate: [authGuard] },
  { path: 'post/:id', component: PostViewComponent },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [authGuard, postOwnerGuard],
  },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
