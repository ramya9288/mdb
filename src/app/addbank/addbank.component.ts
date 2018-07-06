import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoanServiceService } from '../Service/loan-service.service';
import $ from 'jquery';
import * as Web3 from 'web3';
declare let window: any;
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-addbank',
  templateUrl: './addbank.component.html',
  styleUrls: ['./addbank.component.scss']
})
export class AddbankComponent implements OnInit, OnDestroy { 
  public bankid;
  // public borrower_id;
  // public loan_details=[];
  // public balance:number;
  public account;
  public id1;
  public _web3:any;

  constructor(private ls:LoanServiceService,private router: Router, private spinner: NgxSpinnerService) { 

    $("#issuer").addClass("active");
    $("#spv").removeClass("active");
    $("#investor").removeClass("active");
    this.bankid='';
    // this.ls.contract_balance().then(result=>this.balance=result)
  }

  get_bank_Id(bname) {
    this.spinner.show()
    this.ls.getAccount().then(address=>{
       this.ls.add_bank(bname,address).then(result=>{
        this.spinner.hide();
        if(result == 0) {
          alert("You Rejected this Transaction")
        }
        else if(result == 2) {
          alert("Transaction Failed !")
        }
        else if(result == 1) {
          this.ls.bank_ids().then(ids=>{
            this.bankid =ids.length;
            // this.table();
            alert("Bank Registered Successfully! "+this.bankid)
          })
        }
      })
    })
  }


  // table()
  // {
  //   this.loan_details.length =0;
  //   this.ls.loan_ids().then(ids=>{
  //     ids.forEach(element => {
  //       let obj={};
  //       this.ls.borrower_details_map(element).then(result =>{
  //         obj['loanid']=element;
  //         obj['borrowerid']=result[0]
  //         obj['borrowerloanamt']=result[2]
  //         obj['borrowerintrest']=result[1]
  //         obj['loanduration']=result[3]
  //         obj['assetid']=result[4]
  //         obj['assetdetails']=result[5]
  //         obj['assetamt']=result[6]
  //         obj['borrowerpaid']=result[7]
  //         this.loan_details.push(obj)           
  //       })
  //     });
  //   })
  // }

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
