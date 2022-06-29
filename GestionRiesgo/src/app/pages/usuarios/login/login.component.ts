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

/**
 * Componente que muestra el formulario de login de un usuario en el sistema
 */
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
    this.loginService.login(this.form.value.email, this.form.value.password)
    .then((res) => {
      if (res === null) {
        this.showError('Error al Iniciar Sesión');
        setTimeout(() => {
          localStorage.clear();
        },1000);
      }else{
        this.showSuccess('Bienvenido ');
        setTimeout(() => {
          this.router.navigate(['/proyectos/lista']);
        }, 2000);
        setTimeout(() => {
          window.location.reload()
          }, 2000);
      }
    }
    )
    .catch(() => {
      this.showError('Error al Iniciar Sesión');
    }
    );
    this.mostrar = !this.mostrar;
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onSubmitWithGoogle(): void {
    this.mostrar = !this.mostrar;
    this.loginService.loginWithGoogle()
    .then((res) => {
      if (res === undefined) {
        this.showError('Error al Iniciar Sesión');
        setTimeout(() => {
          localStorage.clear();
        },6000);
      }else{
        this.showSuccess('Bienvenido ');
        setTimeout(() => {
          this.router.navigate(['/proyectos/lista']);
        }, 2000);
        setTimeout(() => {
          window.location.reload()
          }, 3000);
      }
    }
    )
    .catch(() => {
      this.showError('Error al Iniciar Sesión');
    }
    );
    this.mostrar = !this.mostrar;
  }

  resetPassword(): void {
    this.mostrar2 = !this.mostrar2;
    try{
      this.loginService.resetPassword(this.form2.value.email);
      this.showSuccess('Se ha enviado un correo para restablecer la contraseña');
    }catch(e){
      this.showError('Error al restablecer la contraseña');
    }
    this.mostrar2 = !this.mostrar2;
  }


  showSuccess(message: any): void { this.messageService.add({key: 'success', severity: 'success', summary: 'Éxito', detail: message}); }
  showError(message: any): void { this.messageService.add({key: 'error', severity: 'error', summary: 'Error', detail: message}); }
}
