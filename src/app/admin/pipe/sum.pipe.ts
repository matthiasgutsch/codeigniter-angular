import { NgModule, Pipe, PipeTransform } from "@angular/core";

export interface ListCount {
  centre?: string;
  cause?: string;
  pice?: string;
}


@Pipe({
  name: "sum"
})
export class SumPipe implements PipeTransform {
  transform(items: ListCount[], attr: string): number {
    return items.reduce((a, b) => a + b[attr], 0);
  }
}

@NgModule({
  declarations: [SumPipe],
  exports: [SumPipe]
})
export class SumPipeModule {}
