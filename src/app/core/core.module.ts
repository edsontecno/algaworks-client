import { CategoriaService } from './../categorias/categoria.service';
import { PessoasPesquisaComponent } from './../pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasService } from './../pessoas/pessoas.service';
import { LancamentosPesquisaComponent } from './../lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoService } from './../lancamentos/lancamento.service';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { ToastyModule } from 'ng2-toasty';

import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

// Adicione o registerLocaleData e o localePt
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  declarations: [
      NavbarComponent
  ],
  exports: [
      NavbarComponent,
      ToastyModule,
      ConfirmDialogModule
  ],
  providers: [LancamentoService,
    LancamentosPesquisaComponent,
    PessoasService,
    PessoasPesquisaComponent,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ConfirmationService,
    ErrorHandlerService,
    CategoriaService
  ]
})
export class CoreModule { }
