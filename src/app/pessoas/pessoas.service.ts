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

    constructor(private http: Http) { }

    pesquisar(filtro: PessoaFiltro): Promise<any> {

        const params = new URLSearchParams();
        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());


        if (filtro.nome) {
            params.set('nome', filtro.nome);
        }

        return this.http.get(`${this.serviceUrl}`, { headers, search: params  } )
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
        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        return this.http.get(this.serviceUrl, { headers })
          .toPromise()
          .then(response => response.json().content);
      }

}
