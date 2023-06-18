import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AvailabilityStatus, Concert,
  ConcertModel,
  EventModelType, Rehearsal,
  RehearsalModel
} from '../../../../../assets/models/event.model';
import { UserService } from '../../../../../assets/services/user.service';
import { EventService } from '../../../../../assets/services/event.service';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent implements OnInit {
  @Input() eventType: EventModelType = 'Rehearsal';
  @Input() eventItem?: RehearsalModel | ConcertModel;
  @Input() eventId = -1;
  @Output() closeModal = new EventEmitter<boolean>();
  availabilityOptions = {
    items: [
      'I\'m coming',
      'I can\'t come',
      'Not sure yet'
    ],
    values: [
      'available',
      'unavailable',
      'unknown'
    ]
  }
  editMode = false;
  eventLocation = '';
  eventTypes = ['Rehearsal', 'Concert'];
  eventDate = new Date;
  hour = new Date;
  availability: AvailabilityStatus[] = [];
  currentUserAvailability = 'Not sure yet';
  duration = '';
  durationOptions = [
    '1 hour',
    '2 hours',
    '3 hours',
    '4 hours',
    '5 hours',
    '6 hours',
    '7 hours',
    '8 hours',
    'As long as it takes, you pussy'
  ]
  note = '';
  informOthers = false;
  showConfirmDialog = false;

  constructor(private userService: UserService, private eventService: EventService) {
  }

  ngOnInit() {
    this.initializeEvent();
  }

  get isPhoneView(): boolean {
    return matchMedia('(max-width: 576px)').matches;
  }

  initializeEvent(): void {
    this.editMode = !!this.eventItem;
    this.eventDate = this.eventItem?.date ? new Date((this.eventItem?.date as Date)?.toLocaleString()) : new Date;
    this.hour = this.eventItem?.date ? new Date((this.eventItem?.date as Date)?.toLocaleString()) : new Date;
    this.eventLocation = this.eventItem?.location.length ? this.eventItem?.location : 'Miercurea-Ciuc';
    this.availability = this.eventItem?.availability.length ?
      this.eventItem?.availability : ['unknown', 'unknown', 'unknown', 'unknown', 'unknown'];
    if (this.editMode) {
      const userId = parseInt(this.userService.currentUser.id)
      const valueIndex = this.availabilityOptions.values.indexOf(this.availability[userId]);
      this.currentUserAvailability = this.availabilityOptions.items[valueIndex];
    }
    this.duration = (this.eventItem as RehearsalModel)?.duration || this.duration;
    this.note = this.eventItem?.note || this.note;
  }

  createEvent(): void {
    const index = parseInt(this.userService.currentUser.id);
    this.availability[index] = 'available';
    if (this.editMode) {
      const valueIndex = this.availabilityOptions.items.indexOf(this.currentUserAvailability);
      this.availability[index] = this.availabilityOptions.values[valueIndex] as AvailabilityStatus;
    }
    this.eventDate.setHours(this.hour.getHours(), this.hour.getMinutes());
    if (this.eventType === 'Rehearsal') {
      const rehearsal = new Rehearsal(this.eventDate, this.eventLocation, this.duration, this.availability, this.note);
      const id = this.eventService.rehearsalCollection?.length || 0;
      this.eventService.setRehearsal((this.editMode ? this.eventId : id).toString(), rehearsal).subscribe((): void => {
        this.closeModal.emit(true);
      });
    } else {
      const concert = new Concert(this.eventDate, this.eventLocation, this.availability, this.note);
      const id = this.eventService.concertCollection.length;
      this.eventService.setConcert((this.editMode ? this.eventId : id).toString(), concert).subscribe((): void => {
        this.closeModal.emit(true);
      });
    }
  }

  openConfirmDialog(): void {
    this.showConfirmDialog = true;
  }

  closeConfirmDialog(): void {
    this.showConfirmDialog = false;
  }

  deleteEvent(): void {
    console.log(this.eventId, 'delete this', this.eventType);
    if (this.eventId !== undefined) {
      if (this.eventType === 'Rehearsal') {
        this.eventService.deleteRehearsal(this.eventId).subscribe((): void => {
          this.closeModal.emit(true);
        });
      } else {
        this.eventService.deleteConcert(this.eventId).subscribe((): void => {
          this.closeModal.emit(true);
        });
      }
    }
  }

  showTooltip(event: Event, tooltip: HTMLElement): void {
    event.stopPropagation();
    tooltip.focus();
  }
}
