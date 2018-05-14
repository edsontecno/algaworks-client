import { AuthHttp } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {

    categoriasUrl = 'http://localhost:8080/sistema/categoria';

    constructor(private http: AuthHttp) { }

    listarTodas(): Promise<any> {

      return this.http.get(this.categoriasUrl)
        .toPromise()
        .then(response => response.json());
    }


}
