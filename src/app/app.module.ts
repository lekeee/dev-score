import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';

import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { AnimatedTextComponent } from './components/animated-text/animated-text.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { RegisterComponent } from './screens/register/register.component';
import { BackgroundImageComponent } from './components/background-image/background-image.component';
import { UserComponent } from './screens/user/user.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { TrendingComponent } from './components/trending/trending.component';
import { MeshGradientComponent } from './components/mesh-gradient/mesh-gradient.component';
import { FooterComponent } from './components/footer/footer.component';
import { HighlightCodeComponent } from './components/highlight-code/highlight-code.component';
import { CodeSectionComponent } from './components/code-section/code-section.component';
import { PostsComponent } from './screens/posts/posts.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    HighlightModule,
  ],
  providers: [
    provideClientHydration(),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js'),
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
