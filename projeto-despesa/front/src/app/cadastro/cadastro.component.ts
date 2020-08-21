import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DespesaService } from '../service/despesa.service';
import swal from 'sweetalert2';
import { Despesa } from '../model/despesa.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [DespesaService]
})
export class CadastroComponent {

  constructor(public despesaService: DespesaService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    debugger;
    this.despesaService.addDespesa(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshDespesas();
      swal.fire('Sucesso!', 'Despesa cadastrada com sucesso!', 'success');
    });
  }

  refreshDespesas() {
    this.despesaService.getDespesas().subscribe((res) => {
      this.despesaService.despesas = res as Despesa[];
    });
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.despesaService.selectDespesa = {
      _id: "",
      descricao: "",
      valor: null,
      vencimento: "",
      observacao: "",
      mes: "",
      ano: "",
      status: ""
    }
  }
}
