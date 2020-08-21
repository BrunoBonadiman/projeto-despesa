import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Salario } from '../model/salario.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/salario';

@Injectable({
  providedIn: 'root'
})
export class SalarioService {
  selectSalario: Salario = {
    _id: '',
    valor: null,
    mes: '',
    ano: ''
  };

  salario: Salario[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getSalario(): Observable<Salario[]> {
    return this.http.get<Salario[]>(`${apiUrl}` + '/listar')
      .pipe(
        tap(salario => console.log('Salario listado!')),
        catchError(this.handleError('getSalario', []))
      );
  }

  getSalarioById(id: string): Observable<Salario> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Salario>(url).pipe(
      tap(_ => console.log(`Salario id=${id}`)),
      catchError(this.handleError<Salario>(`getSalarioById id=${id}`))
    );
  }

  addSalario(salario: Salario): Observable<Salario> {
    return this.http.post<Salario>(apiUrl + '/cadastrar', salario, httpOptions).pipe(
      tap((s: Salario) => console.log(`Salário cadastrado w/ id=${s._id}`)),
      catchError(this.handleError<Salario>('addSalario'))
    );
  }

  updateSalario(salario: Salario): Observable<any> {
    const url = `${apiUrl}/${salario._id}`;
    return this.http.put(url, salario, httpOptions).pipe(
      tap(_ => console.log(`Salario atualizado: id=${salario._id}`)),
      catchError(this.handleError<any>('updateSalario'))
    );
  }

  deleteSalario(id: string): Observable<Salario> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Salario>(url, httpOptions).pipe(
      tap(_ => console.log(`Salario deletado: id=${id}`)),
      catchError(this.handleError<Salario>('deleteSalario'))
    );
  }
}
