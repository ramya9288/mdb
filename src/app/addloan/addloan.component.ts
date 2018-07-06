import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanServiceService } from '../Service/loan-service.service';
import $ from 'jquery';
import * as Web3 from 'web3';
import { checkAndUpdatePureExpressionInline } from '@angular/core/src/view/pure_expression';
declare let window: any;
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-addloan',
  templateUrl: './addloan.component.html',
  styleUrls: ['./addloan.component.scss']
})
export class AddloanComponent implements OnInit {

  public  _web3: any;
  public bank_id;
  public borrower_id;
  public loan_details=[];

  constructor(private ls:LoanServiceService,private router: Router, private spinner: NgxSpinnerService) { }
  
  upload(borrowerid,borrowerloanAmount,interestrate,loanduration,assetdetails,assetamt,borrowerpaid)
  {
    this.spinner.show();
    this.ls.getAccount().then(address=>{
      this.ls.add_loan(borrowerid,borrowerloanAmount,interestrate,loanduration,assetdetails,assetamt,borrowerpaid,address).then(result =>{
        this.spinner.hide();
        if(result == 0) {
          alert("You Rejected this Transaction")
        }
        else if(result == 2) {
          alert("Transaction Failed !")
        }
        else if(result == 1) {
          this.table();
          this.ls.loan_ids().then(loan_ids => {
            alert("Loan Added Successfully and Generated Loan Id Is:  "+loan_ids.length)
          });
        }
      })
    })
  }
 
  table()
  {
    this.loan_details=[];
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
          console.log(result)
          this.loan_details.push(obj)           
        })
      });
    })
  }
  
  ngOnInit() 
  {
    this.table()
  }

}