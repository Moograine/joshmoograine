import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent {
  @Input() event = 'Rehearsal';
  @Input() date = new Date;
  hour = new Date;
  informOthers = false;
  eventTypes = ['Rehearsal', 'Concert'];
}
