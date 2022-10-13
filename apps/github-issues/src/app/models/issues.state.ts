import { IssueModel } from "./issue.interface";

export interface IssuesState {
    loading: boolean,
    issues: ReadonlyArray<IssueModel>;
}