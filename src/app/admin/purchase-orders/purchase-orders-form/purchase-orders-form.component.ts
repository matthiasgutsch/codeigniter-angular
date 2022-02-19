import { Component, ElementRef, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
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
import { Location } from '@angular/common';
import { WorksService } from 'src/app/services/works.service';
import { Works } from 'src/app/models/works';
import { Locations } from 'src/app/models/locations';
import { Appointments } from 'src/app/models/appointments';
import { Employees } from 'src/app/models/employees';
import { LocationsService } from 'src/app/services/locations.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDate } from "@angular/common";
import { Billings } from 'src/app/models/billings';
import { map, tap } from 'rxjs/operators';
import { ISkill } from 'src/app/models/products';
import { BillingsService } from 'src/app/services/billings.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { Suppliers } from 'src/app/models/suppliers';
import { PurchaseOrdersService } from 'src/app/services/purchase_orders.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: "app-purchase-orders-form",
  templateUrl: "./purchase-orders-form.component.html",
})
export class PurchaseOrdersFormComponent implements OnInit {
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
  pages: any;
  categories: any = [];
  category: Category;
  works: any = [];
  work: Works;
  checked: boolean = true;
  selectedValue: string;
  typeList: any[];
  suppliers: any = [];
  supplier: Suppliers;
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
  contactNo: number;

  cities: Blog[];
  format1: string = "";
  format2: string = "";
  selectedCity: Blog;
  selectedCategories: Category;
  selectedSuppliers: Suppliers;
  selectedDate: Date;
  date: Date;
  works_id: any;
  page: string;
  idOrders: number;
  categoryAppointments: string;
  categoryOrders: string;
  works_idOrders:any;
  company: Company;
  descriptionOrders: string;
  dateOrders: any;
  numberOrders: number;
  currentUser: any;
  public dataValues: object;
  addForm: FormGroup;
  rows: FormArray;
  itemForm: FormGroup;
  skillsForm: FormGroup;
  skillsValues: any = [];
  total: number;
  viewMode = '1';
  fiscaltype: number;
  editForm: boolean = true;
  numberQuotes: number;
  idAppointments: number;
  dateAppointments: string;
  idBilling: number;
  descriptionBillings: string;
  additionalDetails: string;

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private fb: FormBuilder,
    private purchaseOrdersService: PurchaseOrdersService,
    private messageService: MessageService,
    private suppliersService: SuppliersService,
    private _location: Location,
    private locationsService: LocationsService,
    private worksService: WorksService,
    private employeesService: EmployeesService,
    private companyService: CompanyService,
    private billingsService: BillingsService,
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
    this.fiscaltype = 0;
    
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


    this.suppliersService.getAllListbyUser().subscribe(
      (data: Suppliers) => (this.suppliers = data),
      (error) => (this.error = error)
    );


    this.companyService.getId(userId).subscribe(
      (data: Company) => (this.company = data),
      (error) => (this.error = error)
    );
   
    this.companyService.getId(userId).subscribe(value => {
      this.fiscaltype = this.company.fiscaltype;
    });

    const id = this.route.snapshot.paramMap.get("id");

    this.purchaseOrdersService.skills(+id).subscribe(value => {
      this.skillsValues = value;
    });


    this.billingsService
    .find_billings_by_order_id(+id)
    .subscribe(data => {
      this.pages = data[0];
      return data.id;
    }, err => {
  });



    if (id) {
      this.pageTitle = "Modifica Ordine Fornitore";
      this.purchaseOrdersService.getId(+id).subscribe((res) => {
        this.imagePath = res.image;
        this.idOrders = res.id;
        this.categoryOrders = res.category_id;
        this.descriptionOrders = res.description;
        this.dateOrders = res.date;
        this.grandTotal = res.total;
        this.vat = res.vat;
        this.descriptionBillings = res.description;
        this.subTotal = res.subtotal;
        this.idBilling = res.id;
        this.numberOrders = res.order_id;
        this.works_idOrders = res.works_id.split(',');
        this.numberQuotes = res.quotes_id;
        this.idAppointments = res.id;
        this.dateAppointments = res.date;


        

        this.blogForm.patchValue({
          title: res.title,
          description: res.description.split(','),
          category_id: res.category_id,
          order_id: res.order_id,
          works_id: res.works_id.split(','),
          user_id: this.currentUser.user_id,
          is_featured: res.is_featured,
          date: res.date,
          id: res.id,
          skills: this.skillsValues,
          subtotal: res.subtotal,
          vat: res.vat,
          total: res.total,

        });
    

      });
    } else {
      this.pageTitle = "Aggiungi Ordine Fornitore";
    }

