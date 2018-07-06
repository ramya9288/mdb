import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateloanComponent } from './updateloan.component';

describe('UpdateloanComponent', () => {
  let component: UpdateloanComponent;
  let fixture: ComponentFixture<UpdateloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
