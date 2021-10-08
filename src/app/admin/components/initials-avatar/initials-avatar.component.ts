import { Component, OnInit, Input, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-initials-avatar",
  templateUrl: "./initials-avatar.component.html",
  styleUrls: ["./initials-avatar.component.scss"]
})
export class InitialsAvatarComponent implements OnInit {
  @Input() firstName: string = "John";
  @Input() lastName: string = "Doe";

  bgColor: string;

  yiq_contrasted_threshold = 150;

  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.bgColor = this.getInitialsBgColor();
  }

  getInitialsBgColor(): string {
    var s = 47;
    var l = 30;

    if (this.firstName) {
      s = this.getSaturationByName(this.firstName, this.lastName);
      l = this.getLightnessByName(this.firstName, this.lastName);
    }

    var color = this.stringToHslColor(
      this.firstName + " " + this.lastName,
      s,
      l
    );
    return color;
  }
  getInitialsTextColor(): string {
    // var s = this.getSaturationByName(firstName, lastName);
    // var l = this.getLightnessByName(firstName, lastName);
    // if (l >= 40) return "black";
    // else return "white";

    let color = this.getInitialsBgColor();

    var h = this.convertStringToHue(this.firstName + this.lastName);
    var s = this.getSaturationByName(this.firstName, this.lastName);
    var l = this.getLightnessByName(this.firstName, this.lastName);

    var rgb = this.hslToRgb(h, s, l);

    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    let yiq = (r * 299 + g * 587 + b * 114) / 1000;

    if (yiq >= this.yiq_contrasted_threshold) {
      return "black";
    } else {
      return "white";
    }
  }
  private getLightnessByName(firstName: string, lastName: string): number {
    var num =
      firstName.toUpperCase().charCodeAt(0) +
      lastName.toUpperCase().charCodeAt(0);
    // return this.scaleBetween(num, 0, 100, 65 * 2, 97 * 2);
    return this.scaleBetween(num, 0, 100, 65 * 2, 97 * 2);
  }
  private getSaturationByName(firstName: string, lastName: string): number {
    var num =
      firstName.toUpperCase().charCodeAt(0) +
      lastName.toUpperCase().charCodeAt(0);
    // return this.scaleBetween(num, 20, 95, 65 * 2, 97 * 2);
    return this.scaleBetween(num, 0, 100, 65 * 2, 97 * 2);
  }
  private scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max): number {
    var res =
      ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) +
      minAllowed;
    return parseInt(res);
  }
  private stringToHslColor(
    str: string,
    saturation: number,
    lightness: number
  ): string {
    var h = this.convertStringToHue(str);
    return "hsl(" + h + ", " + saturation + "%, " + lightness + "%)";
  }

  private convertStringToHue(str: string): number {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 360;
  }

  private hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
}
