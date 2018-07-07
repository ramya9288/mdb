import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoanServiceService } from '../Service/loan-service.service';

import $ from 'jquery';
declare let window: any;
import * as Web3 from 'web3';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-addinvestor',
  templateUrl: './addinvestor.component.html',
  styleUrls: ['./addinvestor.component.scss']
})
export class AddinvestorComponent implements OnInit, OnDestroy {
  public account;
  public id1;
  public _web3:any;

  constructor(private ls:LoanServiceService,private router: Router, private spinner: NgxSpinnerService) { }

  investor_register() 
  {
     if((document.getElementById('verify') as HTMLInputElement).checked == true)
    {
      this.spinner.show();
      this.ls.getAccount().then(address =>{
      this.ls.register_investor(address).then(res =>{
        this.spinner.hide();
        if(res == 0) {
          alert("You Rejected this Transaction")
        }
        else if(res == 2) {
          alert("Transaction Failed !")
        }
        else if(res == 1) {
          this.ls.investor_ids().then(inv_ids => {
            alert("You Successfully Registered As An Investor, Your Investor Id Is:  "+inv_ids.length)
          })
        }
      })
    })
  }
  else{
    alert('please confirm')
  }
}

  ngOnInit() {
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
