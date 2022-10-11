

export class RepositoryIssuesOUT {
    constructor(
        public body: string,
        public title: string,
        public url: string,
        public created_at: string,
        public user: IssueUser

    ) { }
}

export class IssueUser {
    constructor(
        public login: string
    ) { }
}