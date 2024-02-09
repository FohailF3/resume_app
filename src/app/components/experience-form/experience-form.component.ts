import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})

export class ExperienceFormComponent implements OnInit {
  experienceForm: FormGroup | any; 
  @Input() experience: FormGroup | any;

  constructor(private fb: FormBuilder) {}

  createExperienceFormGroup(): FormGroup {
    return this.fb.group({
      company_name: ['', Validators.required],
      designation: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      responsibility: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.experienceForm = this.fb.group({
      experiences: this.fb.array([])
    });
  }

  get experienceArray() {
    return this.experienceForm.get('experiences') as FormArray;
  }

  removeExperience(index: number) {
    const experienceArray = this.experienceForm.get('experiences') as FormArray;
    if (experienceArray && experienceArray.length > index) {
      experienceArray.removeAt(index); 
    }
  }  
}
