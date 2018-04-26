import { ActivatedRoute } from '@angular/router';
import { Pessoa } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyConfig, ToastyService } from 'ng2-toasty';
import { PessoasService } from './../pessoas.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoasService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.carregarPessoa(codigo);
    }
  }

  adicionar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
        this.toasty.success('Pessoa adicionada com sucesso!');

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
      this.pessoa = pessoa;

      this.toasty.success('Pessoa alterada com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.pessoa.codigo != null) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
