import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../../models/blog';
import { Works } from '../../../../models/works';
import { FormControl } from '@angular/forms';
import { WorksService } from '../../../../services/works.service';
import { ComuniService } from '../../../../services/comuni.service';

import { MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { Comuni } from 'src/app/models/comuni';
import { BrandService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html'
})
export class BrandsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  works: Works;
  work: Works;

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
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private brandsService: BrandService, 
    private comuniService: ComuniService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  }

  ngOnInit() {


    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {


      this.pageTitle = 'Modifica Brand';
      this.brandsService.getId(+id).subscribe(
        res => {
          this.categoryForm.patchValue({
            category_name: res.category_name,
            category_description: res.category_description,
            user_id: this.currentUser.user_id,
            id: res.id
          });

        }
      );
    } else {
      this.pageTitle = 'Aggiungi Brand';
    }

    this.categoryForm = this.fb.group({
      id: [''],
      category_name: ['', Validators.required],
      category_description: [''],
      user_id: [this.currentUser.user_id],

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
    formData.append('user_id', this.categoryForm.get('user_id').value);

    const id = this.categoryForm.get('id').value;

    if (id) {
      this.brandsService.update(formData, +id).subscribe(
        res => {
          if (res.status == 'error') {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
            this.router.navigate(['/admin/settings/brands']);
          }
        },
        error => this.error = error
      );
    } else {
      this.brandsService.create(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/settings/brands']);
          }
        },
        error => this.error = error
      );
    }

  }

}
