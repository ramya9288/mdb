import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoanServiceService } from '../Service/loan-service.service';


@Injectable({
  providedIn: 'root'
})
export class SpvGuard implements CanActivate {
  constructor(private ls:LoanServiceService,private route:Router) {  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.ls.check_spv().then(spv => {
      if (spv == true)
      {
        return true;
      }
      else
      {
        this.route.navigate(["addspv"]);
        return false;
      }
    })
}
}

