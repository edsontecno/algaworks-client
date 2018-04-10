import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export interface LancamentoFiltro {
    descricao: string;
    dataVencimentoDe: Date;
    dataVencimentoAte: Date;
}

@Injectable()
export class LancamentoService {

    lancamentoUrl = 'http://localhost:8080/sistema/lancamento';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.descricao) {
        params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
        params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
        console.log(moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
        params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }


    return this.http.get(`${this.lancamentoUrl}?resumo`, { headers, search: params  } )
    .toPromise()
    .then(response =>  response.json().content )
    ;
  }

}
