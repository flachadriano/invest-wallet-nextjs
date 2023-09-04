export default async function postApi(api: string, data: any) {
  return fetch(api, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
}
