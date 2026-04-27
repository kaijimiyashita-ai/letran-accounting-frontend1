import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecordListComponent } from './components/record-list/record-list.component';
import { RecordFormComponent } from './components/record-form/record-form.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Interceptor (defined in services/api.service.ts)
import { AuthInterceptor } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RecordListComponent,
    RecordFormComponent,
    PaymentComponent,
    LedgerComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,       // <-- this provides <router-outlet> and routing
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }   // <-- crucial: must be exported!