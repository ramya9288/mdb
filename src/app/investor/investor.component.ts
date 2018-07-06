import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery';
import { LoanServiceService} from "../Service/loan-service.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss']
})
export class InvestorComponent implements OnInit {

  public address;
  public available_pools = [];
  public purchased_pools = [];
  public loans_of_pool=[];
  public investor_gain_amount;

  constructor(private ls: LoanServiceService, private router: Router, private spinner: NgxSpinnerService) { 
    $("#investor").addClass("active");
    $("#spv").removeClass("active");
    $("#issuer").removeClass("active");
    this.investor_gain()
  }

  investor_purchase_pool(poolid){
    this.spinner.show()
    this.ls.pool_ids().then(pool_ids =>{
      if(pool_ids.length>=poolid && poolid >=1)
      {
        this.ls.show_loanids_of_pool(poolid).then(loan_ids=>{
          this.ls.loan_status(loan_ids).then(state =>{
            if(state[0] ==0 && state[1] ==0){
              //pool not sold to spv
              alert("Pool "+poolid+" Currently not Available")
            }
            else if(state[0] != 0 && state[1] != 0){
              //pool aready sold to investor
              // alert(state)
              alert("Pool "+poolid+" Already Sold !")
            }
            else if(state[0] != 0 && state[1] == 0){
              //pool available
              this.ls.pool_details(poolid).then(amo_obj =>{
                this.ls.investor_purchase(poolid,this.address,amo_obj[0]).then(result =>{
                  this.spinner.hide();
                  if(result == 0) {
                    alert("You Rejected this Transaction")
                  }
                  else if(result == 2) {
                    alert("Transaction Failed !")
                  }
                  else if(result == 1) {
                    this.available_pools_table();
                    this.purchased_pools_table();
                    alert("You Purchased Pool "+poolid)
                  }
                });
              });
            }
          })
        })
      }
      else
      {
        alert("You Entered an Invalid Pool Id");
      }
    })
  }

  investor_gain(){
    this.ls.getAccount().then(address => {
      this.ls.investor_id_get(address).then(inv_id =>{
        this.ls.investor_details(inv_id).then(i_d =>{
          this.investor_gain_amount = i_d[1];
        })
      })
    })
  }
    
  available_pools_table() {
    this.available_pools.length = 0;
    this.ls.getAccount().then(address=>{
      this.ls.investor_id_get(address).then(inv_id =>{  
        this.ls.spv_ids().then(spv_ids=>{
          spv_ids.forEach(spv_id => {
            this.ls.pool_ids().then(pool_ids => {
              pool_ids.forEach(pool_id =>{
                this.ls.is_owned_spv(spv_id,pool_id).then(result =>{
                  this.ls.pool_details(pool_id).then(result2 => {
                    if(result == true)
                    {
                      let obj={};
                      obj['poolid'] = pool_id;
                      obj['poolvalue'] = result2[0]/1000000000000000000;
                      this.available_pools.push(obj);
                    }
                  })
                });
              })
            })
          });
        })
      })  
    }) 
  }
  
  purchased_pools_table() {
    this.purchased_pools.length = 0;
    this.ls.getAccount().then(address=>{
      this.ls.investor_id_get(address).then(inv_id =>{  
        this.ls.pool_ids().then(pool_ids => {
          pool_ids.forEach(pool_id => {
            this.ls.is_owned_investor(inv_id,pool_id).then(result =>{
              if(result == true)
              {
                this.ls.pool_details(pool_id).then(p_d =>{
                  let obj2 = {};
                  obj2['poolid'] = pool_id;
                  obj2['poolvalue'] = p_d[0]/1000000000000000000;
                  this.purchased_pools.push(obj2)
                })
              }
            })
          })
        })
      })
    })
  } 
  
  loans_of_pools(){
    this.loans_of_pool.length = 0;
    this.ls.pool_ids().then(pool_ids => {
      pool_ids.forEach(pool_id =>{
        let obj = {};
        obj["poolid"] = pool_id;
        this.ls.show_loanids_of_pool(pool_id).then(loan_ids => {
          obj["loanids"] = loan_ids;
          this.loans_of_pool.push(obj)
        })
      })
    })
  }
  
  ngOnInit()
   {
    this.available_pools_table();
    this.investor_gain()
    this.loans_of_pools();
    this.purchased_pools_table();
  }
  
}