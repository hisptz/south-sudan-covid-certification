import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApprovedCertificatesComponent } from './approved-certificates.component';

describe('ApprovedCertificatesComponent', () => {
  let component: ApprovedCertificatesComponent;
  let fixture: ComponentFixture<ApprovedCertificatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
