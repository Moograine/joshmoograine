import { Component, OnInit } from '@angular/core';
import { Participant } from '../../../../assets/models/participants.model';
import { EventService } from '../../../../assets/services/event.service';
import { UserService } from '../../../../assets/services/user.service';
import { ConcertModel, EventModelType, Rehearsal, RehearsalModel } from '../../../../assets/models/event.model';
import { Username } from '../../../../assets/models/user.model';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventType: EventModelType = 'Rehearsal';
  eventItems: (RehearsalModel | ConcertModel)[] = [];
  users: Username[] = [];
  showEditModal = false;
  showViewModal = false;
  selectedEventItem?: RehearsalModel | ConcertModel = new Rehearsal();
  eventId = -1;
  contextMenuItem = [
    {
      label: 'Create Event'
    },
    {
      label: 'Edit'
    },
    {
      label: 'View'
    }
  ];

  rehearsalMock = [
    {
      date: new Date(2023, 2, 26),
      location: 'Miercurea-Ciuc',
      participants: [
        new Participant('Mihăiţeanu Zsolt', true),
        new Participant('Szász-Zakariás Róbert', true),
        new Participant('Szélyes Boróka', false),
        new Participant('Cisar Bogdan Krisztián', true),
        new Participant('Keresztes Zsolt', true)
      ]
    },
    {
      date: new Date(2023, 3, 2),
      location: 'Targu-Mures',
      participants: [
        new Participant('Mihăiţeanu Zsolt', true),
        new Participant('Szász-Zakariás Róbert', true),
        new Participant('Szélyes Boróka', true),
        new Participant('Cisar Bogdan Krisztián', true),
        new Participant('Keresztes Zsolt', true)
      ]
    },
    {
      date: new Date(2023, 4, 11),
      location: 'Miercurea-Ciuc',
      participants: [
        new Participant('Mihăiţeanu Zsolt', true),
        new Participant('Szász-Zakariás Róbert'),
        new Participant('Szélyes Boróka', false),
        new Participant('Cisar Bogdan Krisztián', false),
        new Participant('Keresztes Zsolt', true)
      ]
    },
    {
      date: new Date(2023, 5, 22),
      location: 'Miercurea-Ciuc',
      participants: [
        new Participant('Mihăiţeanu Zsolt', false),
        new Participant('Szász-Zakariás Róbert', false),
        new Participant('Szélyes Boróka', true),
        new Participant('Cisar Bogdan Krisztián', true),
        new Participant('Keresztes Zsolt', true)
      ]
    },
    {
      date: new Date(2023, 6, 3),
      location: 'Miercurea-Ciuc',
      participants: [
        new Participant('Mihăiţeanu Zsolt', true),
        new Participant('Szász-Zakariás Róbert'),
        new Participant('Szélyes Boróka'),
        new Participant('Cisar Bogdan Krisztián', false),
        new Participant('Keresztes Zsolt', true)
      ]
    }
  ]

  constructor(private eventService: EventService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.initializeEventComponent();
    this.loadEvents();
    this.loadUsers();
  }

  initializeEventComponent(): void {
    this.eventType = this.router.url.includes('rehearsal') ? 'Rehearsal' : 'Concert';
  }

  loadEvents(): void {
    this.eventItems = this.eventService[this.eventType === 'Rehearsal' ? 'rehearsalCollection' : 'concertCollection'];
  }

  loadUsers(): void {
    for (let username of this.userService.userCollection) {
      this.users.push(new Username(username.name, username.nickname));
    }
  }

  openEventViewerModal(eventItem?: RehearsalModel | ConcertModel): void {
    if (eventItem) {
      this.selectedEventItem = eventItem;
    } else {
      this.selectedEventItem = undefined;
    }
    this.showViewModal = true;
  }

  openEventCreatorModal(eventItem?: RehearsalModel | ConcertModel, eventId?: number): void {
    if (eventItem) {
      this.selectedEventItem = eventItem;
      if (eventId !== undefined && eventId >= 0) {
        this.eventId = eventId;
      }
    } else {
      this.selectedEventItem = undefined;
      this.eventId = -1;
    }
    this.showEditModal = true;
  }

  closeModal(): void {
    if (this.eventType === 'Rehearsal') {
      this.eventService.rehearsals.pipe(take(1)).subscribe((rehearsalData: RehearsalModel[]): void => {
        this.eventService.rehearsalCollection = rehearsalData;
        this.loadEvents();
      })
    } else {
      this.eventService.concerts.pipe(take(1)).subscribe((concertData: ConcertModel[]): void => {
        this.eventService.concertCollection = concertData;
        this.loadEvents();
      })
    }
    this.showEditModal = false;
  }

  getDuration(eventItem: RehearsalModel | ConcertModel): string {
    return (eventItem as RehearsalModel).duration;
  }

  get isPhoneView(): boolean {
    return matchMedia('(max-width: 767px)').matches;
  }
}
