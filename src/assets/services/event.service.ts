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

  setConcert(id: string, payload: ConcertModel): Observable<ConcertModel> {
    return <Observable<ConcertModel>>this.http.put(`${Environment.defaultApi}/concert/${id}.json`, payload);
  }

  setRehearsal(id: string, payload: RehearsalModel): Observable<RehearsalModel> {
    return <Observable<RehearsalModel>>this.http.put(`${Environment.defaultApi}/rehearsal/${id}.json`, payload);
  }

  deleteConcert(id: number): Observable<ConcertModel> {
    return <Observable<ConcertModel>>this.http.delete(`${Environment.defaultApi}/concert/${id}.json`);
  }

  deleteRehearsal(id: number): Observable<RehearsalModel> {
    return <Observable<RehearsalModel>>this.http.delete(`${Environment.defaultApi}/rehearsal/${id}.json`);
  }
}
