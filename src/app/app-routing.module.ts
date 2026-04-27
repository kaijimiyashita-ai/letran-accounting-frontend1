import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecordListComponent } from './components/record-list/record-list.component';
import { RecordFormComponent } from './components/record-form/record-form.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'records', component: RecordListComponent },
      { path: 'records/new', component: RecordFormComponent },
      { path: 'records/edit/:id', component: RecordFormComponent },
      { path: 'payments', component: PaymentComponent },
      { path: 'ledger/:id', component: LedgerComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }