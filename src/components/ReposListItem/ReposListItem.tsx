import React from 'react';
import { RepositoriesListItem } from '../ReposList/types';
import styles from './reposListItem.scss';

export interface ReposListItemProps {
  repo: RepositoriesListItem;
}

export function ReposListItem({ repo }: ReposListItemProps): JSX.Element {
  return (
    <div>
      <header className={styles.header}>
        <h3>
          {repo.name}
        </h3>
        <div className={styles.header_license}>
          {repo.licenseName || 'No license info'}
        </div>
      </header>
      <div>
        <div className="info">
          {repo.createdAt.toISOString()}
        </div>

        <div className="counters">
          <span>
            STARS:
            &nbsp;
            <strong>{repo.starsCount}</strong>
          </span>
          &nbsp;
          <span>
            FORKS:
            &nbsp;
            <strong>{repo.forksCount}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
