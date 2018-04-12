import { PessoasPesquisaComponent } from './../pessoas-pesquisa/pessoas-pesquisa.component';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Component, OnInit, Input } from '@angular/core';
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

    constructor(private pesquisaComponent: PessoasPesquisaComponent) {}

    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event.first / event.rows;
        this.pesquisaComponent.pesquisar(pagina);
    }

}
