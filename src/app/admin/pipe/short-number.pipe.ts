import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

    transform(value: number, precision: number = 0, iso639: string = 'en'): string {
        let myStr = value;

        if (value === null) return null;
        // TODO fix negative implementation : '-654321' -> '-654K', actually '654K'
        const isNegative = value < 0; // will also work for Negative numbers
        value = Math.abs(value);
        
        for (let i = 0; i < format[iso639].powers.length; i++) {
            if ( value / Math.pow(10, (i + 1) * 3) < 1) {
                const r = (isNegative ? '-' : '') + res(value, i, precision) + format[iso639].powers[i];

                if (!isNaN(myStr)) {
                  return r;
                } else {
                  return format[iso639].parse([myStr]).replace(/\d+\.\d+/, (match) => {
                    return format[iso639].transform([r]);
                  });
                }
            }
        }
    }
}

const res = ( n: number, pow: number, precision: number = 0 ) => 
  ( Math.round( n / Math.pow(10, pow * 3) * Math.pow(10, precision)) / Math.pow(10, precision) )

const format = {
  en: {
    parse:  (s: string[]) => (s[0] = s[0].replace(/,/g, '')),
    extract:  (s: string[]) => (s[0] = s[0].replace(/[^\.\d]/gi, '')),
    transform: (s: string[]) => (s[0] = s[0]),
    powers: ['', 'K', 'M', 'B', 'T', 'Q']
  },
  fr: {
    parse:  (s: string[]) => (s[0] = s[0].replace(/\s/g, '').replace(',', '.')),
    extract:  (s: string[]) => (s[0] = s[0].replace(/[^\,\d]/gi, '').replace(',', '.')),
    transform: (s: string[]) => (s[0] = s[0].replace(/\.\d/gi, ',')),
    powers: ['', 'k', 'M', 'G', 'T', 'P']
  }
}
