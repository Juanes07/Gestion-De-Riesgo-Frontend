import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-form-crear-riesgo',
  templateUrl: './form-crear-riesgo.component.html',
  styleUrls: ['./form-crear-riesgo.component.css']
})
export class FormCrearRiesgoComponent implements OnInit {



  constructor(){

  }


  ngOnInit(): void {
  }

}
