import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { PessoasService } from './../pessoas.service';
import { PessoasPesquisaComponent } from './../pessoas-pesquisa/pessoas-pesquisa.component';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PessoaFiltro } from '../pessoas.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

    @Input()
    pessoas = [];
    @Input()
    filtro: PessoaFiltro;
    @Input()
    totalRegistro;

    @ViewChild('tabela')
    tabela;

    constructor(private pesquisaComponent: PessoasPesquisaComponent,
        private service: PessoasService,
        private toasty: ToastyService,
        private errorHandle: ErrorHandlerService,
        private confirmation: ConfirmationService) {}

    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event.first / event.rows;
        this.pesquisaComponent.pesquisar(pagina);
    }

    confirmarExclusao(lancamento: any) {
        this.confirmation.confirm({
            message: 'Deseja excluir o registro?',
            accept: () => {
                this.excluir(lancamento);
            }
        });
    }

    excluir(lancamento: any) {

        this.service.excluir(lancamento.codigo)
        .then(() => {

            if (this.tabela.first === 0) {
                this.pesquisaComponent.pesquisar();
            } else {
                this.tabela.first = 0;
            }
            this.toasty.success('Registro excluído com sucesso!');

        })
        .catch(error => this.errorHandle.handle(error));
    }

    alternarStatus(pessoa: any): void {
        const novoStatus = !pessoa.status;

        this.service.mudarStatus(pessoa.codigo, novoStatus)
          .then(() => {
            const acao = novoStatus ? 'ativada' : 'desativada';

            pessoa.status = novoStatus;
            this.toasty.success(`Pessoa ${acao} com sucesso!`);
          })
          .catch(erro => this.errorHandle.handle(erro));
      }

}
