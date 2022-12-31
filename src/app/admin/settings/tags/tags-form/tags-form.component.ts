import { Component, ElementRef, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
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
import { Tags } from 'src/app/models/tags';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags-form',
  templateUrl: './tags-form.component.html'
})
export class TagsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  tags: Tags;
  tag: Tags;

  comuni: Comuni;

  checked: boolean = true;
  selectedValue: string;

  categoryForm: UntypedFormGroup;

  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedWorks: Works;
  selectedDate: Date;
  date: Date;
  currentUser: any;

  constructor(
    private fb: UntypedFormBuilder,
    private tagsService: TagsService,
    private comuniService: ComuniService,

    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  }

  ngOnInit() {



    const id = this.route.snapshot.paramMap.get('id');
    if (id) {


      this.pageTitle = 'Modifica Tags';
      this.tagsService.getId(+id).subscribe(
        res => {
          this.categoryForm.patchValue({
            category_name: res.category_name,
            category_description: res.category_description,
            category_seo_url: res.category_seo_url,
            user_id: this.currentUser.user_id,
            id: res.id
          });

        }
      );
    } else {
      this.pageTitle = 'Create Category';
    }

    this.categoryForm = this.fb.group({
      id: [''],
      category_name: ['', Validators.required],
      category_description: [''],
      category_seo_url: [''],
      user_id: [this.currentUser.user_id]

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
    formData.append('category_seo_url', this.categoryForm.get('category_seo_url').value);

    formData.append('user_id', this.categoryForm.get('user_id').value);

    const id = this.categoryForm.get('id').value;

    if (id) {
      this.tagsService.update(formData, +id).subscribe(
        res => {
          if (res.status == 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/settings/tags']);
          }
        },
        error => this.error = error
      );
    } else {
      this.tagsService.create(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/admin/settings/tags']);
          }
        },
        error => this.error = error
      );
    }

  }

}
