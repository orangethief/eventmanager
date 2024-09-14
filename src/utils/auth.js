export const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    return false;
  }
  const payload = atob(token?.split('.')[1]);
  if (((new Date()).getTime() / 1000) >= payload['exp']) {
    logout();
    return false;
  }

  return true;
}

export const setToken = (token) => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token') || null;

export const logout = () => localStorage.removeItem('token');
