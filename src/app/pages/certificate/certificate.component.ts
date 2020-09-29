import { Component, OnInit } from '@angular/core';
import {AppState} from '../../store/reducers';
import {Store} from '@ngrx/store';
import * as fromSelectors from '../../store/selectors';
import * as fromActions from '../../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  currentEvent$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.currentEvent$ = this.store.select(fromSelectors.getSelectedEventFromRouteParams);
  }

  ngOnInit() {}

  printCertificate() {
    window.print();
  }

}
