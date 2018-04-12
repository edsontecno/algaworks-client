import { LancamentosPesquisaComponent } from './../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

    constructor(private pesquisaComponent: LancamentosPesquisaComponent, private service: LancamentoService) {

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

    excluir(lancamento: any) {

        this.service.excluir(lancamento.codigo)
        .then(() => {
            console.log('excluido');
            this.tabela.first = 0;
        });
    }
}
