export default async function getApi(api: string) {
  return fetch(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}
