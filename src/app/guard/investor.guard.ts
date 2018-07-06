import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanServiceService } from '../Service/loan-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class InvestorGuard implements CanActivate {
  public address:string;
  constructor(private ls:LoanServiceService,private route:Router) {
    ls.getAccount().then(acc =>this.address =acc)
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.ls.check_investor().then(issuer =>  {
      if (issuer == true)
      {
        return true;
      }
      else
      {
        this.route.navigate(["addinvestor"]);
        return false;
      }
    })
  }
}
