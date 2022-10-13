import { createAction, props } from '@ngrx/store';
import { IssueModel } from '../../models/issue.interface';


export const loadIssues = createAction(
    '[Issue List] Load issues',
    props<{ url: string, per_pag: number, pag: number }>()
);


export const loadedIssues = createAction(
    '[Issue List] Issues loaded success',
    props<{ issues: IssueModel[] }>()
);
