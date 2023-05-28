import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/assets/environments/environment'
import { ConcertModel, RehearsalModel } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  concertCollection: ConcertModel[] = [];
  rehearsalCollection: RehearsalModel[] = [];

  constructor(private http: HttpClient) {
  }

  get concerts(): Observable<ConcertModel[]> {
    return <Observable<ConcertModel[]>>this.http.get(`${Environment.defaultApi}/concert.json`);
  }

  get rehearsals(): Observable<RehearsalModel[]> {
    return <Observable<RehearsalModel[]>>this.http.get(`${Environment.defaultApi}/rehearsal.json`);
  }

  get setConcert(): Observable<ConcertModel[]> {
    return <Observable<ConcertModel[]>>this.http.post(`${Environment.defaultApi}/concert.json`, {});
  }

  get setRehearsal(): Observable<RehearsalModel[]> {
    return <Observable<RehearsalModel[]>>this.http.post(`${Environment.defaultApi}/rehearsal.json`, {});
  }
}
