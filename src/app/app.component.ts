import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'resume_app';
  isSignedIn = false;
  constructor (public firebaseService: FirebaseService){}
    ngOnInit(){
      if(localStorage.getItem('user') !== null){
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false
      }
    }

    handleLogout() {
      this.isSignedIn = false
    }
}
