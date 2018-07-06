import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanServiceService } from '../Service/loan-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import $ from 'jquery';
@Component({
  selector: 'app-spv',
  templateUrl: './spv.component.html',
  styleUrls: ['./spv.component.scss']
})
export class SpvComponent implements OnInit {
public address;
public available_pools=[];
public purchased_pools=[];
public spv_gain_amount;
public loans_of_pool =[];

  constructor(private ls: LoanServiceService,private router: Router, private spinner:NgxSpinnerService) { 
    $("#spv").addClass("active");
    $("#issuer").removeClass("active");
    $("#investor").removeClass("active");
  }

  spv_gain(){
    this.ls.getAccount().then(address => {
      this.ls.spv_id_get(address).then(spv_id => {
        this.ls.spv_details(spv_id).then(s_d => {
          this.spv_gain_amount =s_d[1];
        })
      })
    })
  }


  purchasepool(poolid){
    this.spinner.show();
    this.ls.pool_ids().then(pool_ids =>{
      if(pool_ids.length>=poolid && poolid >=1)
      {
        this.ls.getAccount().then(address =>{
          this.ls.pool_details(poolid).then(data=>{
            if(data[1] == false)
            {
              this.ls.spv_buy_pool(poolid,data[0],address).then(result=>{
                this.spinner.hide();
                if(result == 0) {
                  alert("You Rejected this Transaction")
                }
                else if(result == 2) {
                  alert("Transaction Failed !")
                }
                else if(result == 1) {
                  this.purchased()
                  this.available()
                  alert("You Bought the Pool "+poolid)
                }
              })
            }
            else{
              alert("pool "+poolid+" already sold")
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

  purchased(){
    this.purchased_pools.length =0;
    this.ls.getAccount().then(address =>{
      this.ls.spv_id_get(address).then(spvid=>{
        if(spvid>0)
        {
          this.ls.pool_ids().then(p_ids =>{
            p_ids.forEach(index=>{
              this.ls.is_owned_spv(spvid,index).then(status=>{
                if(status == true)
                {
                  this.ls.pool_details(index).then(result=>{
                    let obj={};
                    obj['id']=index;
                    obj['value']=result[0]/1000000000000000000;
                    this.purchased_pools.push(obj)
                  }) 
                }
              })
            })
          })
        }
        else{
          alert("Still not purchased")
        }
      })
    })
  }



  available(){
    this.available_pools.length = 0;
    this.ls.pool_ids().then(ids =>{
      ids.forEach(element => {
        let pool_obj={};
        this.ls.pool_details(element).then(data=>{
          if(data[1]==false)
          {
            pool_obj['id']=element;
            pool_obj['value']=data[0]/1000000000000000000;
            this.available_pools.push(pool_obj)
          }
        });
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
    this.purchased()
    this.available()
    this.spv_gain()
    this.loans_of_pools()
  }

}
  