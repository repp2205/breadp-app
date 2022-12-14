import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth-service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { OrderService } from './services/order.service';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomValidators } from './utils/CustomValidators';
import { ProductService } from './services/product.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserComponent } from './components/user/user.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BakeryComponent } from './components/bakery/bakery.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RecoverComponent } from './components/recover/recover.component';
import { ModalComponent } from './components/bakery/modal/modal.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalRecoverComponent } from './components/login/modal/modal.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ViewInternalComponent } from './components/view-internal/view-internal.component';
import { AdministratorComponent } from './components/administrator/administrator.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    OrderComponent,
    ModalComponent,
    BakeryComponent,
    RegisterComponent,
    ModalRecoverComponent,
    ViewInternalComponent,
    AdministratorComponent,
    ReportsComponent,
    RecoverComponent,
  ],
    imports: [
      BrowserModule,
      MatIconModule,
      MatListModule,
      MatInputModule,
      MatMenuModule,
      MatTabsModule,
      MatTableModule,
      MatButtonModule,
      MatSelectModule,
      MatDialogModule,
      MatSidenavModule,
      MatDividerModule,
      MatStepperModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ToastrModule.forRoot({
            maxOpened: 5,
            autoDismiss: true,
            closeButton: true,
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 10000,
            extendedTimeOut: 5000,
        }),
      FormsModule,
      MatCardModule,
      MatPaginatorModule,
      MatExpansionModule,
      NgxMaterialTimepickerModule,

    ],
  providers: [
    AuthService,
    UserService,
    DataService,
    OrderService,
    ToastrService,
    ProductService,
    TranslateService,
    CustomValidators
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
