export function storeCurrentUser(user) {
  localStorage.setItem('currentUser', user);
}

export function storeCurrentToken(token) {
  localStorage.setItem('currentToken', token);
}

export function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user;
}

export function getCurrentToken() {
  const token = JSON.parse(localStorage.getItem('currentToken'));
  return token;
}

export function clearCurrentUser() {
  localStorage.removeItem('currentUser');
}

export function clearCurrentToken() {
  localStorage.removeItem('currentToken');
}
