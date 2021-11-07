import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minsToHoursConverter'
})
export class MinsToHoursConverterPipe implements PipeTransform {

  transform(str: string): string {
    const minsInHour = 60;

    let DefaultMinsNumber = parseInt(str);
    let hours = Math.floor(DefaultMinsNumber / minsInHour);
    let mins = DefaultMinsNumber - minsInHour * hours;

    return `${hours}h ${mins}min`;
  }

}
