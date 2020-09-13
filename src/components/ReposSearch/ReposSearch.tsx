import React, { useCallback, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import styles from './reposSearch.scss';
import { getQueryString } from './helpers';
import { GET_LICENSES } from './query';
import { License, LicensesResponse } from './types';

export interface ReposSearchProps {
  changeQueryString(queryString: string): void
}

export function ReposSearch({ changeQueryString }: ReposSearchProps): JSX.Element {
  // Load licenses
  const { loading, error, data: loadedLicenses } = useQuery<LicensesResponse>(GET_LICENSES);
  const [licenses, setLicenses] = useState<License[]>([]);
  useEffect(() => {
    if (!loadedLicenses) {
      return;
    }

    setLicenses(loadedLicenses.licenses);
  }, [loadedLicenses]);

  // Search form state
  const [searchValue, setSearchValue] = useState('');
  const [selectedLicense, setLicense] = useState<string>('');

  // Set search value
  const handleInputChange = useCallback((ev: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(ev.currentTarget.value);

    const queryString = getQueryString(ev.currentTarget.value, selectedLicense);
    changeQueryString(queryString);
  }, []);

  // Set selected license
  const handleSelectLicense = useCallback((ev: React.FormEvent<HTMLSelectElement>) => {
    setLicense(ev.currentTarget.value);

    const queryString = getQueryString(searchValue, ev.currentTarget.value);
    changeQueryString(queryString);
  }, []);

  return (
    <div className={styles['search-form']}>
      <input
        placeholder="Search"
        type="text"
        name="searchString"
        value={searchValue}
        onChange={handleInputChange}
      />
      &nbsp;
      <select
        name="license"
        value={selectedLicense}
        onChange={handleSelectLicense}
      >
        <option value="">Select license</option>
        {!loading && !error && licenses.map((license) => (
          <option
            key={license.key}
            value={license.key}
          >
            {license.name}
          </option>
        ))}
      </select>
    </div>
  );
}
