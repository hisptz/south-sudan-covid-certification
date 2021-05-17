import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllCertificatesComponent } from './all-certificates.component';

describe('AllCertificatesComponent', () => {
  let component: AllCertificatesComponent;
  let fixture: ComponentFixture<AllCertificatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
