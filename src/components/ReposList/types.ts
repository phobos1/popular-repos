export interface RepositorySearchForks {
  totalCount: number;
}

export interface RepositorySearchStargazers {
  totalCount: number;
}

export interface RepositorySearchLicense {
  key: string;
  name: string;
}

export interface RepositorySearchNode {
  id: string;
  name: string;
  createdAt: string;
  forks: RepositorySearchForks;
  stargazers: RepositorySearchStargazers;
  licenseInfo: RepositorySearchLicense;
}

export interface RepositorySearchEdge {
  cursor: string;
  node: RepositorySearchNode;
}

export interface RepositorySearchEdges {
  edges: RepositorySearchEdge[];
}

export interface RepositorySearchResponse {
  search: RepositorySearchEdges;
}

export interface RepositoriesListItem {
  id: string;
  name: string;
  createdAt: Date;
  forksCount: number;
  starsCount: number;
  licenseName?: string;
}

export type RepositoriesList = RepositoriesListItem[];

export interface SearchRepositoriesVariables {
  queryString: string;
  count: number;
  cursor: string;
}
