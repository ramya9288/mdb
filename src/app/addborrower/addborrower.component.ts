import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoanServiceService } from '../Service/loan-service.service';
import $ from 'jquery';
import * as Web3 from 'web3';
declare let window: any;
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-addborrower',
  templateUrl: './addborrower.component.html',
  styleUrls: ['./addborrower.component.scss']
})
export class AddborrowerComponent implements OnInit {

  public bank_id;
  public borrower_id;
  public loan_details=[];
  public borrowerlist=[];
  public banklist = [];
  public balance:number;
  public account;
  public id1;
  public _web3:any;

  constructor(private ls:LoanServiceService,private router: Router, private spinner: NgxSpinnerService)
{
    $("#issuer").addClass("active");
    $("#spv").removeClass("active");
    $("#investor").removeClass("active");

    this.borrower_id='';
    this.ls.contract_balance().then(result=>this.balance=result)
     }

  get_borrower_id(brwrname,bankid)
  {
    this.spinner.show();
    this.ls.getAccount().then(address=>{
      this.ls.add_borrower(bankid,brwrname,address).then(res=>{
        this.spinner.hide();
        if(res == 0) {
          alert("You Rejected this Transaction")
        }
        else if(res == 2) {
          alert("Transaction Failed !")
        }
        else if(res == 1) {    
          this.ls.borrower_ids().then(id=>{
            this.borrower_id=id.length
            this.borrower_table()
            alert("Borrower Successfully Registered and Borrower Id Is:  "+id.length)
          })
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
          obj['borrowerloanamt']=result[2]
          obj['borrowerintrest']=result[1]
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

  bank_table(){
    this.banklist.length = 0;
    this.ls.bank_ids().then(bank_ids =>{
      bank_ids.forEach(bank_id => {
        let obj = {};
        this.ls.bank_detail_map(bank_id).then(b_d =>{
          obj['bankid']= bank_id;
          obj['bankname'] = b_d;
          this.banklist.push(obj);
        })
      })
      
    })
  }

  borrower_table(){
    this.borrowerlist = []
    this.ls.borrower_ids().then(ids =>{
      ids.forEach(element => {
        let temp_obj={};
        this.ls.borrower_map(element).then(details=>{
          temp_obj['borrowerid']=element;
          temp_obj['borrowername']=details;
          this.borrowerlist.push(temp_obj)
        })
      });
    })
  }

  ngOnInit() {
   this.table()
   this.bank_table()
   this.borrower_table()

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
