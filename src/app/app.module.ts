import { PessoasService } from './pessoas/pessoas.service';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoService } from './lancamentos/lancamento.service';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { CoreModule } from './core/core.module';
import { HttpModule } from '@angular/http';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

// Adicione o registerLocaleData e o localePt
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

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
    ConfirmDialogModule
  ],
  providers: [LancamentoService,
    LancamentosPesquisaComponent,
    PessoasService,
    PessoasPesquisaComponent,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
