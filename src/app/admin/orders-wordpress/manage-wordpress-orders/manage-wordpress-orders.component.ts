import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Blog } from '../../../models/blog';
import {ConfirmationService} from 'primeng/api';
import { CategoryService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import {MessageService} from 'primeng/api';
import { Clients } from 'src/app/models/clients';
import { ClientsService } from 'src/app/services/clients.service';
import { ComuniService } from 'src/app/services/comuni.service';
import { Comuni } from 'src/app/models/comuni';
import { BillingsService } from 'src/app/services/billings.service';
import { jsPDF } from "jspdf";
import { NgxSpinnerService } from "ngx-spinner";
import { Orders } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: "app-manage-wordpress-orders",
  templateUrl: "./manage-wordpress-orders.component.html",
})
export class ManageWordpressOrdersComponent implements OnInit {

  orders: any = [
    {
      "id": 727,
      "parent_id": 0,
      "number": "727",
      "order_key": "wc_order_58d2d042d1d",
      "created_via": "rest-api",
      "version": "3.0.0",
      "status": "processing",
      "currency": "USD",
      "date_created": "2017-03-22T16:28:02",
      "date_created_gmt": "2017-03-22T19:28:02",
      "date_modified": "2017-03-22T16:28:08",
      "date_modified_gmt": "2017-03-22T19:28:08",
      "discount_total": "0.00",
      "discount_tax": "0.00",
      "shipping_total": "10.00",
      "shipping_tax": "0.00",
      "cart_tax": "1.35",
      "total": "29.35",
      "total_tax": "1.35",
      "prices_include_tax": false,
      "customer_id": 0,
      "customer_ip_address": "",
      "customer_user_agent": "",
      "customer_note": "",
      "billing": {
        "first_name": "John",
        "last_name": "Doe",
        "company": "",
        "address_1": "969 Market",
        "address_2": "",
        "city": "San Francisco",
        "state": "CA",
        "postcode": "94103",
        "country": "US",
        "email": "john.doe@example.com",
        "phone": "(555) 555-5555"
      },
      "shipping": {
        "first_name": "John",
        "last_name": "Doe",
        "company": "",
        "address_1": "969 Market",
        "address_2": "",
        "city": "San Francisco",
        "state": "CA",
        "postcode": "94103",
        "country": "US"
      },
      "payment_method": "bacs",
      "payment_method_title": "Direct Bank Transfer",
      "transaction_id": "",
      "date_paid": "2017-03-22T16:28:08",
      "date_paid_gmt": "2017-03-22T19:28:08",
      "date_completed": null,
      "date_completed_gmt": null,
      "cart_hash": "",
      "meta_data": [
        {
          "id": 13106,
          "key": "_download_permissions_granted",
          "value": "yes"
        }
      ],
      "line_items": [
        {
          "id": 315,
          "name": "Woo Single #1",
          "product_id": 93,
          "variation_id": 0,
          "quantity": 2,
          "tax_class": "",
          "subtotal": "6.00",
          "subtotal_tax": "0.45",
          "total": "6.00",
          "total_tax": "0.45",
          "taxes": [
            {
              "id": 75,
              "total": "0.45",
              "subtotal": "0.45"
            }
          ],
          "meta_data": [],
          "sku": "",
          "price": 3
        },
        {
          "id": 316,
          "name": "Ship Your Idea &ndash; Color: Black, Size: M Test",
          "product_id": 22,
          "variation_id": 23,
          "quantity": 1,
          "tax_class": "",
          "subtotal": "12.00",
          "subtotal_tax": "0.90",
          "total": "12.00",
          "total_tax": "0.90",
          "taxes": [
            {
              "id": 75,
              "total": "0.9",
              "subtotal": "0.9"
            }
          ],
          "meta_data": [
            {
              "id": 2095,
              "key": "pa_color",
              "value": "black"
            },
            {
              "id": 2096,
              "key": "size",
              "value": "M Test"
            }
          ],
          "sku": "Bar3",
          "price": 12
        }
      ],
      "tax_lines": [
        {
          "id": 318,
          "rate_code": "US-CA-STATE TAX",
          "rate_id": 75,
          "label": "State Tax",
          "compound": false,
          "tax_total": "1.35",
          "shipping_tax_total": "0.00",
          "meta_data": []
        }
      ],
      "shipping_lines": [
        {
          "id": 317,
          "method_title": "Flat Rate",
          "method_id": "flat_rate",
          "total": "10.00",
          "total_tax": "0.00",
          "taxes": [],
          "meta_data": []
        }
      ],
      "fee_lines": [],
      "coupon_lines": [],
      "refunds": [],
      "_links": {
        "self": [
          {
            "href": "https://example.com/wp-json/wc/v3/orders/727"
          }
        ],
        "collection": [
          {
            "href": "https://example.com/wp-json/wc/v3/orders"
          }
        ]
      }
    },
    {
      "id": 728,
      "parent_id": 0,
      "number": "727",
      "order_key": "wc_order_58d2d042d1d",
      "created_via": "rest-api",
      "version": "3.0.0",
      "status": "processing",
      "currency": "USD",
      "date_created": "2017-03-22T16:28:02",
      "date_created_gmt": "2017-03-22T19:28:02",
      "date_modified": "2017-03-22T16:28:08",
      "date_modified_gmt": "2017-03-22T19:28:08",
      "discount_total": "0.00",
      "discount_tax": "0.00",
      "shipping_total": "10.00",
      "shipping_tax": "0.00",
      "cart_tax": "1.35",
      "total": "29.35",
      "total_tax": "1.35",
      "prices_include_tax": false,
      "customer_id": 0,
      "customer_ip_address": "",
      "customer_user_agent": "",
      "customer_note": "",
      "billing": {
        "first_name": "John",
        "last_name": "Doe",
        "company": "",
        "address_1": "969 Market",
        "address_2": "",
        "city": "San Francisco",
        "state": "CA",
        "postcode": "94103",
        "country": "US",
        "email": "john.doe@example.com",
        "phone": "(555) 555-5555"
      },
      "shipping": {
        "first_name": "John",
        "last_name": "Doe",
        "company": "",
        "address_1": "969 Market",
        "address_2": "",
        "city": "San Francisco",
        "state": "CA",
        "postcode": "94103",
        "country": "US"
      },
      "payment_method": "bacs",
      "payment_method_title": "Direct Bank Transfer",
      "transaction_id": "",
      "date_paid": "2017-03-22T16:28:08",
      "date_paid_gmt": "2017-03-22T19:28:08",
      "date_completed": null,
      "date_completed_gmt": null,
      "cart_hash": "",
      "meta_data": [
        {
          "id": 13106,
          "key": "_download_permissions_granted",
          "value": "yes"
        }
      ],
      "line_items": [
        {
          "id": 315,
          "name": "Woo Single #1",
          "product_id": 93,
          "variation_id": 0,
          "quantity": 2,
          "tax_class": "",
          "subtotal": "6.00",
          "subtotal_tax": "0.45",
          "total": "6.00",
          "total_tax": "0.45",
          "taxes": [
            {
              "id": 75,
              "total": "0.45",
              "subtotal": "0.45"
            }
          ],
          "meta_data": [],
          "sku": "",
          "price": 3
        },
        {
          "id": 316,
          "name": "Ship Your Idea &ndash; Color: Black, Size: M Test",
          "product_id": 22,
          "variation_id": 23,
          "quantity": 1,
          "tax_class": "",
          "subtotal": "12.00",
          "subtotal_tax": "0.90",
          "total": "12.00",
          "total_tax": "0.90",
          "taxes": [
            {
              "id": 75,
              "total": "0.9",
              "subtotal": "0.9"
            }
          ],
          "meta_data": [
            {
              "id": 2095,
              "key": "pa_color",
              "value": "black"
            },
            {
              "id": 2096,
              "key": "size",
              "value": "M Test"
            }
          ],
          "sku": "Bar3",
          "price": 12
        }
      ],
      "tax_lines": [
        {
          "id": 318,
          "rate_code": "US-CA-STATE TAX",
          "rate_id": 75,
          "label": "State Tax",
          "compound": false,
          "tax_total": "1.35",
          "shipping_tax_total": "0.00",
          "meta_data": []
        }
      ],
      "shipping_lines": [
        {
          "id": 317,
          "method_title": "Flat Rate",
          "method_id": "flat_rate",
          "total": "10.00",
          "total_tax": "0.00",
          "taxes": [],
          "meta_data": []
        }
      ],
      "fee_lines": [],
      "coupon_lines": [],
      "refunds": [],
      "_links": {
        "self": [
          {
            "href": "https://example.com/wp-json/wc/v3/orders/727"
          }
        ],
        "collection": [
          {
            "href": "https://example.com/wp-json/wc/v3/orders"
          }
        ]
      }
    }
  ];
  order: Orders;
  categories: any = [];
  category: Category;
  error: string;
  private category_id: number;
  private id: number;
  clients: any = [];
  client: Clients;
  comuni: any = [];
  productDialog: boolean = false;
  selectedSkills: any[];
  skills:  any[] = [];
  skillsArray: any = [];

