import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trasformTimeDuration',
  pure: true
})
export class TrasformTimeDuration implements PipeTransform {

  transform(value: number | null | undefined): string {

    if (value == null) {
      return '0 hrs 0 mins'
    }
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + ' hrs ' + minutes + ' mins';
  }

}
