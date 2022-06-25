import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-form-crear-proyecto',
  templateUrl: './form-crear-proyecto.component.html',
  styleUrls: ['./form-crear-proyecto.component.css']
})
export class FormCrearProyectoComponent implements OnInit {

  date1!: Date;



  constructor(

  ){}


  ngOnInit() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
  }
}
