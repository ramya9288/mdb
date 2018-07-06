import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
declare let require: any;
declare let window: any;
import { NgxSpinnerService } from "ngx-spinner";

let loanAbi = require('./loan.json');


@Injectable({
  providedIn: 'root'
})
export class LoanServiceService {
  public  _web3: any;
  public account:string;
  public  address:string=null;
  public loan_contract: any;
  public loan_contractaddress: string = "0x038fD296909fC354046D23477eCA074906eEFF41";


  constructor(private spinner:NgxSpinnerService) {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider); 
     
    this.loan_contract = this._web3.eth.contract(loanAbi).at(this.loan_contractaddress)
    }
  }
  
  public async getAccount(): Promise<string> {
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            // this.router.navigate(['metamask']);
            return;
          }
          if (accs.length === 0) {
            // this.router.navigate(['metamask']);
            return;
          }
          resolve(accs[0]);

           })
      }) as string;
      this._web3.eth.defaultAccount = this.account;
    }
    return Promise.resolve(this.account);
  }
  
  public async check_spv(): Promise<boolean> {
    let instance = this;
    await instance.getAccount().then(address => this.account = address);  
     return new Promise((resolve,reject) => {
      instance.loan_contract.spv_id_get.call(this.account,function(err,result) {
        if(err != null){
          reject(err);
        }
        else
        {
          if(result==0)
          {
            // alert("Not registered")
            resolve(false)
          }
          else{
            // alert("Already Registered")
            resolve(true)
          }
        }
      })
    }) as Promise<boolean>;
  } 

  public async check_investor(): Promise<boolean> {
    let instance = this;
    await instance.getAccount().then(acc => this.address = acc);  
     return new Promise((resolve,reject) => {
      instance.loan_contract.investor_id_get.call(this.address,function(err,result) {
        if(err != null){
          reject(err);
        }
        else
        {
          if(result==0)
          {
            // alert("Not registered")
            resolve(false)
          }
          else{
            // alert("Already Registered")
            resolve(true)
          }
        }
      })
    }) as Promise<boolean>;
  } 
  
  public async hash(a): Promise<boolean> {
    let meta = this;
    return new Promise((resolve, reject) => {
 
      var accountInterval = setInterval(function()
      {
        meta._web3.eth.getTransactionReceipt(a,function(err,result){
          if(err != null) {
          reject(err);
          }
 
          if(result !== null)
          {
            clearInterval(accountInterval);
            if(result.status == 0x1)
            {
              resolve(true);
            }
            else
            {           
              resolve(false);
            }
          }
        })
      },100)
    }) as Promise<boolean>;
  }

  public async contract_balance(): Promise<number> {
    let instance = this;
    return new Promise((resolve,reject) => {
      instance.loan_contract.contract_balance.call(function(err,result) {
        if(err != null){
          reject(err);
        }
        else{
          resolve(result/1000000000000000000)
        }
      })
    }) as Promise<number>;
  } 

  public async current_time(): Promise<string> {
    let instance = this;
    return new Promise((resolve,reject) => {
      instance.loan_contract.current_time.call(function(err,result) {
        if(err != null){
          reject(err);
        }
        else{
          resolve(result)
        }
      })
    }) as Promise<string>;
  } 

  public async pool_owned_by(pool_id): Promise<number> {
    let instance = this;
    return new Promise((resolve,reject) => {
      instance.loan_contract.pool_owned_by.call(pool_id,function(err,result) {
        if(err != null){
          reject(err);
        }
        else{
          resolve(result)
        }
      })
    }) as Promise<number>;
  } 

  public async check_issuer(): Promise<boolean> {
    let instance = this;
    await instance.getAccount().then(address => this.address = address);  
    return new Promise((resolve,reject) => {
      instance.loan_contract.issuer.call(function(err,result){
        if(err != null){
          reject(err);
        }
        else if(result == instance.address)
        {
          resolve(true)
        }
        else{
          resolve(false)
        }
      })
    }) as Promise<boolean>;
  } 

  public async bank_ids(): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.bank_ids.call(function(err,result) {
        if(err != null) {
          reject(err);
        }
        else{
          const arr:number[] = [];
          for(var i=1;i<=result.toNumber();i++){
          arr.push(i);
        }
        resolve(arr)
      }
       
      });
    }) as Promise<number[]>;
  }

  public async bank_detail_map(bank_id): Promise<string> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.bank_detail_map.call(bank_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<string>;
  }
  
  public async add_bank(bank_name,address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.add_bank.sendTransaction(bank_name,{from:address,gas:600000},function(err,result) {
        
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else
       {
         instance.hash(result).then(res =>{
            if(res == true)
            {
              resolve(1)
            }
            else if(res == false){
              resolve(2)
            }
         })
       }
      });
    }) as Promise<number>;
  }
  
  public async borrower_ids(): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.borrower_ids.call(function(err,result) {
        if(err != null) {
          reject(err);
        }
        else{
          const arr:number[] = [];
          for(var i=1;i<=result.toNumber();i++){
          arr.push(i);
        }
        resolve(arr)
       
        }
      });
    }) as Promise<number[]>;
  }

  public async borrower_map(borrower_id): Promise<string> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.borrower_map.call(borrower_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<string>;
  }

  public async add_borrower(bank_id,borrower_name,address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.add_borrower.sendTransaction(bank_id,borrower_name,{from:address,gas: 600000},function(err,result) {
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else {
          instance.hash(result).then(res =>{
              if(res == true)
              {
                resolve(1)
              }
              else if(res == false){
                resolve(2)
              }
          })
        }
      });
    }) as Promise<number>;
  }

  public async show_borrower(bank_id): Promise<object> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.show_borrower.call(bank_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<object>;
  }

  public async loan_ids(): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.loan_ids.call(function(err,result) {
        if(err != null) {
          reject(err);
        }
        else{
          const arr:number[] = [];
        for(var i=1;i<=result.toNumber();i++){
            arr.push(i);
        }
        // console.log(result.toNumber());
        
        resolve(arr);
          
        }
      });
    }) as Promise<number[]>;
  }

  public async borrower_details_map(loan_id): Promise<object> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.borrower_details_map.call(loan_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<object>;
  }

  public async asset_ids(): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.asset_ids.call(function(err,result) {
        if(err != null) {
          reject(err);
        }
        else{
          const arr:number[] = [];
          for(var i=1;i<=result.toNumber();i++){
          arr.push(i);
        }
        resolve(arr)
       
        }
      });
    }) as Promise<number[]>;
  }
  
  public async add_loan(borrower_id,loan_amount,interest_rate,loan_duration,asset_details,asset_amount,borrower_paid,address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.add_loan.sendTransaction(borrower_id,loan_amount,interest_rate,loan_duration, asset_details,asset_amount, borrower_paid,{from:address,gas: 600000},function(err,result) {
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else {
          instance.hash(result).then(res =>{
              if(res == true)
              {
                resolve(1)
              }
              else if(res == false){
                resolve(2)
              }
          })
        }
      });
    }) as Promise<number>;
  }
  
  public async update_loan(loanid,amount,option,owned_spv_id,owned_inv_id,address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.update_loan.sendTransaction(loanid,amount,option,owned_spv_id,owned_inv_id,{from:address,gas: 600000},function(err,result) {
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else {
          instance.hash(result).then(res =>{
              if(res == true)
              {
                resolve(1)
              }
              else if(res == false){
                resolve(2)
              }
          })
        }
      });
    }) as Promise<number>;
  }
  
  public async pool_ids(): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.pool_ids.call(function(err,result) {
        if(err != null) {
          reject(err);
        }
        else{
          const arr:number[] = [];
        for(var i=1;i<=result.toNumber();i++){
            arr.push(i);
        }
        resolve(arr);
          
        }
      });
    }) as Promise<number[]>;
  }

  public async pool_details(pool_id): Promise<object> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.pool_details.call(pool_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<object>;
  }
  
  public async show_loanids_of_pool(pool_id): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.show_loanids_of_pool.call(pool_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<number[]>;
  }
  
  public async create_pool(loan_ids,value,address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.create_pool.sendTransaction(loan_ids,value,{from:address,gas: 600000},function(err,result) {
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else {
          instance.hash(result).then(res =>{
              if(res == true)
              {
                resolve(1)
              }
              else if(res == false){
                resolve(2)
              }
          })
        }
      });
    }) as Promise<number>;
  }

  public async spv_ids(): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.spv_ids.call(function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        { 
          const arr:number[] = [];
          for(var i=1;i<=result.toNumber();i++){
          arr.push(i);
        }
        resolve(arr)
      }
       
      });
    }) as Promise<number[]>;
  }

  public async spv_details(spv_id): Promise<object> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.spv_details.call(spv_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<object>;
  }
  
  public async spv_id_get(address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.spv_id_get.call(address,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<number>;
  }

  public async register_spv(address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.register_spv.sendTransaction({from:address,gas: 600000},function(err,result) {
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else {
          instance.hash(result).then(res =>{
              if(res == true)
              {
                resolve(1)
              }
              else if(res == false){
                resolve(2)
              }
          })
        }
      });
    }) as Promise<number>;
  }

  public async is_owned_spv(spv_id,pool_id): Promise<boolean> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.is_owned_spv.call(spv_id,pool_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<boolean>;
  }
  
  public async spv_id_by_pool_id(pool_id): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.spv_id_by_pool_id.call(pool_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<number>;
  }

  public async spv_buy_pool(pool_id,amount,address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.spv_buy_pool.sendTransaction(pool_id,{from:address,value:amount,gas: 600000},function(err,result) {
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else {
          instance.hash(result).then(res =>{
              if(res == true)
              {
                resolve(1)
              }
              else if(res == false){
                resolve(2)
              }
          })
        }
      });
    }) as Promise<number>;
  }

  public async investor_ids(): Promise<number[]> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.investor_ids.call(function(err,result) {
        if(err != null) {
          reject(err);
        }
        else{
          const arr:number[] = [];
          for(var i=1;i<=result.toNumber();i++){
          arr.push(i);
        }
        resolve(arr)
      }      
      });
    }) as Promise<number[]>;
  }

  public async investor_details(investor_id): Promise<object> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.investor_details.call(investor_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<object>;
  }
  
  public async investor_id_get(address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.investor_id_get.call(address,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<number>;
  }

  public async is_owned_investor(inv_id,pool_id): Promise<boolean> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.is_owned_investor.call(inv_id,pool_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<boolean>;
  }
  
  public async register_investor(address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.register_investor.sendTransaction({from:address,gas: 600000},function(err,result) {
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else {
          instance.hash(result).then(res =>{
            if(res == true)
            {
              resolve(1)
            }
            else if(res == false){
              resolve(2)
            }
          })
        }
      });
    }) as Promise<number>;
  }

  public async investor_purchase(pool_id,address,amount): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.investor_purchase.sendTransaction(pool_id,{from:address,value:amount,gas: 600000},function(err,result) {
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else {
          instance.hash(result).then(res =>{
              if(res == true)
              {
                resolve(1)
              }
              else if(res == false){
                resolve(2)
              }
          })
        }
      });
    }) as Promise<number>;
  }

  public async issuer_withdraw(how_much_amount,address): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.issuer_withdraw.sendTransaction(how_much_amount,{from:address,gas: 600000},function(err,result) {
        if(err != null) {
          // instance.spinner.hide()
          resolve(0);
        }
        else {
          instance.hash(result).then(res =>{
              if(res == true)
              {
                resolve(1)
              }
              else if(res == false){
                resolve(2)
              }
          })
        }
      });
    }) as Promise<number>;
  }
  
  public async inv_id_by_pool_id(pool_id): Promise<number> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.inv_id_by_pool_id.call(pool_id,pool_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<number>;
  }

  public async  loan_status(loan_id): Promise<object> {                                       
    let instance = this;
    return new Promise((resolve, reject) => {
      instance.loan_contract.loan_status.call(loan_id,function(err,result) {
        if(err != null) {
          reject(err);
        }
        else
        {
          resolve(result)
        }
      });
    }) as Promise<object>;
  }
  
}
