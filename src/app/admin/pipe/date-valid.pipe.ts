import { Inject, LOCALE_ID, Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "dateValid",
})
export class DateValidPipe extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }

  transform(
    value: any,
    format?: string,
    timezone?: string,
    locale?: string
  ): any {
    return new Date().getTime() < value
      ? super.transform(value, format, timezone, locale)
      : false;
  }
}
