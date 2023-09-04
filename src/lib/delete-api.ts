export default async function deleteApi(api: string) {
  return fetch(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}
