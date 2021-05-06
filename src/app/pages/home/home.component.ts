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
import { JSON_FILES } from 'src/app/shared/helpers/json-files.helper';
import { homeLink } from 'src/assets/configurations/apiLink';

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
  definedUserRoles = null;
  homeLink = homeLink;

  constructor(private store: Store<AppState>) {
    this.eventsAnalytics$ = store.select(fromSelectors.getEvents);
    this.eventsLoading$ = store.select(fromSelectors.getEventsLoading);
  }

  ngOnInit() {
    this.definedUserRoles =
      JSON_FILES && JSON_FILES.definedUserRoles
        ? JSON_FILES.definedUserRoles
        : null;
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
 // canApprove(userRoles: Array<any>, approveRoleId): boolean {
  //   const roles = [];
  //   if (userRoles && approveRoleId) {
  //     if (userRoles) {
  //       for (const role of userRoles) {
  //         if (role && role.id && role.id === approveRoleId) {
  //           roles.push(role.id);
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }
  canApprove(currentUser) {
    return (
      currentUser &&
      currentUser.authorities &&
      currentUser.authorities.length &&
      currentUser.authorities.includes('APPROVE_CERTIFICATE')
    );
  }
  canPrint(currentUser): boolean {
    return (
      currentUser &&
      currentUser.authorities &&
      currentUser.authorities.length &&
      currentUser.authorities.includes('PRINT_CERTIFICATE')
    );
  }
  // canPrint(userRoles: Array<any>, printRoleId): boolean {
  //   const roles = [];
  //   if (userRoles && printRoleId) {
  //     if (userRoles) {
  //       for (const role of userRoles) {
  //         if (role && role.id && role.id === printRoleId) {
  //           roles.push(role.id);
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }
}
