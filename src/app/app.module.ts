import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HighlightModule, provideHighlightOptions } from 'ngx-highlightjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app.state';
import { AnimatedTextComponent } from './components/animated-text/animated-text.component';
import { BackgroundImageComponent } from './components/background-image/background-image.component';
import { CodeSectionComponent } from './components/code-section/code-section.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HighlightCodeComponent } from './components/highlight-code/highlight-code.component';
import { InputErrorComponent } from './components/input-error/input-error.component';
import { MeshGradientComponent } from './components/mesh-gradient/mesh-gradient.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PopupComponent } from './components/popup/popup.component';
import { PostActivityComponent } from './components/post-activity/post-activity.component';
import { PostComponent } from './components/post/post.component';
import { ReactionComponent } from './components/reaction/reaction.component';
import { SearchComponent } from './components/search/search.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TrendingComponent } from './components/trending/trending.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AuthEffects } from './core/store/auth/auth.effects';
import { PostEffects } from './core/store/post/post.effects';
import { UserEffects } from './core/store/user/user.effects';
import { CreateComponent } from './screens/create/create.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { EditComponent } from './screens/edit/edit.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { MyPostsComponent } from './screens/my-posts/my-posts.component';
import { PostViewComponent } from './screens/post-view/post-view.component';
import { PostsComponent } from './screens/posts/posts.component';
import { RegisterComponent } from './screens/register/register.component';
import { UserComponent } from './screens/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    TextInputComponent,
    AnimatedTextComponent,
    CustomButtonComponent,
    RegisterComponent,
    BackgroundImageComponent,
    UserComponent,
    UploadImageComponent,
    DashboardComponent,
    MyPostsComponent,
    TrendingComponent,
    MeshGradientComponent,
    FooterComponent,
    HighlightCodeComponent,
    CodeSectionComponent,
    PostsComponent,
    PostComponent,
    CommentsComponent,
    CommentComponent,
    SearchComponent,
    SelectLanguageComponent,
    CreateComponent,
    PostViewComponent,
    PostActivityComponent,
    NotificationsComponent,
    ErrorComponent,
    InputErrorComponent,
    PopupComponent,
    EditComponent,
    ReactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }),
    EffectsModule.forRoot([AuthEffects, PostEffects, UserEffects]),
  ],
  providers: [
    provideClientHydration(),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js'),
    }),
    provideHttpClient(withInterceptors([httpInterceptor, jwtInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
