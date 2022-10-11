import { createReducer, on } from '@ngrx/store';
import { IssuesState } from '../../models/issues.state';
import { loadedIssues } from '../action/issues.actions';


export const initialState: IssuesState = {issues: []}

export const issuesReducer = createReducer(
  initialState,
  on(loadedIssues, (state, {issues}) => {
    return {...state, loaded: true, issues: issues}
  })
);