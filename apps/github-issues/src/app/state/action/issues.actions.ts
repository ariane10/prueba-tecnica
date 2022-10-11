import { createAction, props } from '@ngrx/store';
import { IssueModel } from '../../models/issue.interface';
 
export const loadedIssues = createAction(
    '[Issue List] Loaded success',
    props<{ issues: IssueModel[] }>()
);
