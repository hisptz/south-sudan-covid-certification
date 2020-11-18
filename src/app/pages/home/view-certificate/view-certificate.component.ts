import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-certificate',
  templateUrl: './view-certificate.component.html',
  styleUrls: ['./view-certificate.component.css']
})
export class ViewCertificateComponent implements OnInit {
  @Input() row;
  @Input() columns;
  @Input() isApproved;
  @Output() closeEvent = new EventEmitter<any>();
  @Output() approveEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  closeSection() {
    this.closeEvent.emit({ closeView: true });
  }
  approveCertificate(row) {
    this.approveEvent.emit(row);
  }

}
