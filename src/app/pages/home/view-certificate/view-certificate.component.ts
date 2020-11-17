import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-certificate',
  templateUrl: './view-certificate.component.html',
  styleUrls: ['./view-certificate.component.css']
})
export class ViewCertificateComponent implements OnInit {
  @Input() row;
  @Output() closeEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  closeSection() {
    this.closeEvent.emit({ closeView: true });
  }

}
