import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  profiles: any[] | any;
  profile: any[] | any;
  userData: any[] | any;
  admin: any[] | any;
  general: any[] | any;
  user: { userData: any } | null = null;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    var userString = localStorage.getItem('user');
    if (userString !== null) {
      var user = JSON.parse(userString) as { uid: string };
      var uid = user.uid;

      this.profileService.getUser(uid).subscribe((data) => {
        this.userData = data;

        if (this.userData.role === 'admin') {
          this.admin = JSON.stringify(this.userData);
        } else {
          this.general = JSON.stringify(this.userData);
        }
      });

      this.profileService.getProfiles().subscribe((data) => {
        this.profiles = data;
      });

      this.profileService.getProfile(uid).subscribe((data) => {
        this.profile = data;
      });
    } else {
      console.log('User data not found in local storage');
    }
  }

  getProfile(userId: string) {
    this.router.navigate(['/profile_details'], {
      queryParams: { user: userId },
    });
    this.profileService.getProfile(userId).subscribe((data) => {
      this.profile = data;
    });
  }

  editProfile(userProfile: any) {
    console.log('edit profile', userProfile);
    
    this.router.navigate(["/profile_form"], {
      queryParams: { "edit":"1", "userId": userProfile } ,
    });
  }
}
