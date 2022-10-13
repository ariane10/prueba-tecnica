import { createAction, props } from '@ngrx/store';
import { IssueModel } from '../../models/issue.interface';


export const loadIssues = createAction(
    '[Issue List] Load issues'
);


export const loadedIssues = createAction(
    '[Issue List] Issues loaded success',
    props<{ issues: IssueModel[] }>()
);
