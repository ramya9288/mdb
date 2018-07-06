import { Routes} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AddbankComponent } from '../addbank/addbank.component';
import { AddborrowerComponent } from '../addborrower/addborrower.component';
import { AddloanComponent } from '../addloan/addloan.component';
import { CreatepackComponent } from '../createpack/createpack.component';
import { UpdateloanComponent } from '../updateloan/updateloan.component';
import { WithdrawComponent } from '../withdraw/withdraw.component'; 
import { SpvComponent } from '../spv/spv.component';
import { InvestorComponent } from '../investor/investor.component';
import { AddinvestorComponent } from '../addinvestor/addinvestor.component';
import { AddspvComponent } from '../addspv/addspv.component';
import { IssuerGuard } from '../guard/issuer.guard';
import { SpvGuard } from '../guard/spv.guard';
import { InvestorGuard } from '../guard/investor.guard';
import { MetamaskErrorComponent } from "../metamask-error/metamask-error.component";


export  const  routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
   { 
        path: 'addbank',
        component:AddbankComponent,
        canActivate : [IssuerGuard]
      },
      { 
        path: 'addloan',
        component:AddloanComponent,
        canActivate : [IssuerGuard]
      },
      { 
        path: 'addborrower',
        component:AddborrowerComponent,
        canActivate : [IssuerGuard]
      },
      { 
        path: 'createpack',
        component:CreatepackComponent,
        canActivate : [IssuerGuard]
      },
      { 
        path: 'updateloan',
        component:UpdateloanComponent,
        canActivate : [IssuerGuard]
      },
      { 
        path: 'withdraw',
        component:WithdrawComponent,
        canActivate : [IssuerGuard]
      },
      {
        path: 'spv',
        component: SpvComponent,
        canActivate : [SpvGuard]
      },
      {
        path: 'investor',
        component:InvestorComponent,
        canActivate : [InvestorGuard]
      },
      {
        path: 'addspv',
        component: AddspvComponent
      },
      {
        path: 'addinvestor',
        component: AddinvestorComponent
      },
      { 
        path: 'metamask',
        component: MetamaskErrorComponent,
    
      },
   
    { 
        path: '',
        redirectTo: '/addbank',
        pathMatch: 'full'
      }
];