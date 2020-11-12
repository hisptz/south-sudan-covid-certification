import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiLink } from '../../../assets/configurations/apiLink';
@Injectable({
  providedIn: 'root',
})
export class CerificateApprovalService {
  apiUrl = apiLink;

  constructor(private httpClient: HttpClient) {}

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
}
