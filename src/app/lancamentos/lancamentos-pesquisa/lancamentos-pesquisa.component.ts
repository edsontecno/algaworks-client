import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit  {

    lancamentos = [ ];
    descricao: string;
    dataVencimentoDe: Date;
    dataVencimentoAte: Date;

    constructor(private service: LancamentoService) {

    }

    ngOnInit() {
        this.pesquisar();
    }

    pesquisar() {

        const filtro: LancamentoFiltro = {
            descricao: this.descricao,
            dataVencimentoAte: this.dataVencimentoAte,
            dataVencimentoDe: this.dataVencimentoDe
        };

        this.service.pesquisar(filtro)
        .then(result => {
            this.lancamentos = result;
        });
    }

}
