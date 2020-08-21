import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Despesa } from '../model/despesa.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  selectDespesa: Despesa = {
    _id: '',
    descricao: '',
    valor: null,
    vencimento: '',
    observacao: '',
    mes: '',
    ano: '',
    status: ''
  };

  despesas: Despesa[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getDespesas(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(`${apiUrl}` + '/listar')
      .pipe(
        tap(despesas => console.log('Despesas listadas!')),
        catchError(this.handleError('getDespesas', []))
      );
  }

  getDespesasById(id: string): Observable<Despesa> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Despesa>(url).pipe(
      tap(_ => console.log(`Despesa id=${id}`)),
      catchError(this.handleError<Despesa>(`getDespesasById id=${id}`))
    );
  }

  addDespesa(despesas: Despesa): Observable<Despesa> {
    return this.http.post<Despesa>(apiUrl + '/cadastrar', despesas, httpOptions).pipe(
      tap((s: Despesa) => console.log(`Despesa cadastrada w/ id=${s._id}`)),
      catchError(this.handleError<Despesa>('addDespesa'))
    );
  }

  updateDespesa(despesas: Despesa): Observable<any> {
    const url = `${apiUrl}/${despesas._id}`;
    return this.http.put(url, despesas, httpOptions).pipe(
      tap(_ => console.log(`Despesa atualizada: id=${despesas._id}`)),
      catchError(this.handleError<any>('updateDespesa'))
    );
  }

  deleteDespesa(id: string): Observable<Despesa> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Despesa>(url, httpOptions).pipe(
      tap(_ => console.log(`Despesa deletada: id=${id}`)),
      catchError(this.handleError<Despesa>('deleteDespesa'))
    );
  }
}
