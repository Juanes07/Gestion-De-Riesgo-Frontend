import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService} from 'primeng/api';
import {LoginService} from '../../../service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ MessageService]
})

/**
 * Componente que muestra el formulario de registro de un usuario en el sistema
 */
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: LoginService,
    private route: Router
  ) { }

  public form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rating: ['', []],
  });

  ngOnInit(): void {
  }

  register(): void {
    this.authService.register(this.form.value.name,this.form.value.email, this.form.value.password)
    .then(() => {
      this.showSuccess('Usuario creado correctamente');
      setTimeout(() => {
        this.route.navigate(['/login']);
      }, 2000);
    })
    .catch(() => {
      this.showError('Error al crear usuario');
    }
    );
  }

  registerWithGoogle(): void {
    this.authService.registerUserWithGoogle()
    .then(() => {
      this.showSuccess('Usuario creado correctamente');
      setTimeout(() => {
        this.route.navigate(['/login']);
      }, 2000);
    }
    )
    .catch(() => {
      this.showError('Error al crear usuario');
    }
    );
  }

  showSuccess(message: any): void { this.messageService.add({key: 'success', severity: 'success', summary: 'Éxito', detail: message}); }
  showError(message: any): void { this.messageService.add({key: 'error', severity: 'error', summary: 'Error', detail: message}); }
}
