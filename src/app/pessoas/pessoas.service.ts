import { AuthHttp } from 'angular2-jwt';
import { Pessoa } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
    nome: string;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable()
export class PessoasService {

    serviceUrl = 'http://localhost:8080/sistema/pessoa';

    constructor(private http: AuthHttp) { }

    pesquisar(filtro: PessoaFiltro): Promise<any> {

        const params = new URLSearchParams();

        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());


        if (filtro.nome) {
            params.set('nome', filtro.nome);
        }

        return this.http.get(`${this.serviceUrl}`, { search: params  } )
        .toPromise()
        .then(response =>  {
            const resultado = {
                pessoas: response.json().content,

                total: response.json().totalElements
            };
            return resultado;
        } )
        ;
      }

      listarTodas(): Promise<any> {

        return this.http.get(this.serviceUrl)
          .toPromise()
          .then(response => response.json().content);
      }

      excluir(codigo: number): Promise<void> {

        return this.http.delete(`${this.serviceUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
      }

      mudarStatus(codigo: number, ativo: boolean): Promise<void> {

        return this.http.put(`${this.serviceUrl}/${codigo}/ativo`, ativo)
          .toPromise()
          .then(() => null);
      }

      adicionar(pessoa: Pessoa): Promise<Pessoa> {

        return this.http.post(this.serviceUrl, JSON.stringify(pessoa))
          .toPromise()
          .then(response => response.json());
      }

      atualizar(pessoa: Pessoa): Promise<Pessoa> {

        return this.http.put(`${this.serviceUrl}/${pessoa.codigo}`,
            JSON.stringify(pessoa))
          .toPromise()
          .then(response => {
            const alterado = response.json() as Pessoa;

            return alterado;
          });
      }

      buscarPorCodigo(codigo: number): Promise<Pessoa> {

        return this.http.get(`${this.serviceUrl}/${codigo}`)
          .toPromise()
          .then(response => {
            const pessoa = response.json() as Pessoa;

            return pessoa;
          });
      }

}
