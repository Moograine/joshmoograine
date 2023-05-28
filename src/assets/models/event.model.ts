import { AvailabilityStatus } from './datepicker.model';

export interface ConcertModel {
  date: Date;
  location: string;
  availability: AvailabilityStatus[];
}

export interface RehearsalModel {
  date: Date;
  location: string;
  duration: string;
  availability: AvailabilityStatus[];
}

// TODO not used
export class Rehearsal {
  date = null;
  location = '';
  duration = '';
  availability: AvailabilityStatus[] = [];

  constructor(date: Date, location: string, duration: string, availability: AvailabilityStatus[]) {
    this.date = null;
    this.location = location;
    this.duration = duration;
    this.availability = availability;
  }
}

// TODO not used
export class Concert {
  date = null;
  location = '';
  availability: AvailabilityStatus[] = [];

  constructor(date: Date, location: string, availability: AvailabilityStatus[]) {
    this.date = null;
    this.location = location;
    this.availability = availability;
  }
}
