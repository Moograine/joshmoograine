import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  options = [
    'Rehearsal',
    'Concert',
    'Datepicker'
  ]
  selectedOption = 'Rehearsal';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.initOptions();
  }

  initOptions(): void {
    const route = this.router.url;
    this.selectedOption = route ? route[1].toUpperCase() + route.slice(2) : this.options[0];
  }

  navigate(): void {
    this.router.navigate([this.selectedOption.toLowerCase()]);
  }
}
