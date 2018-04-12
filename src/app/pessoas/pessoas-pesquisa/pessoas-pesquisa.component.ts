import { PessoaFiltro, PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

    pessoas = [];
    filtro = new PessoaFiltro();
    totalRegistro = 0;

    constructor(private service: PessoasService) {}

    pesquisar(pagina = 0) {

        this.filtro.pagina = pagina;

        this.service.pesquisar(this.filtro)
        .then(result => {
            this.pessoas = result.pessoas;
            this.totalRegistro = result.total;
        });
    }

}
