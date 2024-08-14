import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { AnimatedTextComponent } from './components/animated-text/animated-text.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { RegisterComponent } from './components/register/register.component';
import { BackgroundImageComponent } from './components/background-image/background-image.component';
import { UserComponent } from './components/user/user.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';

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
    MyPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
