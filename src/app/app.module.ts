import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddbankComponent } from './addbank/addbank.component';
import { AddborrowerComponent } from './addborrower/addborrower.component';
import { AddloanComponent } from './addloan/addloan.component';
import { CreatepackComponent } from './createpack/createpack.component';
import { UpdateloanComponent } from './updateloan/updateloan.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { SpvComponent } from './spv/spv.component';
import { InvestorComponent } from './investor/investor.component';
import { AddinvestorComponent } from './addinvestor/addinvestor.component';
import { AddspvComponent } from './addspv/addspv.component';
import { MetamaskErrorComponent } from './metamask-error/metamask-error.component';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AddbankComponent,
    AddborrowerComponent,
    AddloanComponent,
    CreatepackComponent,
    UpdateloanComponent,
    WithdrawComponent,
    SpvComponent,
    InvestorComponent,
    AddinvestorComponent,
    AddspvComponent,
    MetamaskErrorComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    // MDBSpinningPreloader,
    // MDBBootstrapModules
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
