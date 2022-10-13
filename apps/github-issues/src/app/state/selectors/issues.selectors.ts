import { createSelector } from '@ngrx/store';
import { IssuesState } from '../../models/issues.state';
 
 
export interface AppState {
  issues: IssuesState;
}
 
export const selectIssuesFeature = (state: AppState) => state.issues;

export const selectLoading = createSelector(
  selectIssuesFeature,
  (state: IssuesState) => state.loading
);

export const selectListIssues = createSelector(
  selectIssuesFeature,
  (state: IssuesState) => state.issues
);