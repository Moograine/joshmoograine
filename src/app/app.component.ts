import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../assets/services/user.service';
import { take, takeWhile } from 'rxjs';
import { UserModel } from '../assets/models/user.model';
import { DateService } from '../assets/services/date.service';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../assets/services/event.service';
import { ConcertModel, RehearsalModel } from '../assets/models/event.model';
import { RepertoireService } from '../assets/services/repertoire.service';
import { SetlistModel, SongModel } from '../assets/models/repertoire.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  activeComponent = true;
  title = 'joshmoograine';

  constructor(private userService: UserService,
              private dateService: DateService,
              private http: HttpClient,
              private repertoireService: RepertoireService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAvailability();
    this.initializeEvents();
    this.initializeSetlists();
    this.initializeSongs();
  }

  getAllUsers(): void {
    this.userService.getAllUsers.pipe(takeWhile(() => this.activeComponent))
      .subscribe((users: UserModel[]): void => {
        this.userService.initializeUsers(users);
      })
  }

  initializeSetlists(): void {
    this.repertoireService.setlists.pipe(take(1)).subscribe((setlistData: SetlistModel[]): void => {
      this.repertoireService.setlistCollection = setlistData;
    })
  }

  initializeSongs(): void {
    this.repertoireService.songs.pipe(take(1)).subscribe((songData: SongModel[]): void => {
      this.repertoireService.songCollection = songData;
    })
  }

  initializeEvents(): void {
    this.eventService.concerts.pipe(take(1)).subscribe((concertData: ConcertModel[]): void => {
      this.eventService.concertCollection = concertData;
    })
    this.eventService.rehearsals.pipe(take(1)).subscribe((rehearsalData: RehearsalModel[]): void => {
      this.eventService.rehearsalCollection = rehearsalData;
    })
  }

  getAvailability(): void {
    this.dateService.availableDateList.pipe(takeWhile(() => this.activeComponent))
      .subscribe((data: object): void => {
        this.dateService.availabilityList = data;
        this.dateService.availableDatesLoaded.next(true);
      })
  }

  ngOnDestroy() {
    this.activeComponent = false;
  }
}
