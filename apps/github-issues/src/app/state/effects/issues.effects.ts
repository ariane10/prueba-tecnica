import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { RestApiService } from '../../services/rest-api.service';
import { loadedIssues, loadIssues } from '../action/issues.actions';
 
@Injectable()
export class IssuesEffects {

  loadIssues$ = createEffect(() => this.actions$.pipe(
    ofType(loadIssues), // la acción que ha ejecutado el cambio  
      exhaustMap(action => this.restApiService.getRepositoryIssues(action.url, action.per_pag, action.pag).pipe(
        map(issues => loadedIssues({issues: issues})),
        catchError(() => EMPTY)
      ))
    )
  )
 
  constructor(
    private actions$: Actions,
    private restApiService: RestApiService
  ) {}
}