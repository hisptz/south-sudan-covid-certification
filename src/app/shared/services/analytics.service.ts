// import { HttpClientService } from './http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { apiLink } from '../../../assets/configurations/apiLink';
import * as fromHelpers from '../../shared/helpers';
import { map, flattenDeep, uniq, find } from 'lodash';

@Injectable()
export class AnalyticsService {
  apiUrl = apiLink;

  constructor(private httpClient: HttpClient) {}

  loadEnrollements(): Observable<any> {
    const url =
      this.apiUrl +
      'analytics/events/query/uYjxkTbwRNf.json?dimension=pe:THIS_YEAR&' +
      'dimension=ou:he6RdNPCKhY&dimension=CTdzCeTbYay.sB1IHYu2xQT&dimension=CTdzCeTbYay.ENRjVGxVL6l&' +
      'dimension=CTdzCeTbYay.yCWkkKtr6vd&' +
      'dimension=CTdzCeTbYay.eydwReGQiUk&' +
      'dimension=CTdzCeTbYay.oindugucx72&' +
      'dimension=CTdzCeTbYay.Rv8WM2mTuS5&dimension=CTdzCeTbYay.KXNWBLA2SRJ&' +
      'dimension=CTdzCeTbYay.fctSQp5nAYl&dimension=CTdzCeTbYay.HAZ7VQ730yn&' +
      'dimension=CTdzCeTbYay.qlYg7fundnJ:IN:Non-SSD;SSD&dimension=CTdzCeTbYay.ovY6E8BSdto:IN:Invalid;Negative;Positive&' +
      'stage=CTdzCeTbYay&displayProperty=NAME&outputType=EVENT&desc=eventdate&paging=false';
    return this.httpClient.get(url);
  }
  loadEnrollements1(): Observable<any> {
    const url =
      this.apiUrl +
      'analytics/enrollments/query/uYjxkTbwRNf.json?dimension=pe:THIS_YEAR&dimension=ou:he6RdNPCKhY&dimension=CTdzCeTbYay.sB1IHYu2xQT&dimension=CTdzCeTbYay.oindugucx72&dimension=CTdzCeTbYay.ENRjVGxVL6l&dimension=CTdzCeTbYay.yCWkkKtr6vd&dimension=CTdzCeTbYay.Rv8WM2mTuS5&dimension=CTdzCeTbYay.NI0QRzJvQ0k&dimension=CTdzCeTbYay.fctSQp5nAYl&dimension=CTdzCeTbYay.HAZ7VQ730yn&dimension=CTdzCeTbYay.qlYg7fundnJ:IN:Non-SSD;SSD&dimension=CTdzCeTbYay.tFKORKcq2TR:IN:Employed;Student;Unemployed&dimension=CTdzCeTbYay.ovY6E8BSdto&dimension=CTdzCeTbYay.ZLEOP9JHZ5c&dimension=CTdzCeTbYay.Aat5HiCqcfA&dimension=CTdzCeTbYay.bujqZ6Dqn4m&dimension=CTdzCeTbYay.b4PEeF4OOwc&dimension=CTdzCeTbYay.w9R4l7O9Sau&dimension=QaAb8G10EKp.P61FWjSAjjA&dimension=QaAb8G10EKp.LbIwAbaSV6r&dimension=QaAb8G10EKp.f48odhAyNtd&dimension=QaAb8G10EKp.kL7PTi4lRSl&dimension=iR8O4hSLHnu.Q98LhagGLFj&dimension=iR8O4hSLHnu.RfWBPHo9MnC&dimension=QaAb8G10EKp.kL7PTi4lRSl&dimension=iR8O4hSLHnu.H3UJlHuglGv&stage=iR8O4hSLHnu&displayProperty=NAME&outputType=ENROLLMENT&desc=enrollmentdate&paging=false';
    return this.httpClient.get(url);
  }
  loadOrgUnitDataWithAncestors(orgUnitId) {
    const url =
      this.apiUrl +
      `organisationUnits/${orgUnitId}.json?fields=id,name,level,ancestors[id,name,%20level]`;
    return this.httpClient.get(url);
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
        this.loadEnrollements1()
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
      // console.log({ formattedEnrollments, orgUnitWithAncestors });
      for (const formattedEnrollment of formattedEnrollments) {
        const orgUnitData = this.getOrgUnitAncestors(
          formattedEnrollment.ou,
          orgUnitWithAncestors
        );
        newEnrollments.push({ ...formattedEnrollment, ...orgUnitData });
      }

      return  newEnrollments;
    } catch (e) {
      return throwError(e);
    }
  }
  getFormattedEnrollments() {
    return from(this.getFormattedEnrollmentsPromise());
  }
}
