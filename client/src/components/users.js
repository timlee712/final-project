export function setUserId(userId) {
  localStorage.setItem('userId', JSON.stringify(userId));
}

export function getUserId() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    return JSON.parse(userId);
  } else {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('userId');
}
