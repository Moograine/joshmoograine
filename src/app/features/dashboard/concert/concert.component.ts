import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../assets/services/event.service';
import { UserService } from '../../../../assets/services/user.service';
import { Observable } from 'rxjs';
import { ConcertModel } from '../../../../assets/models/event.model';
import { Username } from '../../../../assets/models/user.model';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.scss']
})
export class ConcertComponent implements OnInit {
  concertItems: ConcertModel[] = [];
  users: Username[] = [];

  constructor(private eventService: EventService, private userService: UserService) {
  }

  ngOnInit() {
    this.loadConcerts();
    this.loadUsers();
  }

  loadConcerts(): void {
    this.concertItems = this.eventService.concertCollection;
  }

  loadUsers(): void {

    for(let username of this.userService.userCollection) {
      this.users.push(new Username(username.name, username.nickname));
    }
  }

  get isPhoneView(): boolean {
    return matchMedia('(max-width: 767px)').matches;
  }
}
