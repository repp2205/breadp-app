import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ModalComponent } from './modal/modal.component';
import { BakeryService } from '../../services/bakery.service';
import { BranchOfficeService } from '../../services/branch-office.service';


@Component({
  selector: 'app-bakery',
  templateUrl: './bakery.component.html',
  styleUrls: ['./bakery.component.scss']
})
export class BakeryComponent implements OnInit {

  bakeryList: any[];
  productList: any[];
  panelOpenState: boolean;

  constructor(public dialog: MatDialog,
              private bakeryService: BakeryService,
              private toastService: ToastrService,
              private translateService: TranslateService,
              private branchOfficeService: BranchOfficeService) {
    this.panelOpenState = false;
    this.bakeryList = [];
    this.productList = [];
  }

  ngOnInit(): void {
    this.getBakerys();
  }

  openDialog(branchOffice: any): void {
    this.branchOfficeService.getProductsByBranchOffice(branchOffice.id).subscribe((response: any) => {
      if (response.length > 0) {
        const dialogRef = this.dialog.open(ModalComponent, {
          width: '1000px',
          data: { branchOffice: branchOffice, productList: response }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      } else {
        this.toastService.warning(this.translateService.instant('ERRORS.NO_PRODUCTS'), this.translateService.instant('ERRORS.TITLE'));
      }
    }, (error: any) => {
      this.toastService.error(this.translateService.instant('ERRORS.ERROR_PRODUCTS'), this.translateService.instant('ERRORS.TITLE'));
    });
  }

  getBakerys() {
    this.bakeryService.getBakerys().subscribe((response: any) => {
      this.bakeryList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
}
