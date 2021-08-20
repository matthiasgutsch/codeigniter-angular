import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../../models/blog';
import { Works } from '../../../../models/works';
import { FormControl } from '@angular/forms';
import { WorksService } from '../../../../services/works.service';
import { ComuniService } from '../../../../services/comuni.service';

import { SelectItem } from "primeng/api";
import * as moment from 'moment';
import { Comuni } from 'src/app/models/comuni';
import { Locations } from 'src/app/models/locations';
import { LocationsService } from 'src/app/services/locations.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-locations-form',
  templateUrl: './locations-form.component.html'
})
export class LocationsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  locations: Locations;
  location: Locations;

  comuni: Comuni;

  checked: boolean = true;
  selectedValue: string;

  categoryForm: FormGroup;

  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedWorks: Works;
  selectedDate: Date;
  date: Date;

  constructor(
    private fb: FormBuilder,
    private comuniService: ComuniService,
    private locationsService: LocationsService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }


  }

  ngOnInit() {


    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {


      this.pageTitle = 'Luogo lavorazione';
      this.locationsService.getId(+id).subscribe(
        res => {
          this.categoryForm.patchValue({
            category_name: res.category_name,
            category_description: res.category_description,
            id: res.id
          });

        }
      );
    } else {
      this.pageTitle = 'Crea Luogo lavorazione';
    }

    this.categoryForm = this.fb.group({
      id: [''],
      category_name: ['', Validators.required],
      category_description: ['']

    });
  }


  get category_name() {
    return this.categoryForm.get('category_name');
    return this.categoryForm.get('category_description');

  }


  onSubmit() {

    const formData = new FormData();

    formData.append('category_name', this.categoryForm.get('category_name').value);
    formData.append('category_description', this.categoryForm.get('category_description').value);

    const id = this.categoryForm.get('id').value;

    if (id) {
      this.locationsService.update(formData, +id).subscribe(
        res => {
          if (res.status == 'error') {
            this.uploadError = res.message;
          } else {
            this._location.back();
          }
        },
        error => this.error = error
      );
    } else {
      this.locationsService.create(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this._location.back();
          }
        },
        error => this.error = error
      );
    }

  }

}
