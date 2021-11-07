import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  changeDateFormatFromBackToForm(dateFromBack: string): string {
    let dateArray = dateFromBack.split("-")
    dateArray = dateArray.reverse()
    let tmp = dateArray[1];
    dateArray[1] = dateArray[0];
    dateArray[0] = tmp;
    dateArray[2] = dateArray[2].slice(2)
    return dateArray.join("/")
  }

  changeDateFormatFromFormToBack(dateFromFrom: string): string {
    const twentiesCentury = '20'

    let dateArray = dateFromFrom.split("/")
    let tmp = dateArray[1];
    dateArray[1] = dateArray[0];
    dateArray[0] = tmp;
    dateArray[2] = twentiesCentury + dateArray[2]
    dateArray = dateArray.reverse()
    return dateArray.join("-")
  }
}
