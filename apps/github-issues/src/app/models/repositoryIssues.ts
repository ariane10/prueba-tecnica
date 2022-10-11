

export interface RepositoryIssue {
    
    body: string,
    title: string,
    url: string,
    created_at: string,
    user: IssueUser

   
}

export interface IssueUser {

    login: string
   
}