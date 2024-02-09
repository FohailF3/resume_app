import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  profiles: any[] | any;
  users: any[] | any;
  user: any[] | any;
  role: any[] | any;
  @Output() isLogout = new EventEmitter<void>();

  constructor(
    public firebaseService: FirebaseService,
    public profileService: ProfileService,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.firebaseService.getUsers().subscribe((userData) => {
      this.users = userData;
    });
    this.profileService.getProfiles().subscribe((data) => {
      this.profiles = data;
    });
  }

  logOut() {
    this.firebaseService.logOut();
    this.isLogout.emit();
  }
}
