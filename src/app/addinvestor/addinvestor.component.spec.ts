import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinvestorComponent } from './addinvestor.component';

describe('AddinvestorComponent', () => {
  let component: AddinvestorComponent;
  let fixture: ComponentFixture<AddinvestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinvestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
