import { NgModule, Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'splitComma'
  })
  export class SplitCommaStringPipe implements PipeTransform {
    transform(val:string):string[] {
      return val.split(',');
    }
  }