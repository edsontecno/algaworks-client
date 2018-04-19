import { LancamentosPesquisaComponent } from './../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { ToastyService } from 'ng2-toasty';

import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {


    constructor(private pesquisaComponent: LancamentosPesquisaComponent,
        private service: LancamentoService,
        private toasty: ToastyService,
        private confirmation: ConfirmationService) {


    }

    @Input()
    lancamentos = [];
    @Input()
    filtro: LancamentoFiltro;
    @Input()
    totalRegistro;

    @ViewChild('tabela')
    tabela;

    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event.first / event.rows;
        console.log(event);
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
            this.toasty.success('Lançamento excluído com sucesso!');

        });
    }
}
