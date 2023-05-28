export type AvailabilityStatus = 'available' | 'unavailable' | 'unknown';

export interface DatepickerModelApi {
  date: Date;
  availability: AvailabilityStatus[];
}

export interface DatepickerModel {
  date: Date;
  availability: AvailabilityStatus[];
}

export class Datepicker implements DatepickerModel {
  date = new Date();
  availability: AvailabilityStatus[] = ['unknown', 'unknown', 'unknown', 'unknown', 'unknown'];

  constructor(date: Date, userId: string, isAvailable: any ) {
    this.date = date;
    for(let i in isAvailable) {
      //console.log('isavailable', isAvailable[i]);
      this.availability[parseInt(i)] = isAvailable[i];
    }
  }
}

export interface AvailabilityListModel {
  [key: string]: AvailabilityStatus[];
}
