import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pessoa } from 'src/app/Pessoa';
import { PessoaService } from './../../pessoa.service';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  formulario: any;
  tituloFormulario?: string;
  pessoas?: Pessoa[];
  nomePessoa?: any;
  pessoaId?: number;


  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef: any;

  constructor(private pessoasService: PessoaService) { }

  ngOnInit(): void {

    this.pessoasService.PegarTodos().subscribe(resultado => {
      this.pessoas = resultado;
    });

  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });
  }


  ExibirFormularioAtulizado(pessoaId: number): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.pessoasService.PegarPeloId(pessoaId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao),
      });
    });
  }

  EnviarFormulario(): void {
    const pessoa: Pessoa = this.formulario.value;

    if (pessoa.pessoaId > 0) {
      this.pessoasService.AtualizarPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeFormulario = false
        this.visibilidadeTabela = true;
        alert('Pessoa Atualizada com sucesso!!!');
        this.pessoasService.PegarTodos().subscribe((registro) => {
          this.pessoas = registro;
        });
      })

    } else {
      this.pessoasService.SalvarPessoa(pessoa).subscribe((resultado) => {
        this.visibilidadeFormulario = false
        this.visibilidadeTabela = true;
        alert('Pessoa Inserida!!! com sucesso!!!');
        this.pessoasService.PegarTodos().subscribe((registro) => {
          this.pessoas = registro;
        });
      })
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

}


