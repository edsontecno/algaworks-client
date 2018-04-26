import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { PessoasService } from './../../pessoas/pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {
    tipos = [
        { label: 'Receita', value: 'RECEITA' },
        { label: 'Despesa', value: 'DESPESA' },
    ];

    categorias = [];
    pessoas = [];
    lancamento = new Lancamento();


  constructor( private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoasService,
    private toasty: ToastyService,
    private lancamentoService: LancamentoService,
    private route: ActivatedRoute,
    private rotiador: Router
    ) { }

  ngOnInit() {
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.carregarLancamento(codigo);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        this.rotiador.navigate(['/lancamentos', lancamentoAdicionado.codigo]);

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;

      this.toasty.success('Lançamento alterado com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.lancamento.codigo != null) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.rotiador.navigate(['/lancamentos/novo']);
  }

}
