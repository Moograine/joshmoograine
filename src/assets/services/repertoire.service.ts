import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environments/environment';
import { SetlistModel, SongModel } from '../models/repertoire.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RepertoireService {
  setlistCollection: SetlistModel[] = [];
  songCollection: SongModel[] = [];

  constructor(private http: HttpClient) {
  }

  get setlists(): Observable<SetlistModel[]> {
    return <Observable<SetlistModel[]>>this.http.get(`${Environment.defaultApi}/repertoire/setlists.json`);
  }

  get songs(): Observable<SongModel[]> {
    return <Observable<SongModel[]>>this.http.get(`${Environment.defaultApi}/repertoire/songs.json`);
  }
}
