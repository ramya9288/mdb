import { Component, OnInit ,OnDestroy } from '@angular/core';
import { LoanServiceService } from '../Service/loan-service.service';

import { Router } from '@angular/router';
import $ from 'jquery';
declare let window: any;
import * as Web3 from 'web3';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-addspv',
  templateUrl: './addspv.component.html',
  styleUrls: ['./addspv.component.scss']
})
export class AddspvComponent implements OnInit {
  public  _web3: any;
  public account:string;
  public balance:number;
  public id1;
  constructor(private ls:LoanServiceService,private route:Router,private spinner:NgxSpinnerService) { }

  spv_registeration()
  {
     if((document.getElementById('verify') as HTMLInputElement).checked == true)
  {
    this.spinner.show();
    this.ls.getAccount().then(address=>{
      this.ls.register_spv(address).then(res=>{
        if(res == 0){
          alert("You Rejected this Transaction")
        }
        else if(res == 2){
          alert("Transaction Failed")
        }
        else if(res == 1)
        {            
          alert("You Successfully Registered As An SPV")
          this.route.navigate(['spv'])
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
                          meta.route.navigate(['metamask']);
                          clearInterval(this.interval);
                      } else {
                          window.location.reload(true);             
                               }
                  }
              } else {
                  meta.route.navigate(['metamask']);
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



