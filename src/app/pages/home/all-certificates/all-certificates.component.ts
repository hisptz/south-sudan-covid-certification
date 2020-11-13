import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ApproveCertificate } from 'src/app/store/actions';
import { AppState } from 'src/app/store/reducers';
import { findIndex} from 'lodash';

@Component({
  selector: 'app-all-certificates',
  templateUrl: './all-certificates.component.html',
  styleUrls: ['./all-certificates.component.css'],
})
export class AllCertificatesComponent implements OnInit {
  @Input() eventsLoading;
  @Input() eventsAnalytics;
  @Input() approvedCertificates: Array<string>;
  @Output() approveEvent = new EventEmitter<string>();
  @Input() certificateApprovalLoadingStatus: boolean;
  searchText = '';
  page = 1;
  itemsPerPage = 10;
  pageIndex = 0;
  pageSize = 10;
  lowValue = 0;
  highValue = 10;
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {}

  ngOnInit() {}
  searchingItems(e) {
    if (e) {
      e.stopPropagation();
    }
    this.searchText = e ? e.target.value.trim() : this.searchText;
    console.log({search: this.searchText});
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

  isApproved(id: string) {
    return this.approvedCertificates &&
      this.approvedCertificates.length &&
      this.approvedCertificates.includes(id)
      ? true
      : false;
  }
  approveCerificate(id: string) {
    if (this.approvedCertificates && !this.approvedCertificates.includes(id)) {
      this.snackBar.open('Approving certificate', '', {
        duration: 2000,
      });

      const certificates = [...this.approvedCertificates];
      certificates.push(id);
      console.log({certificates});
      this.store.dispatch(ApproveCertificate({ payload: certificates }));
    }
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
}
