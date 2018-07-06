import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddspvComponent } from './addspv.component';

describe('AddspvComponent', () => {
  let component: AddspvComponent;
  let fixture: ComponentFixture<AddspvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddspvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddspvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
