import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { FirebaseService } from './services/firebase.service';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExperienceFormComponent } from './components/experience-form/experience-form.component';
import { AcademicsFormComponent } from './components/academics-form/academics-form.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProfileFormComponent,
    ExperienceFormComponent,
    AcademicsFormComponent,
    ProfileListComponent,
    ProfileDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
