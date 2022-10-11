import { IssueModel } from "./issue.interface";

export interface IssuesState {
    issues: ReadonlyArray<IssueModel>;
}