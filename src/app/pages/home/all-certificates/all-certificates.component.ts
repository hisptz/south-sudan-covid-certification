import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-certificates',
  templateUrl: './all-certificates.component.html',
  styleUrls: ['./all-certificates.component.css']
})
export class AllCertificatesComponent implements OnInit {
  @Input() eventsLoading;
  @Input() eventsAnalytics;
  searchText = '';
  page = 1;
  itemsPerPage = 10;
  constructor() { }

  ngOnInit() {
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



}
