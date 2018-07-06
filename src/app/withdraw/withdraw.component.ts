import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoanServiceService } from '../Service/loan-service.service';
import $ from 'jquery';
import * as Web3 from 'web3';
declare let window: any;
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, OnDestroy {
  public bank_id;
  public borrower_id;
  public loan_details=[];
  public balance:number;
  public account;
  public id1;
  public _web3:any;

  constructor(private ls:LoanServiceService,private router: Router,private spinner: NgxSpinnerService) { 

    $("#issuer").addClass("active");
    $("#spv").removeClass("active");
    $("#investor").removeClass("active");

    this.borrower_id='';
    this.bank_id='';
    this.ls.contract_balance().then(result=>this.balance=result)
  }

  withdraw(amount)
  {
    var amt=amount*1000000000000000000;
    this.spinner.show();
    this.ls.getAccount().then(address =>{
      this.ls.issuer_withdraw(amt,address).then(res=>{
        this.spinner.hide();
        if(res == 0) {
          alert("You Rejected the Transaction")
        }
        else if(res == 2) {
          alert("Transaction Failed !")
        }
        else if(res == 1)
        {
          this.ls.contract_balance().then(result=>this.balance=result)
          alert("Amount Credited to Your Wallet")
        }
      })
    })
  }


  ngOnInit() {
  //  this.table()

       let meta = this;
         meta.ls.getAccount().then(acc => {
             this.account = acc;
             meta.id1 = setInterval(function() {
              if (typeof window.web3 !== 'undefined') {
                  meta._web3 = new Web3(window.web3.currentProvider);
                  if (meta._web3.eth.accounts[0] !== meta.account) {
                      meta.account = meta._web3.eth.accounts[0];
                      if (meta._web3.eth.accounts[0] === undefined) {
                          meta.router.navigate(['metamask']);
                          clearInterval(this.interval);
                      } else {
                          window.location.reload(true);             
                               }
                  }
              } else {
                  meta.router.navigate(['metamask']);
              }
             }, 100);
          });
   
     }
     ngOnDestroy() {
       if (this.id1) {
         clearInterval(this.id1);
       }
   
     }

}
