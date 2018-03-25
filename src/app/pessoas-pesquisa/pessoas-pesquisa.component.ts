import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

    pessoas = [
        { nome: 'Manoel', cidade: 'Uberlândia', estado: 'MG', status: true},
        { nome: 'Sebastian', cidade: 'São Paulo', estado: 'SP', status: false},
        { nome: 'Carla', cidade: 'Florianópolis', estado: 'SC', status: true},
        { nome: 'Luíz', cidade: 'Curitiba', estado: 'PR', status: true},
        { nome: 'Vilmar', cidade: 'Rio de Janeiro', estado: 'RJ', status: false},
        { nome: 'Manoel', cidade: 'Uberlândia', estado: 'MG', status: true},
        { nome: 'Sebastian', cidade: 'São Paulo', estado: 'SP', status: false},
        { nome: 'Carla', cidade: 'Florianópolis', estado: 'SC', status: true},
        { nome: 'Luíz', cidade: 'Curitiba', estado: 'PR', status: true},
        { nome: 'Vilmar', cidade: 'Rio de Janeiro', estado: 'RJ', status: false}

      ];

}
