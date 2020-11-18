import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiLink } from '../../../assets/configurations/apiLink';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl = apiLink;
  constructor(private httpClient: HttpClient) { }
  getAuthorities() {
    return this.httpClient
      .get(
        `${this.apiUrl}me/authorities`
      )
      .pipe(catchError((error) => throwError(error)));
  }
}
