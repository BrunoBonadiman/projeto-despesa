import { Component, OnInit } from '@angular/core';
import { Salario } from '../model/salario.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ExcelService } from '../service/excel.service';
import { SalarioService } from '../service/salario.service';

@Component({
  selector: 'app-cadastro-salario',
  templateUrl: './cadastro-salario.component.html',
  styleUrls: ['./cadastro-salario.component.css'],
  providers: [SalarioService]
})
export class CadastroSalarioComponent implements OnInit {

  constructor(public salarioService: SalarioService, private excelService: ExcelService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshSalario();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.salarioService.selectSalario = {
      _id: "",
      valor: null,
      mes: "",
      ano: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.salarioService.addSalario(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshSalario();
        Swal.fire('Sucesso!', 'Salário cadastrado com sucesso!', 'success');
      });
    }
    else {
      this.salarioService.updateSalario(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshSalario();
        Swal.fire('Sucesso!', 'Salário atualizado com sucesso!', 'success');
      });
    }
  }

  refreshSalario() {
    this.salarioService.getSalario().subscribe((res) => {
      this.salarioService.salario = res as Salario[];
    });
  }

  onEdit(salario: Salario) {
    this.salarioService.selectSalario = salario;
  }

  onDelete(_id: string, form: NgForm) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar o registro: ' + _id + '?',
      text: "Após confirmar, a ação não poderá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!'
    }).then((result) => {
      if (result.value) {
        this.salarioService.deleteSalario(_id).subscribe((res) => {
          this.refreshSalario();
          this.resetForm(form);
          Swal.fire('Sucesso!', 'Salário deletado com sucesso!', 'success');
        });
      }
    })
  }

  //   exportAsXLSX():void {
  //     this.excelService.exportAsExcelFile(, 'sample');
  //  }
}
