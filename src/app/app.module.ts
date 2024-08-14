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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    TextInputComponent,
    AnimatedTextComponent,
    CustomButtonComponent
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
