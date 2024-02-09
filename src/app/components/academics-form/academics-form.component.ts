import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-academics-form',
  templateUrl: './academics-form.component.html',
  styleUrls: ['./academics-form.component.scss']
})

export class AcademicsFormComponent implements OnInit {
  academicForm: FormGroup | any; 
  @Input() academic: FormGroup | any;

  constructor(private fb: FormBuilder) {}

  createAcademicFormGroup(): FormGroup {
    return this.fb.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.academicForm = this.fb.group({
      academics: this.fb.array([])
    });
  }

  get academicArray() {
    return this.academicForm.get('academics') as FormArray;
  }

  removeAcademics(index: number) {
    const academicArray = this.academicForm.get('academics') as FormArray;
    if (academicArray && academicArray.length > index) {
      academicArray.removeAt(index); 
    }
  }  
}
