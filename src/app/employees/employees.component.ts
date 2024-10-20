import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { Employee } from '../model/employee';
import { Timestamp } from '@angular/fire/firestore';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent implements OnInit {
  protected employeeService: EmployeeService = inject(EmployeeService);
  employees: Employee[]= [];

  ngOnInit(): void {
      this.employeeService.getEmployees().subscribe(data => {
        this.employees = data.map(e => {
          return {
          id: e.id,
          ...e,
          dateOfBirth: (e.dateOfBirth as unknown as Timestamp).toDate(),
        }})
        console.log(this.employees)
      });
  }

}
