import { ResourceReturn, createResource } from 'solid-js';

export default function useFetch<T>(method: string = 'GET', url: string, body?: any): ResourceReturn<T> {
  async function fetchResource(): Promise<T> {
    try {
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

      const response = await fetch(url, options);

      if(response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        throw new Error((response.json() as any).error as string);
      }
    } catch(e) {
      throw new Error(e as string);
    }
  }

  const [data, {mutate, refetch}] = createResource(url, fetchResource);

  return [data, {mutate, refetch}];
}