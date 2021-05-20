// import { HttpClientService } from './http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { apiLink } from '../../../assets/configurations/apiLink';
import * as fromHelpers from '../../shared/helpers';
import { map, flattenDeep, uniq, find } from 'lodash';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AnalyticsService {
  apiUrl = apiLink;

  constructor(private httpClient: HttpClient) {}

  loadEnrollments(): Observable<any> {
    const url =
      this.apiUrl +
      'analytics/enrollments/query/uYjxkTbwRNf.json?dimension=pe:THIS_YEAR&dimension=ou:he6RdNPCKhY&dimension=LpWNjNGvCO5.sB1IHYu2xQT&dimension=LpWNjNGvCO5.ENRjVGxVL6l&dimension=LpWNjNGvCO5.Rv8WM2mTuS5&dimension=LpWNjNGvCO5.oindugucx72&dimension=iR8O4hSLHnu.D0RBm3alWd9&dimension=iR8O4hSLHnu.kL7PTi4lRSl&dimension=iR8O4hSLHnu.Q98LhagGLFj&dimension=iR8O4hSLHnu.RfWBPHo9MnC&dimension=iR8O4hSLHnu.bujqZ6Dqn4m&dimension=CTdzCeTbYay.w9R4l7O9Sau&dimension=CTdzCeTbYay.ovY6E8BSdto:IN:Negative;Positive&dimension=CTdzCeTbYay.b4PEeF4OOwc&dimension=CTdzCeTbYay.ZLEOP9JHZ5c&dimension=QaAb8G10EKp.P61FWjSAjjA&dimension=QaAb8G10EKp.f48odhAyNtd&dimension=QaAb8G10EKp.LbIwAbaSV6r&dimension=LpWNjNGvCO5.HAZ7VQ730yn&dimension=QaAb8G10EKp.lHekjJANaNi&stage=QaAb8G10EKp&displayProperty=NAME&outputType=ENROLLMENT&desc=enrollmentdate&paging=false';
    return this.httpClient.get(url);
  }
  loadOrgUnitDataWithAncestors(orgUnitId) {
    const url =
      this.apiUrl +
      `organisationUnits/${orgUnitId}.json?fields=id,name,level,ancestors[id,name,%20level]`;
    return this.httpClient.get(url);
  }
  updateEvent(id, data) {
    const url = apiLink + `events/${id}`;
    return this.httpClient
      .put(url, data)
      .pipe(catchError((error) => throwError(error)));
  }

  loadOrgUnitDataWithAncestorsValues(orgUnitIdArr: Array<any>) {
    const formattedOrgUnitArr = uniq(orgUnitIdArr);
    const orgUnitArrStr = formattedOrgUnitArr.toString();
    const url =
      this.apiUrl +
      `organisationUnits.json?fields=id,name,ancestors[id,name]&filter=id:in:[${orgUnitArrStr}]&paging=false`;
    return this.httpClient.get(url);
  }
  getOrgUnitAncestors(ou: string, ancestorsOrgUnitData: any) {
    const orgUnit = find(
      ancestorsOrgUnitData.organisationUnits || [],
      (obj) => obj.id === ou
    );
    const ancestors = orgUnit && orgUnit.ancestors ? orgUnit.ancestors : [];
    return ancestors && ancestors.length
      ? {
          country: ancestors[0].name,
          state: ancestors[1].name,
          county: ancestors[2].name,
          payam: ancestors[3].name,
        }
      : { country: '', state: '', county: '', payam: '' };
  }

  async getFormattedEnrollmentsPromise() {
    try {
      const newEnrollments = [];
      const enrollmentAnalytics = await fromHelpers.getRequestPromise(
        this.loadEnrollments()
      );
      const formattedEnrollments = enrollmentAnalytics
        ? fromHelpers.getFormattedEnrollments(enrollmentAnalytics)
        : null;
      const ouArr = flattenDeep(
        map(formattedEnrollments || [], (enrollment) =>
          enrollment && enrollment.ou ? enrollment.ou : []
        )
      );
      const orgUnitWithAncestors = await fromHelpers.getRequestPromise(
        this.loadOrgUnitDataWithAncestorsValues(ouArr)
      );
      for (const formattedEnrollment of formattedEnrollments) {
        const orgUnitData = this.getOrgUnitAncestors(
          formattedEnrollment.ou,
          orgUnitWithAncestors
        );
        newEnrollments.push({ ...formattedEnrollment, ...orgUnitData });
      }

      return newEnrollments;
    } catch (e) {
      return throwError(e);
    }
  }
  getFormattedEnrollments() {
    return from(this.getFormattedEnrollmentsPromise());
  }
  getEventsWithApprovalName(ou: string, tei: string) {
    const fields = `ou=${ou}&program=uYjxkTbwRNf&tei=${tei}&programStage=CTdzCeTbYay`;
    const url = this.apiUrl + `events.json?paging=false&${fields}`;
    return this.httpClient.get(url).pipe(catchError((error) => error));
  }
  async getEventPayload(ou: string, tei: string) {
    try {
      const eventsResponse: any = await fromHelpers.getRequestPromise(
        this.getEventsWithApprovalName(ou, tei)
      );
      const events =
        eventsResponse && eventsResponse.events ? eventsResponse.events : [];
      const latestEvent = fromHelpers.getLatestEvent(events);
      return latestEvent;
    } catch (e) {
      return throwError(e);
    }
  }
}
