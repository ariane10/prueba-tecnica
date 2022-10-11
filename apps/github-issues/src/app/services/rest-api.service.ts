import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(protected http: HttpClient) { }

  getRepositoryIssues(url: string, per_pag: number, pag: number): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/vnd.github+json'
      }),
      params: new HttpParams()
        .set('per_page', per_pag)
        .set('page', pag)
    };

    return this.http.get<any>("https://api.github.com/repos" + url + "/issues", httpOptions);

  }
}
