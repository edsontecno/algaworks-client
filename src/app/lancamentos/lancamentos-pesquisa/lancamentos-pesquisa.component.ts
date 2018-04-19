import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit  {

    lancamentos = [ ];
    filtro = new LancamentoFiltro();
    totalRegistro = 0;

    constructor(private service: LancamentoService, private errorHandle: ErrorHandlerService) {

    }

    ngOnInit() {

    }

    pesquisar(pagina = 0) {

        this.filtro.pagina = pagina;

        this.service.pesquisar(this.filtro)
        .then(result => {
            this.lancamentos = result.lancamentos;
            this.totalRegistro = result.total;
        })
        .catch(error => this.errorHandle.handle(error));
    }

}
