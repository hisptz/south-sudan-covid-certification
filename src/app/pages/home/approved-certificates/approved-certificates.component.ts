import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { differenceBy, map, flattenDeep } from 'lodash';
import { findIndex, find } from 'lodash';
import { JSON_FILES } from 'src/app/shared/helpers/json-files.helper';
import { columnsDefinitions } from 'src/app/shared/models/certificate.model';
import { ApprovedCertificate } from 'src/app/store/models/approved-certificate.model';

@Component({
  selector: 'app-approved-certificates',
  templateUrl: './approved-certificates.component.html',
  styleUrls: ['./approved-certificates.component.css'],
})
export class ApprovedCertificatesComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Input() eventsLoading;
  @Input() eventsAnalytics;
  @Input() approvedCertificates: Array<ApprovedCertificate>;
  certificates = [];
  searchText = '';
  page = 1;
  itemsPerPage = 10;
  pageIndex = 0;
  pageSize = 10;
  lowValue = 0;
  highValue = 10;
  certificateColumns;
  columnsDefn = columnsDefinitions;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.eventsAnalytics && this.eventsAnalytics.length) {
      this.certificates = flattenDeep(
        map(this.eventsAnalytics || [], (analytic) => {
          if (analytic && analytic[columnsDefinitions.ENROLLMENT_ID] && this.approvedCertificates) {
            const approvedCertificate = find(
              this.approvedCertificates || [],
              (certificate) => certificate.enrollment === analytic[columnsDefinitions.ENROLLMENT_ID]
            );
            if (approvedCertificate) {
              return analytic;
            }
          }
          return [];
        })
      );
    }
  }

  ngOnInit() {
    this.certificateColumns =
      JSON_FILES &&
      JSON_FILES.certificateListColumns &&
      JSON_FILES.certificateListColumns
        ? JSON_FILES.certificateListColumns
        : [];
  }
  ngAfterViewInit() {}
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
