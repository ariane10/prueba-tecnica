import { createReducer, on } from '@ngrx/store';
import { IssuesState } from '../../models/issues.state';
import { loadIssues, loadedIssues } from '../action/issues.actions';


export const initialState: IssuesState = {loading: false, issues: []}

export const issuesReducer = createReducer(
  initialState,
  on(loadIssues, (state) => {
    return {...state, loading: true}
  }),
  on(loadedIssues, (state, {issues}) => {
    return {...state, loading: false, issues: issues}
  })
);