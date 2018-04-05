// TODO: Move to seperate function/file
export function getAccountsPlatformsCategories() {
  return Promise.all([
    getAccounts(),
    getPlatforms(),
    getCategories()
  ]);
}
function getAccounts() {
  return fetch('/api').then(res => res.json());
}
function getPlatforms() {
  return fetch('/api/platforms').then(res => res.json());
}
function getCategories() {
  return fetch('/api/categories').then(res => res.json());
}
