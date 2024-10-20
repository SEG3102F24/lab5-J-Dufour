import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Employee } from "../model/employee";
import { environment } from 'src/environments/environment.development';
import { AngularFireModule } from "@angular/fire/compat";
import { addDoc, collection, collectionData, FirestoreModule } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private store: Firestore = inject(Firestore)

  getEmployees(): Observable<Employee[]> {
    const employees = collection(this.store, 'employees');
    const data = collectionData(employees, {idField: 'id'}) as Observable<Employee[]>
    return data
  }

  addEmployee(employee: Employee) {
    console.log(employee)
    const employees = collection(this.store, 'employees');
    delete employee.id
    return addDoc(employees, {...employee});
  }
}