    this.blogForm = this.fb.group({
      id: [""],
      title: [""],
      description: [""],
      order_id: [""],
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

  drop(event: CdkDragDrop<string[]>) {
    const id = this.route.snapshot.paramMap.get("id");
    moveItemInArray(this.skillsValues, event.previousIndex, event.currentIndex);
    this.updateSkills(event, id);
    
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
          text: 'Fornitore',
          bold: true,
          margin: [0, 20 ,0, 0],        

        },
        {

          columns: [
            [
              {
                text: this.getCategoryItem(this.categoryAppointments, '222')?.company_name},
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
                text: 'ID: ' + this.idBilling + '/'+ formattedDateYear + '',
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
          text: 'Dettagli Ordine Fornitore',
          style: 'sectionHeader'
        },
        
        { layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
  
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Posizione', 'Qty', 'Prezzo', 'Totale'],
              ...this.skillsValues.map(p => ([p.description, p.qty, p.price, (p.price*p.qty).toFixed(2)])),
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
      pdfMake.createPdf(docDefinition).download('Ordine Fornitore - Fattura-' + this.idOrders + '.pdf');
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();      
    }else{
      pdfMake.createPdf(docDefinition).open();      
    }

  }


  updateSkills(event, id) {
    const formData = new FormData();
    formData.append('skills', JSON.stringify(this.skillsValues));
    
    this.purchaseOrdersService.update_skills(formData, +id).subscribe({
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

    doc.save('Fattura-' + this.idOrders + '.pdf');

  }


  getselectedWorks() {
    this.selectedWorks = this.works_id.split(',');
    }
  
    
  changed(value){
      this.descriptionOrders = value.target.value
    }

  changeTime(value){
      this.dateOrders =  new Date();
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
    return this.suppliers.find((item) => item.id === categoryAppointments);
  }

  editFormItems() {
    this.editForm = ! this.editForm;

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

    this.purchaseOrdersService.skills(+id).subscribe(
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



createBilling() {
  const formData = new FormData();

  formData.append("title", this.blogForm.get("title").value);
  formData.append("description", this.blogForm.get("description").value);
  formData.append("order_id",  this.blogForm.get("id").value);
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
  this.billingsService
      .find_billings_by_order_id(+id)
      .subscribe(data => {
        this.pages = data[0];
        return data.id;
        console.log(data[0])
      }, err => {
    });

  if (id ) {
    this.confirmationService.confirm({
      message: 'Vorresti creare la Fattura ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.billingsService.create(formData).subscribe(
          (res) => {
            if (res.status === "error") {
              this.uploadError = res.message;
            } else {
              const currentUrl = this.router.url;
    
              
              this.messageService.add({ key: 'myKey1', severity: 'info', summary: 'Attenzione', detail: 'Futtura / Ricevuta creata con successo' });
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
                
            });
            }
          },
          error => this.error = error
        );
      },
    });
  } else {
    this.router.navigate(['/admin/billings/edit/', this.pages.id]);
  }
}


  onSubmit() {
    const formData = new FormData();
    formData.append("title", this.blogForm.get("title").value);
    formData.append("description", this.blogForm.get("description").value);
    formData.append("appointment_id", this.blogForm.get("id").value);
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
      this.purchaseOrdersService.update(formData, +id).subscribe(
        (res) => {
          if (res.status == "error") {
            this.uploadError = res.message;
          } else {
            this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Attenzione', detail: 'Salvato con sucesso' });
            this.ngOnInit();

          }
        },
        (error) => (this.error = error)
      ); 
    } else {
      this.purchaseOrdersService.create(formData).subscribe(
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