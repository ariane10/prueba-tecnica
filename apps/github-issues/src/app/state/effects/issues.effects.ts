import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RestApiService } from '../../services/rest-api.service';
 
@Injectable()
export class IssuesEffects {
 
  /*loadIssues$ = createEffect(() => this.actions$.pipe(
    //ofType('[Issue List] Loaded success'),
    mergeMap(() => this.restApiService.getRepositoryIssues()
      .pipe(
        map(issues => ({ type: '[Issue List] Loaded success', issues: issues })),
        catchError(() => EMPTY)
      ))
    )
  )*/
 
  constructor(
    private actions$: Actions,
    private restApiService: RestApiService
  ) {}
}