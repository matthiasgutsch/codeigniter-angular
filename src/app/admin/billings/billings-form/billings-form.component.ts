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
import { BILLING_LIST, TYPE_LIST } from '../../constants/constants';
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
import { Billings } from 'src/app/models/billings';
import { map, tap } from 'rxjs/operators';
import { ISkill } from 'src/app/models/products';
import { formatDate } from "@angular/common";
import { ProductsVariationsService } from 'src/app/services/products_variations.service';


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Skills } from 'src/app/models/skills';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductsVariations } from 'src/app/models/products_variations';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  productsVariations: any = [];
  productsVariation: ProductsVariations;
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
  idBilling: number;
  categoryAppointments: string;
  works_idAppointments:any;
  company: Company;
  descriptionBillings: string;
  dateAppointments: string;
  numberAppointments: number;
  numberOrders: number;
  filteredProductsVariations: any[];

  currentUser: any;
  public dataValues: object;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  skillsForm: FormGroup;
  skillsValues: any = [];
  total: number;
  viewMode = '1';
  editForm: boolean = true;
  company_tax: any;
  customerName: string;
  address: string;
  contactNo: number;
  email: string;
  products: Skills[] = [];
  additionalDetails: string;
  billingOptions: { label: string; value: string; }[];

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
    private productsVariationsService: ProductsVariationsService,
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
    this.billingOptions = BILLING_LIST;
  }

  @ViewChild('reportContent') reportContent: ElementRef;

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const userId = this.currentUser.user_id;
    this.page = history.state;

    this.getProductsVariations();
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
        this.idBilling = res.number;
        this.categoryAppointments = res.category_id;
        this.descriptionBillings = res.description;
        this.dateAppointments = res.date;
        this.grandTotal = res.total;
        this.vat = res.vat;
        this.subTotal = res.subtotal;
        this.numberAppointments = res.appointment_id;
        this.numberOrders = res.order_id;

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
          number: res.number,
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
      is_paid: [""],
      vat: [""],
      number: [""],
      total: [this.grandTotal],
    });
  }


  getProductsVariations() {
    this.productsVariationsService.getAllListbyUser().subscribe(data => {
      this.productsVariations = data })
    };



    filterCountry(event) {
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      let filtered: any[] = [];
      let query = event.query;
      for (let i = 0; i < this.productsVariations.length; i++) {
        let productsVariation = this.productsVariations[i];
        if (productsVariation.code.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(productsVariation);
        }
      }
  
      this.filteredProductsVariations = filtered;
      
    }

    
  generatePDF(action = 'open') {
    const format = 'dd/MM/yyyy';
    const formatYear = 'yyyy';

    const locale = 'en-US';

    const formattedDate = formatDate(this.dateAppointments, format, locale);
    const formattedDateYear = formatDate(this.dateAppointments, formatYear, locale);

    let docDefinition = {
      layout: 'headerLineOnly', // optional

      
      content: [

        {
          "canvas": [{
            "lineColor": "gray",
            "type": "line",
            "x1": 0,
            "y1": 0,
            "x2": 515,
            "y2": 0,
            "lineWidth": 1
          }]
        },

        {
          text: '' + this.company.name + '',
          fontSize: 12,
          alignment: 'left',
          margin: [0, 20 ,0, 0],        

          bold: true,

          color: '#111'
        },
        {
          text: '' + this.company.address + ' ' + this.company.zip + ' ' + this.company.city + '',
          fontSize: 12,
          alignment: 'left',
          color: '#111'
        },
        {
          text: '' + this.company.fiscalcode + ' ' + this.company.fiscalnumber + '',
          fontSize: 12,
          alignment: 'left',
          color: '#111'
        },
        {
          text: 'Cliente',
          bold: true,
          margin: [0, 20 ,0, 0],        

        },
        {

          columns: [
            [
              {
                text: this.getCategoryItem(this.categoryAppointments, '222')?.username},
              { text: this.getCategoryItem(this.categoryAppointments, '222')?.address },
              { text: this.getCategoryItem(this.categoryAppointments, '222')?.zip + ' ' + this.getCategoryItem(this.categoryAppointments, '222')?.city },
              { text: this.getCategoryItem(this.categoryAppointments, '222')?.fiscalcode + ' ' + this.getCategoryItem(this.categoryAppointments, '222')?.fiscalnumber },
              { text: this.contactNo }
            ],
            [
              {
                text: 'Data: '+ formattedDate +'',
                alignment: 'right',
                
              },
              { 
                text: 'Numero Fattura: ' + this.idBilling + '/'+ formattedDateYear + '',
                bold: true,
                alignment: 'right',
                
              }
            ]
          ]
        },
      
        {
          text: 'Note',
          bold: true,
          margin: [0, 20 ,0, 0],        

        },
        {
          text: this.descriptionBillings,
          fontSize: 12,
        },
        {
          text: 'Dettagli Ordine',
          style: 'sectionHeader'
        },
        
        { layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
  
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Posizione', 'Qty', 'Prezzo', 'Totale'],
              ...this.skillsValues.map(p => ([p.description.code + ' ' + p.description.description, p.qty, p.price, (p.price*p.qty).toFixed(2)])),
              [{text: 'Totale senza Iva', colSpan: 3}, {}, {}, (Math.round(this.subTotal * 100) / 100).toFixed(2)],
              [{text: 'Iva (' + this.company.fiscaltype + '%)', colSpan: 3}, {}, {}, (Math.round(this.vat * 100) / 100).toFixed(2)],
              [{bold: true, fontSize: 14, text: 'Totale', colSpan: 3}, {}, {}, (Math.round(this.grandTotal * 100) / 100).toFixed(2)]
            ]
          }
        },
        {
            text: this.additionalDetails,
            margin: [0, 0 ,0, 25]          
        },
       
        {
          "canvas": [{
            "lineColor": "gray",
            "type": "line",
            "x1": 0,
            "y1": 0,
            "x2": 200,
            "y2": 0,
            "lineWidth": 1
          }]
        },

        {
          columns: [
            //[{ qr: `${this.description}`, fit: '50' }],
            [{ text: 'Firma', 
            alignment: 'left', 
            italics: false,
            margin: [0, 5 ,15, 0]          
          }],
          ]
        },
        {
          text: 'Condizioni',
          fontSize: 12,
          bold: true,
          margin: [0, 25 ,15, 0]          

        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
            fontSize: 9,

        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download('Fattura-' + this.idBilling + '.pdf');
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();      
    }else{
      pdfMake.createPdf(docDefinition).open();      
    }

  }

  
  getselectedWorks() {
    this.selectedWorks = this.works_id.split(',');
    }
  
    
  changed(value){
      this.descriptionBillings = value.target.value
  }

  changedNumber(value){
    this.idBilling = value.target.value;
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


  editFormItems() {
    this.editForm = ! this.editForm;

  }


  removeImageFile() {
    this.imagePath = "";
    this.myInputVariable.nativeElement.value = "";
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
    this.vat = this.subTotal / 100 * this.company.fiscaltype;
    this.grandTotal = this.subTotal + this.vat;

  }



  drop(event: CdkDragDrop<string[]>) {
    const id = this.route.snapshot.paramMap.get("id");
    moveItemInArray(this.skillsValues, event.previousIndex, event.currentIndex);
    this.updateSkills(event, id);
    
  }


  updateSkills(event, id) {
    const formData = new FormData();
    formData.append('skills', JSON.stringify(this.skillsValues));
    
    this.billingsService.update_skills(formData, +id).subscribe({
      next: (response: any) => {
        if (response.error) {
        } else {
          this.messageService.add({key: 'myKey1', severity:'success', summary: 'Conferma', detail: 'Salvato con successo'});
          this.initSkill(this.skillsValues);
          this.blogForm.patchValue({
            skills: this.skillsValues,
          })

        }
      },
    });
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
            this.messageService.add({ key: 'myKey1', severity: 'warn', summary: 'Informazioni', detail: 'Fattura Non Pagata' });
            this.ngOnInit();
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
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Informazioni', detail: 'Fattura Pagata' });
            this.ngOnInit();

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
    this.vat = this.subTotal / 100 * this.company.fiscaltype;
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
    formData.append('number', this.blogForm.get('number').value);
    formData.append('skills', JSON.stringify(this.blogForm.get('skills').value));
    formData.append('subtotal', this.subTotal);
    formData.append('vat', this.vat);
    formData.append('total', this.grandTotal);
    formData.append('is_paid', this.blogForm.get('is_paid').value);

    const id = this.blogForm.get("id").value;

    if (id) {

      this.billingsService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
            this.billingsService.skills(+id).subscribe(value => {
              this.skillsValues = value;
            });
            this.editForm = true;
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
