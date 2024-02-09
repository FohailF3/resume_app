import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  sub: Subscription | any;
  profile: any[] | any;
  params: any;

  constructor(
    private profileService: ProfileService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['user']; // Access the 'user' query parameter
      if (userId) {
        this.profileService.getProfile(userId).subscribe((data) => {
          this.profile = data;
        });
      } else {
        console.error('User ID not found in query parameters');
      }
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  goBack() {
    this.router.navigate(['/profile_list']);
  }
}
