import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepackComponent } from './createpack.component';

describe('CreatepackComponent', () => {
  let component: CreatepackComponent;
  let fixture: ComponentFixture<CreatepackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
