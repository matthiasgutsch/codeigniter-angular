import { Component, OnInit } from '@angular/core';
import { Works } from '../../../models/works';
import {ConfirmationService} from 'primeng/api';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-manage-works',
  templateUrl: './manage-works.component.html'
})
export class ManageWorksComponent implements OnInit {
  title = 'Tipo di Intervento';
  works: Works;
  work: Works;
  error: string;


  constructor(private worksService: WorksService, private confirmationService: ConfirmationService,) { }

  ngOnInit() {
    this.worksService.getAllList().subscribe(
      (data: Works) => this.works = data,
      error => this.error = error
    );
  }


  editProduct(work: Works) {
    this.work = {...work};
}


onDelete(id: number, category_name: string) {

  this.confirmationService.confirm({
    message: 'Are you sure want to delete it = ' + category_name,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.worksService.delete(+id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
        );
      },
     
  });

   
  }

}
