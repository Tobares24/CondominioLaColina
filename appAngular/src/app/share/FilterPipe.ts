import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterValue: any): any[] {
    return value.filter((item) => item === filterValue);
  }
}
