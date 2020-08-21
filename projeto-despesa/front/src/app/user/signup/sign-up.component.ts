import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignupComponent {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      (res) => {
        swal.fire('Sucesso!', 'Usuário cadastrado com sucesso!', 'success');
        setTimeout(() => (this.showSucessMessage = false), 4000);
        this.resetForm(form);
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else
        swal.fire('Ops!', 'Ocorreu um problema. Entre em contato com o administrador.', 'error');
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      nome: '',
      sobrenome: '',
      email: '',
      password: '',
      tipoConta: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
