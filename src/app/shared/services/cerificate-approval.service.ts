import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, throwError } from 'rxjs';
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

  constructor(
    private httpClient: HttpClient,
    private analyticsService: AnalyticsService,
  ) {}

  setUpApprovalCertificateData(data) {
    return this.httpClient
      .post(
        `${this.apiUrl}dataStore/covidCertification/approvedCertificates`,
        data,
      )
      .pipe(catchError((error) => throwError(error)));
  }
  updateApprovalCertificateData(data) {
    return this.httpClient
      .put(
        `${this.apiUrl}dataStore/covidCertification/approvedCertificates`,
        data,
      )
      .pipe(catchError((error) => throwError(error)));
  }
  loadApprovalCertificateData() {
    return this.httpClient
      .get(`${this.apiUrl}dataStore/covidCertification/approvedCertificates`)
      .pipe(catchError((error) => throwError(error)));
  }
  async approveCertificatePromise(
    certificates: Array<ApprovedCertificate>,
    newCertificate: ApprovedCertificate,
  ) {
    try {
      const ou = newCertificate && newCertificate.ou ? newCertificate.ou : '';
      const tei =
        newCertificate && newCertificate.tei ? newCertificate.tei : '';
      const approvedBy =
        newCertificate && newCertificate.approvedBy
          ? newCertificate.approvedBy
          : null;
      const approvedByName =
        approvedBy && approvedBy.name ? approvedBy.name : '';
      const dataStoreResponse = await fromHelpers.getRequestPromise(
        this.updateApprovalCertificateData({approvedCertificates: certificates}),
      );
      const eventPayload = await this.analyticsService.getEventPayload(ou, tei);
      const formattedEventPayload = fromHelpers.getPayloadWithApprovalName(
        eventPayload,
        approvedByName,
      );
      const eventId =
        formattedEventPayload && formattedEventPayload.event
          ? formattedEventPayload.event
          : '';
      const eventResponse = await this.updateEvent(
        eventId,
        formattedEventPayload,
      );
      return { dataStoreResponse, eventResponse };
    } catch (e) {
      return throwError(e);
    }
  }
  approveCertificate(
    certificates: Array<ApprovedCertificate>,
    newCertificate: ApprovedCertificate,
  ) {
    return from(this.approveCertificatePromise(certificates, newCertificate));
  }
  async updateEvent(id: string, data: any) {
    let response = null;
    try {
      response = await fromHelpers.getRequestPromise(
        this.analyticsService.updateEvent(id, data),
      );
      return response;
    } catch (e) {
      return throwError(e);
    }
  }
}
