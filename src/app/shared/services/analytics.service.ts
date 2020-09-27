// import { HttpClientService } from './http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiLink } from '../../../assets/configurations/apiLink';

@Injectable()
export class AnalyticsService {
  apiUrl = apiLink;

  constructor(private httpClient: HttpClient) {}

  loadEnrollements(): Observable<any> {
    const url = this.apiUrl + 'analytics/events/query/uYjxkTbwRNf.json?dimension=pe:THIS_YEAR&' +
    'dimension=ou:he6RdNPCKhY&dimension=CTdzCeTbYay.sB1IHYu2xQT&dimension=CTdzCeTbYay.ENRjVGxVL6l&' +
    'dimension=CTdzCeTbYay.yCWkkKtr6vd&dimension=CTdzCeTbYay.UZgtLYMs7zY&dimension=CTdzCeTbYay.Hyha7AS5UZy&' +
    'dimension=CTdzCeTbYay.rjVBgGBkcmL&dimension=CTdzCeTbYay.oindugucx72&dimension=CTdzCeTbYay.jFZFXOCI9he&' +
    'dimension=CTdzCeTbYay.Rv8WM2mTuS5&dimension=CTdzCeTbYay.YUffvhddLtQ&dimension=CTdzCeTbYay.KXNWBLA2SRJ&' +
    'dimension=CTdzCeTbYay.fctSQp5nAYl&dimension=CTdzCeTbYay.HAZ7VQ730yn&dimension=CTdzCeTbYay.VVVy5kIRxkX&' +
    'dimension=CTdzCeTbYay.qlYg7fundnJ:IN:Non-SSD;SSD&dimension=CTdzCeTbYay.ovY6E8BSdto:IN:Invalid;Negative;Positive&' +
    'stage=CTdzCeTbYay&displayProperty=NAME&outputType=EVENT&desc=eventdate&paging=false';
    return this.httpClient.get(url);
  }
}
