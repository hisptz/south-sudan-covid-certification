import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import * as fromSelectors from '../../store/selectors';
import * as fromActions from '../../store/actions';
import { Observable } from 'rxjs';
import { FilterByPipe } from 'ngx-pipes';
import {
  ApproveCertificate,
  loadOrgUnitWithAncestors,
} from '../../store/actions';
import {
  getApprovedCertificates,
  getApprovedCertificatesLoadedStatus,
  getApprovedCertificatesLoadingStatus,
} from '../../store/selectors/certificate-approval.selectors';
import { ApprovedCertificate } from 'src/app/store/models/approved-certificate.model';
import { CurrentUser } from 'src/app/store/models';
import { getCurrentUser } from '../../store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FilterByPipe],
})
export class HomeComponent implements OnInit {
  eventsAnalytics$: Observable<any>;
  eventsLoading$: Observable<any>;
  approvedCertificates$: Observable<Array<ApprovedCertificate>>;
  certificateApprovalLoadingStatus$: Observable<boolean>;
  certificateApprovalLoadedStatus$: Observable<boolean>;
  currentUser$: Observable<CurrentUser>;
  page = 1;
  itemsPerPage = 10;
  searchText = '';

  constructor(private store: Store<AppState>) {
    this.eventsAnalytics$ = store.select(fromSelectors.getEvents);
    this.eventsLoading$ = store.select(fromSelectors.getEventsLoading);
  }

  ngOnInit() {
    this.approvedCertificates$ = this.store.select(getApprovedCertificates);
    this.currentUser$ = this.store.select(getCurrentUser);
    this.certificateApprovalLoadedStatus$ = this.store.select(
      getApprovedCertificatesLoadedStatus
    );
    this.certificateApprovalLoadingStatus$ = this.store.select(
      getApprovedCertificatesLoadingStatus
    );
  }

  trackByFn(index, item) {
    return item.id;
  }

  searchingItems(e) {
    if (e) {
      e.stopPropagation();
    }
    this.searchText = e ? e.target.value.trim() : this.searchText;
  }

  onUpdatePageSize(e) {
    this.itemsPerPage = e;
  }

  onCurrentPageUpdate(e) {
    this.page = e;
  }
  onOpeningCertificate(id) {}
}
