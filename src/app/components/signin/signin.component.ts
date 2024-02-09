import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  isSignedIn = false;
  userData: any[] | any;
  profileData: any[] | any;
  email: string | any;
  password: string | any;

  constructor(
    public firebaseService: FirebaseService,
    public router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {}

  async signIn(signin_email: string, signin_password: string) {
    await this.firebaseService.signIn(signin_email, signin_password).then(
      () => {
        if (this.firebaseService.isLoggedIn) {
          this.isSignedIn = true;
          var userString = localStorage.getItem('user');
          if (userString !== null) {
            var user = JSON.parse(userString) as { uid: string };
            var uid = user.uid;
            console.log('user signin', user);

            this.profileService.getUser(uid).subscribe((data) => {
              this.userData = data;
              console.log('user data', this.userData.role);
              console.log('user data', this.userData.role);
              if (
                this.userData &&
                (this.userData.role === 'admin' ||
                  this.userData.role === 'Admin')
              ) {
                console.log('in if');
                this.router.navigate(['/profile_list']);
              } else {
                console.log('in else ');

                this.profileService.getProfile(uid).subscribe((data) => {
                  this.profileData = data;
                  console.log('profile data', data);
                  if (this.profileData.length !== 0) {
                    this.router.navigate(['/profile_list']);
                  } else {
                    this.router.navigate(['/profile_form'], {
                      queryParams: { edit: '0' },
                    });
                  }
                });
              }
            });
          }
        }
      },
      (err) => {
        if (err.message.includes('auth/invalid-login-credentials')) {
          alert('Invalid credentials');
        }
        console.log('err', err);
      }
    );
  }
  handleRegister() {
    this.router.navigate(['/signup']);
  }
}
