import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiLink } from '../../../assets/configurations/apiLink';
import { AnalyticsService } from './analytics.service';
import * as fromHelpers from '../../shared/helpers';
import { ApprovedCertificate } from 'src/app/store/models/approved-certificate.model';
@Injectable({
  providedIn: 'root',
})
export class CerificateApprovalService {
  apiUrl = apiLink;

  constructor(private httpClient: HttpClient, private analyticsService: AnalyticsService) {}

  setUpApprovalCertificateData(data) {
    return this.httpClient
      .post(
        `${this.apiUrl}dataStore/covidCertification/approvedCertificates`,
        data
      )
      .pipe(catchError((error) => throwError(error)));
  }
  updateApprovalCertificateData(data) {
    return this.httpClient
      .put(
        `${this.apiUrl}dataStore/covidCertification/approvedCertificates`,
        data
      )
      .pipe(catchError((error) => throwError(error)));
  }
  loadApprovalCertificateData() {
    return this.httpClient
      .get(
        `${this.apiUrl}dataStore/covidCertification/approvedCertificates`
      )
      .pipe(catchError((error) => throwError(error)));
  }
  async approveCertificate(data: ApprovedCertificate) {
     try {
       const ou = data && data.ou? data.ou : '';
       const tei = data && data.tei ? data.tei : '';
       const eventPayload = await this.analyticsService.getEventPayload(ou, tei);
     } catch(e) {
       return throwError(e);
     }
  }
}
