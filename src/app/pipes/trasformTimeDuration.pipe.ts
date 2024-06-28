import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trasformTimeDuration'
})
export class TrasformTimeDuration implements PipeTransform {

  transform(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + ' hrs ' + minutes + ' mins';
  }

}
