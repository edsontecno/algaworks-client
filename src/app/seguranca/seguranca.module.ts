import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';
import { Http, RequestOptions } from '@angular/http';
import { AppRoutingModule } from './../app-routing.module';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';


export function authHttpServiceFactory(http: Http, options: RequestOptions, auth: AuthService) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });

  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    AppRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, AuthService]
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
