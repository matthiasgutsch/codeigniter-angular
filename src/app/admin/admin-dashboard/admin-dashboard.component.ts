import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendar} from 'primeng/fullcalendar';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_LIST } from '../constants/constants';
import { CategoryService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';
import { ClientsService } from 'src/app/services/clients.service';
import { Clients } from 'src/app/models/clients';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import { Appointments } from 'src/app/models/appointments';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  options: any;
  events: any;
  appointments: Appointments;
  error: string;
  blogForm: FormGroup;
  typeList: any;
  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  uploadError: string;
  selectedCategories: Category;
  selectedDate: Date;
  date: Date;
  categories: any = [];
  category: Category;
  productDialog:boolean = false;
  clients: Clients;
  client: Clients;
  comuni: any = [];

trackByFn(index, item) {
  return item.id;
}


  constructor(private blogService: BlogService,     
    private clientsService: ClientsService,
    private appointmentsService: AppointmentsService,
    private fb: FormBuilder,
    private comuniService: ComuniService,

    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
    ) {
      this.typeList = TYPE_LIST;

    this.events = this.appointments;

   }

  ngOnInit() {
    this.appointmentsService.getAllList().subscribe(
      (data: Appointments) => this.appointments = data,
      error => this.error = error
    );

    this.clientsService.getAllList().subscribe(
      (data: Clients) => this.clients = data,
      error => this.error = error
    );

    this.comuniService.getAllList().subscribe(
      (data: Comuni) => this.comuni = data,
      error => this.error = error
    );


    this.options = {
      plugins:[ dayGridPlugin, timeGridPlugin, interactionPlugin ],
      header: {
          right: 'prev,next',
          left: 'title',
        },
      editable: true
  };



  this.blogForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    is_featured: ['0'],
    category_id: ['', Validators.required],
    is_active: ['0'],
    image: [''],
    date: ['', Validators.required]
  });

} 




getCategoryItem(category_id: string, id: string) {
  return this.comuni.find(item => item.id === category_id);
}



showDialog() {
  this.productDialog = true;
}

onSubmit() {
  const formData = new FormData();
  formData.append('title', this.blogForm.get('title').value);
  formData.append('description', this.blogForm.get('description').value);
  formData.append('is_featured', this.blogForm.get('is_featured').value);
  formData.append('category_id', this.blogForm.get('category_id').value);
  formData.append('is_active', this.blogForm.get('is_active').value);
  formData.append('image', this.blogForm.get('image').value);
  formData.append('date', this.blogForm.get('date').value);

  const id = this.blogForm.get('id').value;

  if (id) {
    this.blogService.updateBlog(formData, +id).subscribe(
      res => {
        if (res.status == 'error') {
          this.uploadError = res.message;
        } else {
          this.router.navigate(['/admin/blogs']);
        }
      },
      error => this.error = error
    );
  } else {
    this.blogService.createBlog(formData).subscribe(
      res => {
        if (res.status === 'error') {
          this.uploadError = res.message;
        } else {
          this.blogForm.reset();
          this.productDialog = false;
          this.messageService.add({key: 'myKey1', severity:'success', summary: 'Congratulazione', detail: 'Aggiunto con successo'});
          this.blogService.getBlogs().subscribe(
            (data: Blog) => this.appointments = data,
            error => this.error = error
          );
        }
      },
      error => this.error = error
    );
  }

}
  
}
