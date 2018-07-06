import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoanServiceService } from '../Service/loan-service.service';
declare let window: any;
import * as Web3 from 'web3';
import $ from 'jquery';
import { ReturnStatement } from '@angular/compiler';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-updateloan',
  templateUrl: './updateloan.component.html',
  styleUrls: ['./updateloan.component.scss']
})
export class UpdateloanComponent implements OnInit, OnDestroy{
public updated_loan_details=[];
public address;
public account;
public id1;
public _web3:any;

public Result_spv_id;
public Result_investor_id;
public result_pool_id;

public status_of_pool;
public is_packed;
  constructor(private ls:LoanServiceService,private router: Router, private spinner:NgxSpinnerService) { }
     
updateloan(text_loan_id,amount){
  this.spinner.show();
  this.ls.getAccount().then(address =>{
  this.ls.loan_status(text_loan_id).then(result=>{
    if(result[0] == 0 && result[1] == 0)
    {
      this.ls.update_loan(text_loan_id,amount,0,0,0,address).then(res=>{
        this.spinner.hide();
        if(res == 0) {
          alert("You Rejected this Transaction")
        }
        else if(res == 2) {
          alert("Transaction Failed !")
        }
        else if(res == 1) {
          this.table()
          alert("Loan Amount Updated")
        }
      })
    }
    else if(result[0] != 0 && result[1] ==0)
    {
        this.ls.update_loan(text_loan_id,amount,1,result[0],0,address).then(res=>{
          this.spinner.hide();
          if(res == 0) {
            alert("You Rejected this Transaction")
          }
          else if(res == 2) {
            alert("Transaction Failed !")
          }
          else if(res == 1) {
            this.table()
            alert("Loan Amount Updated")
          }
        })
    }
    else if(result[0] !=0 && result[1] !=0)
    {
      this.ls.update_loan(text_loan_id,amount,2,result[0],result[1],address).then(res=>{
        this.spinner.hide();
        if(res == 0) {
          alert("You Rejected this Transaction")
        }
        else if(res == 2) {
          alert("Transaction Failed !")
        }
        else if(res == 1) {
          this.table()
          alert("Loan Amount Updated")
        }
      })
    }
  })
})
}
                    
  table()
  {
    this.updated_loan_details=[];
    this.ls.loan_ids().then(ids=>{
      ids.forEach(element => {
        let obj={};
        this.ls.borrower_details_map(element).then(result =>{
          obj['loanid']=element;
          obj['borrowerid']=result[0]
          obj['borrowerloanamt']=result[1]
          obj['borrowerintrest']=result[2]
          obj['loanduration']=result[3]
          obj['assetid']=result[4]
          obj['assetdetails']=result[5]
          obj['assetamt']=result[6]
          obj['borrowerpaid']=result[7]   
          this.updated_loan_details.push(obj)                 
        })
      });
    })
  
  }

  ngOnInit() {
    this.table()
 
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
             }, 200);
          });
   
     }
     ngOnDestroy() {
       if (this.id1) {
         clearInterval(this.id1);
       }
   
     }
    }
