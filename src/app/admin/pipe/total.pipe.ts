import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {
  transform(value: Amount[], args?: any): any {
    return value.map(v => v.price).reduce((accumulator, currentValue) => accumulator + currentValue);
  }
}

export interface Amount {
    price: string
  }
  
  export interface Invoice {
    name: string,
    amounts: Amount[];
  }