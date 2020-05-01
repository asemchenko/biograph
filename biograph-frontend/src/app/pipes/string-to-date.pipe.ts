import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stringToDate'
})
export class StringToDatePipe implements PipeTransform {

  transform(iso8601Date: string): Date {
    return new Date(iso8601Date);
  }

}
