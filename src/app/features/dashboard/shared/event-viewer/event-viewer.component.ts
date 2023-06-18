import { Component, Input } from '@angular/core';
import { ConcertModel, EventModelType, RehearsalModel } from '../../../../../assets/models/event.model';

@Component({
  selector: 'app-event-viewer',
  templateUrl: './event-viewer.component.html',
  styleUrls: ['./event-viewer.component.scss']
})
export class EventViewerComponent {
  @Input() eventItem?: RehearsalModel | ConcertModel;
  @Input() eventType: EventModelType = 'Rehearsal';

  getDuration(eventItem?: RehearsalModel | ConcertModel): string {
    return (eventItem as RehearsalModel).duration;
  }
}
