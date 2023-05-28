import { Component, OnInit } from '@angular/core';
import { Participant } from '../../../../assets/models/participants.model';
import { EventService } from '../../../../assets/services/event.service';
import { UserService } from '../../../../assets/services/user.service';
import { Observable } from 'rxjs';
import { RehearsalModel } from '../../../../assets/models/event.model';
import { Username } from '../../../../assets/models/user.model';

@Component({
  selector: 'app-rehearsal',
  templateUrl: './rehearsal.component.html',
  styleUrls: ['./rehearsal.component.scss']
})
export class RehearsalComponent implements OnInit {
  rehearsalItems: RehearsalModel[] = [];
  users: Username[] = [];
  eventCreator = false;
  contextMenuItem = [
    {
      label: 'Create Event'
    },
    {
      label: 'Edit'
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

  constructor(private eventService: EventService, private userService: UserService) {
  }

  ngOnInit() {
    this.loadRehearsals();
    this.loadUsers();
  }

  loadRehearsals(): void {
    this.rehearsalItems = this.eventService.rehearsalCollection;
  }

  loadUsers(): void {
    for (let username of this.userService.userCollection) {
      this.users.push(new Username(username.name, username.nickname));
    }
  }

  openEventCreator(): void {
    this.eventCreator = true;
  }

  get isPhoneView(): boolean {
    return matchMedia('(max-width: 767px)').matches;
  }
}
