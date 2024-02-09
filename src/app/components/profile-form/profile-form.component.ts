import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      name: [''],
      job_role: '',
      experiences: this.fb.array([]),
      academics: this.fb.array([]),
    });
  }

  ngOnInit() {}

  addExperience() {
    const newExperienceGroup = this.createExperienceFormGroup();
    this.experiences.push(newExperienceGroup);
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  createExperienceFormGroup(): FormGroup {
    return this.fb.group({
      company_name: ['', Validators.required],
      designation: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      responsibility: ['', Validators.required],
    });
  }

  addAcademics() {
    const newAcademicGroup = this.createAcademicFormGroup();
    this.academics.push(newAcademicGroup);
  }

  removeAcademics(index: number) {
    this.academics.removeAt(index);
  }

  createAcademicFormGroup(): FormGroup {
    return this.fb.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get experiences() {
    return this.profileForm.get('experiences') as FormArray;
  }

  get academics() {
    return this.profileForm.get('academics') as FormArray;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.auth.user
        .pipe(
          take(1),
          switchMap((user) => {
            if (user) {
              const userId = user.uid;
              const profileRef = this.firestore
                .collection('profiles')
                .doc(userId);
              return profileRef.get().pipe(
                switchMap((doc) => {
                  if (doc.exists) {
                    // If the profile document exists, update the complete form data
                    return profileRef
                      .set(this.profileForm.value, { merge: true })
                      .then(() => {
                        alert('Profile updated successfully');
                        this.router.navigate(['/profile_list']);
                      })
                      .catch((error) => {
                        console.error('Error updating profile:', error);
                      });
                  } else {
                    // If the profile document does not exist, create a new document
                    const profileData = {
                      ...this.profileForm.value,
                      userId: userId,
                      email: user.email,
                    };
                    return profileRef
                      .set(profileData)
                      .then(() => {
                        alert('Profile created successfully');
                        this.router.navigate(['/profile_list']);
                      })
                      .catch((error) => {
                        console.error('Error creating profile:', error);
                      });
                  }
                })
              );
            } else {
              throw new Error('User not authenticated');
            }
          })
        )
        .subscribe(
          () => {
            alert('Profile data saved successfully');
          },
          (error) => {
            console.error('Error saving profile data: ', error);
          }
        );
    } else {
      alert('Form is invalid');
    }
  }
}
