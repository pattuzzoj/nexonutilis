import { ResourceReturn, createResource } from 'solid-js';

const baseURL = "https://nexonutilis-server.vercel.app";

export default function useFetch<T>(method: string = 'GET', url: string, body?: any): ResourceReturn<T> {
  async function fetchResource() {
    const options: any = {
      method,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors'
    }
  
    if(body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(baseURL + url, options);

      if(response) {
        const data = await response.json();
        console.log(data?.message);

        return data.data;
      } else {
        console.log(data?.error)
      }
    } catch(e) {
      console.log(e);
    }
  }

  const [data, {mutate, refetch}] = createResource(url, fetchResource);

  return [data, {mutate, refetch}];
}