  cols: any[];
  exportColumns: any[];
  _selectedColumns: any[];

  
  @ViewChild("content", { static: false }) content: ElementRef;
  currentUser: any;

  showDialog() {
    this.productDialog = true;
  }

  trackByFn(index, item) {
    return item.id;
  }

  constructor(
    private clientsService: ClientsService,
    private ordersService: OrdersService,
    private messageService: MessageService,
    private comuniService: ComuniService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
  ) {


  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    const userId = this.currentUser.user_id;

    


    this.spinner.show();
    this.orders;

      this.cols = [
        { field: "category_id", header: "Cliente" },
        { field: "id", header: "Numero Fattura" },
      ];
      this._selectedColumns = this.cols;
      this.exportColumns = this.cols.map(col => ({
        title: col.header,
        dataKey: col.field
      }));
     

      this.spinner.hide();

    this.getComuni();
    this.getClients();
   

  }

    getClients() {
    const userId = this.currentUser.user_id;
    this.clientsService.getAllListbyUser().subscribe(
      (data: Clients) => this.clients = data,
      error => this.error = error
    );
  
    }
  
    getComuni() {
  this.comuniService.getAllList().subscribe(
    (data: Comuni) => (this.comuni = data),
    (error) => (this.error = error)
  );

  }


  getCategoryItem(category_id: string, id: string) {
    return this.clients.find((item) => item.id === category_id);
  }

  getComuniItem(category_id: string, id: string) {
    return this.comuni.find((item) => item.id === category_id);
  }

  


edit(order: Orders) {
  this.order = { ...order};
  this.selectedSkills = JSON.parse("" + this.order.skills + "");
  this.productDialog = true;
}




  hideDialog() {
    this.productDialog = false;
  }

  onDelete(id: number, title: string) {
    this.confirmationService.confirm({
      message: "Are you sure want to delete it = " + id,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.ordersService.delete(+id).subscribe(
          (res) => {
            console.log(res);
            this.ngOnInit();
            this.messageService.add({
              key: "myKey1",
              severity: "warn",
              summary: "Attenzione",
              detail: "Cancellazione avvenuto con successo",
            });
          },
          (error) => (this.error = error)
        );
      },
    });
  }
}
