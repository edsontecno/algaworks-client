import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos/lancamentos-cadastro/lancamentos-cadastro.component';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { CoreModule } from './core/core.module';
import { HttpModule } from '@angular/http';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent},
  { path: 'lancamentos/novo', component: LancamentosCadastroComponent},
  { path: 'lancamentos/:codigo', component: LancamentosCadastroComponent},
  { path: 'pessoas', component: PessoasPesquisaComponent},
  { path: 'pessoas/nova', component: PessoasCadastroComponent},
  { path: 'pessoas/:codigo', component: PessoasCadastroComponent}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
