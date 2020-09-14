import { subMonths } from 'date-fns';

const lastMonth = subMonths(new Date(), 1).toISOString();

export function getQueryString(search: string, licenseKey: string = null): string {
  let queryString = `language:JavaScript sort:stars-desc stars:>0 created:>=${lastMonth}`;
  if (search) {
    queryString = `${search} ${queryString}`;
  }

  if (licenseKey) {
    queryString = `${queryString} license:${licenseKey}`;
  }
  return queryString;
}
