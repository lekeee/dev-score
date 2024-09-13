import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { UserComponent } from './screens/user/user.component';
import { PostsComponent } from './screens/posts/posts.component';
import { CreateComponent } from './screens/create/create.component';
import { PostViewComponent } from './screens/post-view/post-view.component';
import { authGuard } from './core/guards/auth.guard';
import { userGuard } from './core/guards/user.guard';
import { EditComponent } from './screens/edit/edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [userGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [userGuard] },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'posts', component: PostsComponent },
  { path: 'create', component: CreateComponent, canActivate: [authGuard] },
  { path: 'post/:id', component: PostViewComponent },
  { path: 'edit/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
