import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import * as fromSelectors from '../../store/selectors';
import * as fromActions from '../../store/actions';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadOrgUnitWithAncestors } from '../../store/actions';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {
  currentEvent$: Observable<any>;
  generateLink = window.document.URL;
  todayDate = new Date();
  orgUnitAncestors$: Observable<any>;
  orgUnitLoadingStatus$: Observable<any>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.currentEvent$ = this.store.select(
      fromSelectors.getSelectedEventFromRouteParams
    );
  }

  ngOnInit() {
    const orgunitid = this.route.snapshot.queryParams.orgunit;
    console.log({orgunitid});
    this.store.dispatch(loadOrgUnitWithAncestors({ id: orgunitid }));
    this.orgUnitAncestors$ = this.store.select(
      fromSelectors.getLoadedOrgUnitAncestors
    );
    this.orgUnitLoadingStatus$ = this.store.select(
      fromSelectors.getLoadingOrgUnitDataStatus
    );
  }

  printCertificate() {
    window.print();
  }
}
