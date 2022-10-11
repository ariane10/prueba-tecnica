export interface IssueModel {
    
    body: string,
    title: string,
    url: string,
    created_at: string,
    user: {
        login: string
    }
}