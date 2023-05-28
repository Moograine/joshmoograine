import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AvailabilityListModel } from '../models/datepicker.model';
import { Environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DateService {
  availabilityList: any = {};
  availableDatesLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  get availableDateList(): Observable<object> {
    return <Observable<object>>this.http.get(`${Environment.defaultApi}/datepicker.json`);
  }

  setDatepickerAvailability(id: string, body: boolean[]): Observable<AvailabilityListModel[]> {
    return <Observable<AvailabilityListModel[]>>this.http.put(`${Environment.defaultApi}/datepicker/${id}.json`, body);
  }

  deleteDate(id: string): Observable<AvailabilityListModel> {
    return <Observable<AvailabilityListModel>>this.http.delete(`${Environment.defaultApi}/datepicker/${id}.json`);
  }
}
