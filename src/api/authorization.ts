const CODE_KEY = 'code';
const TOKEN_KEY = 'token';

function authRedirect(): void {
  // TODO: redirect_uri to config
  document.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.githubClientId}&redirect_uri=http%3A%2F%2Flocalhost%3A3030&login=${process.env.user}`;
}

function getAuthCode(): string {
  const storageCode = window.localStorage.getItem(CODE_KEY);
  if (storageCode) {
    return storageCode;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const paramsCode = urlParams.get(CODE_KEY);
  if (paramsCode) {
    window.localStorage.setItem(CODE_KEY, paramsCode);
    return paramsCode;
  }

  authRedirect();
  return '';
}

export async function getToken(): Promise<string | void> {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token && token !== 'undefined') {
    return token;
  }

  const queryParams = `?client_id=${process.env.githubClientId}&redirect_uri=http%3A%2F%2Flocalhost%3A3030&client_secret=${process.env.githubClientSecret}&code=${getAuthCode()}`;
  // localhost CORS workaround
  const url = `https://cors-anywhere.herokuapp.com/${process.env.accessTokenUrl + queryParams}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json'
    },
    cache: 'no-cache',
    mode: 'cors'
  });

  if (response.status === 401) {
    authRedirect();
  }

  if (response.ok) {
    const data = await response.json();
    // Handle code verification error
    if ('error' in data && data.error === 'bad_verification_code') {
      authRedirect();
    }

    window.localStorage.setItem(TOKEN_KEY, data.access_token);
    return data.access_token as string;
  }

  return '';
}
