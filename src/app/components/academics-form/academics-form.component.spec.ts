import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicsFormComponent } from './academics-form.component';

describe('AcademicsFormComponent', () => {
  let component: AcademicsFormComponent;
  let fixture: ComponentFixture<AcademicsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
