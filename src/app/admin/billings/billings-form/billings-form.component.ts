import { Component, ElementRef, OnInit } from '@angular/core';
import { BillingsService } from '../../../services/billings.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import { Category } from '../../../models/category';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/categories.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import * as moment from 'moment';
import { TYPE_LIST } from '../../constants/constants';
import { Clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
import { Location } from '@angular/common';
import { WorksService } from 'src/app/services/works.service';
import { Works } from 'src/app/models/works';
import { Locations } from 'src/app/models/locations';
import { Appointments } from 'src/app/models/appointments';
import { Employees } from 'src/app/models/employees';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { LocationsService } from 'src/app/services/locations.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Billings } from 'src/app/models/billings';
import { map, tap } from 'rxjs/operators';
import { ISkill } from 'src/app/models/products';

@Component({
  selector: "app-billings-form",
  templateUrl: "./billings-form.component.html",
})
export class BillingsFormComponent implements OnInit {
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: any;
  blogs: Blog;
  blog: Blog;
  blogForm: FormGroup;
  itemTotal: any
  appointments: Appointments;
  appointment: Appointments;

  billing: Billings;
  billings: Billings;


  categories: any = [];
  category: Category;

  works: any = [];
  work: Works;

  checked: boolean = true;
  selectedValue: string;

  typeList: any[];
  clients: any = [];
  client: Clients;
  arrString: string;

  employees: any = [];
  employee: Employees;
  skillsArray: any = [];
  description: any;
  selectedWorks: SelectItem[] = [];
  selectedWorks2: SelectItem[];
  locations: any = [];
  location: Locations;
  subTotal: any;
  vat: any;
  grandTotal: any;
  is_paid: string;
  id: number;
  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedCategories: Category;
  selectedClients: Clients;
  selectedDate: Date;
  date: Date;
  works_id: any;
  page: string;
  idAppointments: number;
  categoryAppointments: string;
  works_idAppointments:any;
  company: Company;
  descriptionAppointments: string;
  dateAppointments: string;
  numberAppointments: number;
  currentUser: any;
  public dataValues: object;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  skillsForm: FormGroup;
  skillsValues: any = [];
  total: number;
  viewMode = '1';
  fiscaltype: '22';

  
  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: FormBuilder,
    private billingsService: BillingsService,
    private messageService: MessageService,
    private clientsService: ClientsService,
    private _location: Location,
    private locationsService: LocationsService,
    private worksService: WorksService,
    private employeesService: EmployeesService,
    private companyService: CompanyService,

    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.date) {
      this.selectedDate = new Date(this.date);
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

    this.typeList = TYPE_LIST;
   
    
  }
  @ViewChild('reportContent') reportContent: ElementRef;

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const userId = this.currentUser.user_id;
    this.page = history.state;


    this.getselectedWorks;
  

    this.worksService.getAllListbyUser().subscribe(
      (data: Works) => (this.works = data),
      (error) => (this.error = error)
    );


    this.clientsService.getAllListbyUser().subscribe(
      (data: Clients) => (this.clients = data),
      (error) => (this.error = error)
    );


    this.companyService.getId(userId).subscribe(
      (data: Company) => (this.company = data),
      (error) => (this.error = error)
    );
   
 

    const id = this.route.snapshot.paramMap.get("id");

    this.billingsService.skills(+id).subscribe(value => {
      this.skillsValues = value;
    });



    if (id) {
      this.pageTitle = "Modifica Fattura / Ricevuta";
      this.billingsService.getId(+id).subscribe((res) => {
        this.imagePath = res.image;
        this.idAppointments = res.id;
        this.categoryAppointments = res.category_id;
        this.descriptionAppointments = res.description;
        this.dateAppointments = res.date;
        this.grandTotal = res.total;
        this.vat = res.vat;
        this.subTotal = res.subtotal;
        this.numberAppointments = res.appointment_id;
        this.works_idAppointments = res.works_id.split(',');

        this.blogForm.patchValue({
          title: res.title,
          description: res.description.split(','),
          category_id: res.category_id,
          appointment_id: res.appointment_id,
          works_id: res.works_id.split(','),
          user_id: this.currentUser.user_id,
          is_featured: res.is_featured,
          date: res.date,
          id: res.id,
          skills: this.skillsValues,
          subtotal: res.subtotal,
          vat: res.vat,
          is_paid: res.is_paid,
          total: res.total,
        });
    
        this.id = res.id;
        this.is_paid = res.is_paid;

      });
    } else {
      this.pageTitle = "Aggiungi Fattura / Ricevuta";
      
    }

    this.blogForm = this.fb.group({
      id: [""],
      title: [""],
      description: [""],
      appointment_id: [""],
      category_id: [""],
      works_id: [""],
      user_id: [this.currentUser.user_id],
      is_featured: ["0"],
      date: ["", Validators.required],
      skills: this.initSkill(this.skillsValues),
      subtotal: [""],
      vat: [""],
      total: [this.grandTotal],
    });
  }



  
  @ViewChild('content', {static: false}) content: ElementRef;


  public downloadPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.reportContent.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('Fattura-' + this.idAppointments + '.pdf');

  }


  getselectedWorks() {
    this.selectedWorks = this.works_id.split(',');
    }
  
    
  changed(value){
      this.descriptionAppointments = value.target.value
    }

    

  changeTime(value){
      this.dateAppointments = value.target.value
    }
    
  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.get("image").setValue(file);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imagePath = reader.result;
      };
    }
  }

  getCategoryItem(categoryAppointments: string, id: string) {
    return this.clients.find((item) => item.id === categoryAppointments);
  }

  
  getWorksItem(works_id: string, id: string) {
    return this.works.find(item => item.id === works_id);
  }


  

  removeImageFile() {
    this.imagePath = "";
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
  }

  get title() {
    return this.blogForm.get("title");
  }

  initSkill(skillsValues: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    const id = this.route.snapshot.paramMap.get("id");

    this.billingsService.skills(+id).subscribe(
      (res)=>{
        this.skillsValues = res;

        this.skillsValues.forEach((e)=>{
          formArray.push(this.fb.group({
            description: e.description,
            qty: e.qty,
            price: e.price,
            itemTotal: e.qty * e.price,
          }))
        })
      }
    )

    /*formArray.push(this.fb.group({
      qty: [''],
      price: ['']
    })) */
    

    return formArray;
  }

   
  private createSkillFormGroup(skill:any): FormGroup{
    return new FormGroup({
      'qty':new FormControl(skill.qty),
      'price':new FormControl(skill.price), 
      'itemTotal':new FormControl(skill.itemTotal)
    })
  }

  public addSkill(skill:any){
    this.skills.push(this.createSkillFormGroup(skill));
  }


  get skills() {
    return this.blogForm.get('skills') as FormArray;
  }
  
  
  
  itemsChanged(): void {
    let total: number = 0;
    for (let t = 0; t < (<FormArray>this.blogForm.get('skills')).length; t++) {
      if (this.blogForm.get('skills')?.value[t].qty != '' && this.blogForm.get('skills')?.value[t].price) {
        total = (this.blogForm.get('skills')?.value[t].qty * this.blogForm.get('skills')?.value[t].price) + total;
      }
    }
    this.subTotal = total;
    this.vat = this.subTotal / 100 * 22;
    this.grandTotal = this.subTotal + this.vat;

  }


  closeBilling() {
    const formData = new FormData();
    formData.set('is_paid', '0');
    const id = this.blogForm.get("id").value;
      this.billingsService.billingStatus(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'warn', summary: 'Informazioni', detail: 'Ticket chiuso con sucesso' });
          }
        },
        (error) => (this.error = error)
      );
  }

  openBilling() {
    const formData = new FormData();
    formData.set('is_paid', '1');
    const id = this.blogForm.get("id").value;
      this.billingsService.billingStatus(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'ticket aperto con sucesso' });
          }
        },
        (error) => (this.error = error)
      );
  }
  
  newQuantity(): FormGroup {
    const numberPatern = '^[0-9.,]+$';
    return this.fb.group({
      description: [''],
      qty: [1, [Validators.required, Validators.pattern(numberPatern)]],
      price: ['', [Validators.required, Validators.pattern(numberPatern)]],
      itemTotal: [''],
      
    })
  }
   
  addQuantity(event) {
    this.skills.push(this.newQuantity());
  }
   
  removeQuantity(i: number): void {
    let totalCostOfItem = this.blogForm.get('skills')?.value[i].qty * this.blogForm.get('skills')?.value[i].price;
    this.subTotal = this.subTotal - totalCostOfItem;
    this.vat = this.subTotal / 100 * 22;
    this.grandTotal = this.subTotal + this.vat;
    (<FormArray>this.blogForm.get('skills')).removeAt(i);
  }
  
  get total_sum() {
    return this.itemTotal.reduce((total, fee) => total + fee.balance, 0);
}


  onSubmit() {
    const formData = new FormData();
    formData.append("title", this.blogForm.get("title").value);
    formData.append("description", this.blogForm.get("description").value);
    formData.append("appointment_id", this.blogForm.get("appointment_id").value);
    formData.append("category_id", this.blogForm.get("category_id").value);
    formData.append("is_featured", this.blogForm.get("is_featured").value);
    formData.append("works_id", this.blogForm.get("works_id").value);
    formData.append("date", this.blogForm.get("date").value);
    formData.append('user_id', this.blogForm.get('user_id').value);
    formData.append('skills', JSON.stringify(this.blogForm.get('skills').value));
    formData.append('subtotal', this.subTotal);
    formData.append('vat', this.vat);
    formData.append('total', this.grandTotal);

    const id = this.blogForm.get("id").value;

    if (id) {
      this.billingsService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });

          }
        },
        (error) => (this.error = error)
      ); 
    } else {
      this.billingsService.create(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
            this._location.back();

          }
        },
        (error) => (this.error = error)
      );
    }
  }
}
