import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { differenceBy, map, flattenDeep } from 'lodash';
import { findIndex} from 'lodash';


@Component({
  selector: 'app-approved-certificates',
  templateUrl: './approved-certificates.component.html',
  styleUrls: ['./approved-certificates.component.css'],
})
export class ApprovedCertificatesComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Input() eventsLoading;
  @Input() eventsAnalytics;
  @Input() approvedCertificates: Array<string>;
  certificates = [];
  searchText = '';
  page = 1;
  itemsPerPage = 10;
  pageIndex = 0;
  pageSize = 10;
  lowValue = 0;
  highValue = 10;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.eventsAnalytics && this.eventsAnalytics.length) {
      console.log(this.eventsAnalytics);
      this.certificates = flattenDeep(
        map(this.eventsAnalytics || [], (analytic) => {
          if (analytic && analytic.psi && this.approvedCertificates) {
            if (this.approvedCertificates.includes(analytic.psi)) {
              return analytic;
            }
          }
          return [];
        })
      );
    }
  }

  ngOnInit() {}
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
