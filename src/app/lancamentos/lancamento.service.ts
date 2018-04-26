import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class LancamentoFiltro {
    descricao: string;
    dataVencimentoDe: Date;
    dataVencimentoAte: Date;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

    lancamentoUrl = 'http://localhost:8080/sistema/lancamento';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());


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
    .then(response =>  {
        const responseJson = response.json();
        const lancamentos = responseJson.content;
        const resultado = {
            lancamentos: lancamentos,
            total: responseJson.totalElements
        };

        return resultado;
    } )
    ;
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentoUrl}/${codigo}`, { headers })
        .toPromise()
        .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.lancamentoUrl,
        JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentoUrl}/${lancamento.codigo}`,
        JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentoUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}
