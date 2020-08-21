import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../service/despesa.service';
import { Despesa } from '../model/despesa.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ExcelService } from '../service/excel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DespesaService]
})
export class DashboardComponent implements OnInit {

  constructor(public despesaService: DespesaService, private excelService:ExcelService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshDespesa();
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

  onSubmit(form: NgForm) {
        this.despesaService.updateDespesa(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshDespesa();
        Swal.fire('Sucesso!', 'Despesa atualizada com sucesso!', 'success');
      });
  }

  refreshDespesa() {
    this.despesaService.getDespesas().subscribe((res) => {
      this.despesaService.despesas = res as Despesa[];
    });
  }

  onEdit(despesa: Despesa) {
    this.despesaService.selectDespesa = despesa;
  }

  onDelete(_id: string, form: NgForm) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar a Despesa: ' + _id + '?',
      text: "Após confirmar, a ação não poderá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!'
    }).then((result) => {
      if (result.value) {
        this.despesaService.deleteDespesa(_id).subscribe((res) => {
          this.refreshDespesa();
          this.resetForm(form);
          Swal.fire('Sucesso!', 'Despesa deletada com sucesso!', 'success');
        });
      }
    })
  }

//   exportAsXLSX():void {
//     this.excelService.exportAsExcelFile(, 'sample');
//  }
}
