import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ApproveCertificate } from 'src/app/store/actions';
import { AppState } from 'src/app/store/reducers';
import { findIndex, uniq, find } from 'lodash';
import { ApprovedCertificate } from 'src/app/store/models/approved-certificate.model';
import { CurrentUser } from 'src/app/store/models';
import { getApprovedCertificatePayload } from 'src/app/shared/helpers/get-approved-certificates-payload.helper';
import { JSON_FILES } from 'src/app/shared/helpers/json-files.helper';
import { columnsDefinitions } from 'src/app/shared/models/certificate.model';

@Component({
  selector: 'app-all-certificates',
  templateUrl: './all-certificates.component.html',
  styleUrls: ['./all-certificates.component.css'],
})
export class AllCertificatesComponent implements OnInit {
  @Input() eventsLoading;
  @Input() eventsAnalytics;
  @Input() approvedCertificates: Array<ApprovedCertificate>;
  @Output() approveEvent = new EventEmitter<string>();
  @Input() certificateApprovalLoadingStatus: boolean;
  @Input() currentUser: CurrentUser;
  searchText = '';
  page = 1;
  itemsPerPage = 10;
  pageIndex = 0;
  pageSize = 10;
  lowValue = 0;
  highValue = 10;
  certificateColumns;
  viewTableColumns;
  rowOpened = null;
  columnDefns = columnsDefinitions;
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.certificateColumns =
      JSON_FILES && JSON_FILES.certificateListColumns
        ? JSON_FILES.certificateListColumns
        : [];
    this.viewTableColumns =
      JSON_FILES &&
      JSON_FILES.viewTableColumns &&
      JSON_FILES.viewTableColumns.columns
        ? JSON_FILES.viewTableColumns.columns
        : [];
  }
  searchingItems(e) {
    if (e) {
      e.stopPropagation();
    }
    this.searchText = e ? e.target.value.trim() : this.searchText;
  }
  trackByFn(index, item) {
    return item.id;
  }
  onUpdatePageSize(e) {
    this.itemsPerPage = e;
  }

  onCurrentPageUpdate(e) {
    this.page = e;
  }

  isApproved(row: any) {
    const approvedCertificate = find(
      this.approvedCertificates || [],
      (certificate) =>
        certificate.enrollment === row[columnsDefinitions.ENROLLMENT_ID],
    );
    return approvedCertificate ? true : false;
  }
  approveCerificate(row) {
    this.snackBar.open('Approving certificate', '', {
      duration: 2000,
    });
    const { enrollment, tei, ou } = this.getApprovalStoringDataFromRow(row);
    const approvedCertificates: Array<ApprovedCertificate> = getApprovedCertificatePayload(
      this.approvedCertificates,
      enrollment,
      tei,
      ou,
      this.currentUser,
    );
    this.store.dispatch(
      ApproveCertificate({
        certificates: approvedCertificates,
        newCertificate: {
          enrollment,
          tei,
          ou,
          approvedBy: {
            id:
              this.currentUser && this.currentUser.id
                ? this.currentUser.id
                : '',
            name:
              this.currentUser && this.currentUser.name
                ? this.currentUser.name
                : '',
          },
          isPending: true,
        },
      }),
    );
    this.rowOpened = null;
  }
  getApprovalStoringDataFromRow(row) {
    let enrollment = '';
    let tei = '';
    let ou = '';
    const approvalFilters =
      this.certificateColumns && this.certificateColumns.approvalStoringData
        ? this.certificateColumns.approvalStoringData
        : null;
    for (const filter of approvalFilters) {
      if (row[filter]) {
        if (filter === 'pi') {
          enrollment = row[filter];
        } else if (filter === 'tei') {
          tei = row[filter];
        } else if (filter === 'ou') {
          ou = row[filter];
        }
      }
    }
    return { enrollment, tei, ou };
  }
  onPageChange(event) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }
  getRowNumber(row, analytics: Array<any>) {
    return findIndex(analytics || [], row) + 1;
  }
  closeViewDataSection(data) {
    if (data && data.closeView) {
      this.rowOpened = null;
    }
  }
  showViewdataSection(data) {
    this.rowOpened = data;
  }
  rowColor(row): string {
    if (row && this.rowOpened) {
      if (
        row[this.columnDefns.ENROLLMENT_ID] ===
        this.rowOpened[this.columnDefns.ENROLLMENT_ID]
      ) {
        return '#F0FFF0';
      }
    }
    return '#FFFFFF';
  }
}
