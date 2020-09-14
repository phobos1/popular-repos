import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import {
  RepositoriesList,
  RepositoriesListItem,
  RepositorySearchResponse,
  SearchRepositoriesVariables
} from './types';
import { ReposListItem } from '../ReposListItem/ReposListItem';
import { ReposSearch } from '../ReposSearch/ReposSearch';
import { GET_REPOS } from './query';
import styles from './reposList.scss';
import { getQueryString } from '../ReposSearch/helpers';

// TODO: refactor repos list logic
export function ReposList(): JSX.Element {
  const [cursor, setCursor] = useState<string>(null);
  const [queryString, setQueryString] = useState<string>(getQueryString(''));
  const { loading, error, data } = useQuery<RepositorySearchResponse, SearchRepositoriesVariables>(
    GET_REPOS,
    {
      variables: { queryString, count: 50, cursor }
    }
  );
  const changeQueryString = useCallback((queryString: string) => {
    setCursor(null);
    setQueryString(queryString);
  }, []);

  // TODO: research best practice to pagination with cursor
  const [tmpCursor, setTmpCursor] = useState<string>(null);
  const [repos, setRepos] = useState<RepositoriesList>([]);
  useEffect(() => {
    if (!data) {
      return;
    }

    const { edges } = data.search;
    const loadedRepos = edges.map((edge): RepositoriesListItem => ({
      id: edge.node.id,
      name: edge.node.name,
      createdAt: new Date(edge.node.createdAt),
      forksCount: edge.node.forks.totalCount,
      starsCount: edge.node.stargazers.totalCount,
      licenseName: edge.node.licenseInfo ? edge.node.licenseInfo.name : null
    }));

    if (cursor) {
      setRepos(repos.concat(loadedRepos));
    } else {
      setRepos(loadedRepos);
    }

    if (edges.length) {
      setTmpCursor(edges[edges.length - 1].cursor);
    }
  }, [data]);
  const loadMore = useCallback(() => {
    setCursor(tmpCursor);
  }, [tmpCursor]);

  if (error) {
    return <div>Loading error. Please, try reloading the page</div>;
  }

  return (
    <>
      <ReposSearch changeQueryString={changeQueryString} />
      {repos && (
        <div className={styles['repos-list']}>
          {!repos.length && !loading && <div>No one repositories found</div>}
          {repos.map((repo) => <ReposListItem key={repo.id} repo={repo} />)}
        </div>
      )}
      {loading && <div>Loading...</div>}
      <div>
        <button
          type="button"
          onClick={loadMore}
        >
          Load More
        </button>
      </div>
    </>
  );
}
