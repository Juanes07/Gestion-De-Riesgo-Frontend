import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {LoginService} from '../../../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ MessageService]
})
export class LoginComponent implements OnInit {

  public mostrar2: Boolean = false;
  public mostrar: Boolean = false;
  public displayModal: boolean = false;
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  public form2: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  public errorMessage = '';
  public title = '';


  constructor(
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.title = "Ingreso Gestion De Riesgos";
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit(): void {
    this.mostrar = !this.mostrar;
    this.postLogIn();
  }

  postLogIn(): void {
    this.loginService.login(this.form.value.email, this.form.value.password);
    this.loginService.getUser().subscribe(
      (user: { displayName: string; }) => {
        if (user) {
          this.showSuccess('Bienvenido ' + user.displayName);
          this.router.navigate(['/proyectos']);
        } else {
          this.showError('Usuario o contraseña incorrectos');
        }
      }
    );
    this.mostrar = !this.mostrar;
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onSubmitWithGoogle(): void {
    this.mostrar = !this.mostrar;
    this.loginService.loginWithGoogle();
    this.loginService.getUser().subscribe(
      (user: { displayName: string; }) => {
        if (user) {
          this.showSuccess('Bienvenido ' + user.displayName);
          this.router.navigate(['/proyectos']);
        } else {
          this.showError('Problema al Iniciar Sesión');
        }
      }
    );
    this.mostrar = !this.mostrar;
  }

  resetPassword(): void {
    this.mostrar2 = !this.mostrar2;
    this.loginService.resetPassword(this.form2.value.email);
    this.showSuccess('Se ha enviado un correo para restablecer la contraseña');
    this.mostrar2 = !this.mostrar2;
  }


  showSuccess(message: any): void { this.messageService.add({key: 'success', severity: 'success', summary: 'Éxito', detail: message}); }
  showError(message: any): void { this.messageService.add({key: 'error', severity: 'error', summary: 'Error', detail: message}); }
}
