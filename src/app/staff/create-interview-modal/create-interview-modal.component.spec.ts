import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInterviewModalComponent } from './create-interview-modal.component';

describe('CreateInterviewModalComponent', () => {
  let component: CreateInterviewModalComponent;
  let fixture: ComponentFixture<CreateInterviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInterviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInterviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
