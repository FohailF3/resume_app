import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  isSignedIn = false;
  name: string | any;
  email: string | any;
  password: string | any;

  constructor(public firebaseService: FirebaseService, public router: Router) {}

  async signUp(
    name: string,
    signup_email: string,
    signup_password: string,
    role: string
  ) {
      try {
        role = 'General';
        await this.firebaseService.signUp(
          name,
          signup_email,
          signup_password,
          role
        );
        this.isSignedIn = true;
        // if (role == "true"){
        // } else {
        //   role = 'General';
        //   await this.firebaseService.signUp(name, signup_email, signup_password, role);
        //   this.isSignedIn = true;
        // }
        alert('You have successfully regisered, please sign in');
        this.router.navigate(['/signin']);
      } catch (error) {
        if (error) {
          alert('Something went wrong!');
        }
      }
  }
}
