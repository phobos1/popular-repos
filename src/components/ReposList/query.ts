import { gql } from '@apollo/client';

export const GET_REPOS = gql`
    query GetRepositoties($queryString: String!, $count: Int!, $cursor: String) {
        search(type:REPOSITORY, query:$queryString, first:$count, after:$cursor) {
            repositoryCount
            edges {
                cursor
                node {
                    ... on Repository {
                        id
                        name
                        stargazers {
                            totalCount
                        }
                        forks {
                            totalCount
                        }
                        licenseInfo {
                            name,
                            key
                        }
                        createdAt
                    }
                }
            }
        }
    }
`;
