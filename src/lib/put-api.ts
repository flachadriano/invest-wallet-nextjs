export default async function putApi(api: string, data: any) {
  return fetch(api, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}
