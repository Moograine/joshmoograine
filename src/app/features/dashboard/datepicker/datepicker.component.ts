import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { UserService } from '../../../../assets/services/user.service';
import {
  Datepicker,
  DatepickerModel
} from '../../../../assets/models/datepicker.model';
import { DateService } from '../../../../assets/services/date.service';
import { AvailabilityStatus } from '../../../../assets/models/event.model';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent implements OnInit {
  dateMock: Array<{ date: number, availability: AvailabilityStatus[] }> = [];
  dateArray: DatepickerModel[] = [];
  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
  selectedMonth: Date = new Date;
  selectedDate = 0;
  eventCreator = false;
  contextMenuItem = [{
    label: 'Create Event'
  }];
  currentDate = new Date();

  constructor(private userService: UserService, private dateService: DateService) {
  }

  ngOnInit() {
    this.getCurrentDate();
    this.initMonths();

    for (let i = 1; i < 43; i++) {
      this.dateMock.push({
        date: i,
        availability: ['unknown', 'unknown', 'unknown', 'unknown', 'unknown']
      })
    }
  }

  isDeletableDate(availability: AvailabilityStatus[]): boolean {
    for (let i of availability) {
      if (i === 'available' || i === 'unavailable') {
        return false;
      }
    }
    return true;
  }

  initMonths(): void {
    this.dateService.availableDatesLoaded.subscribe((): void => {
      this.changeMonth();
    })
  }

  getCurrentDate(): void {
    //console.log(this.currentDate);
  }

  changeMonth(): void {
    this.dateArray = [];
    this.selectedMonth.setDate(1);
    const previousMonth = new Date;
    previousMonth.setMonth(this.selectedMonth.getMonth() - 1);
    const firstDayOfSelectedMonth = this.days.indexOf(formatDate(this.selectedMonth, 'EEEE', 'en-US'));
    for (let i = 0; i < firstDayOfSelectedMonth; i++) {
      const previousMonthDay = new Date(this.selectedMonth.getFullYear(),
        this.selectedMonth.getMonth(), 1 - firstDayOfSelectedMonth + i);
      this.dateArray.push(new Datepicker(previousMonthDay, this.userService.currentUser.id, []));
    }
    const lastDayOfSelectedMonth = parseInt(formatDate(new Date(this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth() + 1, 0), 'dd', 'en-US'));
    for (let i = 1; i <= lastDayOfSelectedMonth; i++) {
      const remainingDate = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), i);
      const halo = formatDate(remainingDate, 'YYYY-MM-dd', 'en-US');
      const indexHalo = this.dateService.availabilityList ? Object.keys(this.dateService.availabilityList).indexOf(halo) : -1;
      if (indexHalo > -1) {
        this.dateArray.push(new Datepicker(remainingDate, this.userService.currentUser.id, this.dateService.availabilityList[halo]));

      } else {
        this.dateArray.push(new Datepicker(remainingDate, this.userService.currentUser.id, []));
      }

    }
    for (let i = 1; this.dateArray.length < 42; i++) {
      const remainingDate = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, i);
      this.dateArray.push(new Datepicker(remainingDate, this.userService.currentUser.id, []));
    }
  }

  displayUserById(id: number, fullName: boolean): string {
    return this.userService.getUserNameById(id, fullName);
  }

  openEventCreator(): void {
    this.eventCreator = true;
  }

  setAvailability(dateItem: any): void { // TODO change it to type Date
    const userId = this.userService.currentUser.id;
    let changeTo: AvailabilityStatus = 'unknown';
    switch (dateItem.availability[userId]) {
      case 'unknown':
        changeTo = 'available';
        break;
      case 'unavailable':
        changeTo = 'unknown';
        break;
      case 'available':
        changeTo = 'unavailable';
        break;
    }
    dateItem.availability[userId] = changeTo;

    const dateIndex = formatDate(dateItem.date, 'YYYY-MM-dd', 'en-US');
    if (!this.isDeletableDate(dateItem.availability)) {
      this.dateService.setDatepickerAvailability(dateIndex, dateItem.availability).subscribe((): void => {
        if (!(this.dateService.availabilityList[dateIndex] as any)) {
          this.dateService.availabilityList[dateIndex] = dateItem.availability;
        }
        (this.dateService.availabilityList[dateIndex] as any)[userId] = changeTo;
      });
    } else {
      delete this.dateService.availabilityList[dateIndex];
      this.dateService.deleteDate(dateIndex).subscribe();
    }
  }

}
