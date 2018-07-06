import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanServiceService } from '../Service/loan-service.service';

@Injectable({
  providedIn: 'root'
})
export class IssuerGuard implements CanActivate {
  public address:string;
  constructor(private ls:LoanServiceService,private route:Router) {
    ls.getAccount().then(acc =>this.address =acc)

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.ls.check_issuer().then(issuer =>  {
        if (issuer == true)
        {
          return true;
        }
        else
        {
          this.route.navigate(["WelcomeComponent"]);
          return false;
        }
      })
  }
  }
