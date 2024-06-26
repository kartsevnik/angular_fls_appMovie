import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ToTimeForMovie'
})
export class ToTimeForMovie implements PipeTransform {

  transform(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + ' hrs ' + minutes + ' mins';
  }

}
