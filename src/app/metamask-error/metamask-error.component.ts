import { Component, OnInit, OnDestroy } from '@angular/core';
// import { LoanServiceService } from '../Service/loan-service.service';
import { Router } from '@angular/router';
  declare let window: any;
  import * as Web3 from 'web3';

@Component({
  selector: 'app-metamask-error',
  templateUrl: './metamask-error.component.html',
  styleUrls: ['./metamask-error.component.scss']
})
export class MetamaskErrorComponent implements OnInit, OnDestroy {

  public  _web3: any;
  public id1: any;
  // private wcs: LoanServiceService, 
  constructor(private router: Router) {  }

  ngOnInit() {
    let meta = this;
    this.id1 = setInterval(function() {
      if (typeof window.web3 !== 'undefined') {
        meta._web3 = new Web3(window.web3.currentProvider);
        if (meta._web3.eth.accounts[0] !== undefined) {
          meta.router.navigate(['WelcomeComponent']);
        }
      }
    }, 200);
  }

  ngOnDestroy() {
    if (this.id1) {
      clearInterval(this.id1);
    }
  }
}
