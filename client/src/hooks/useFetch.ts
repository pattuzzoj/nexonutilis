import { ResourceReturn, createResource } from 'solid-js';

export default function useFetch<T>(method: string = 'GET', url: string): ResourceReturn<T> {
  async function fetchResource(): Promise<T> {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors'
      });

      if(response) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error: ' + response);
      }
    } catch(e) {
      throw new Error('Error: ' + e);
    }
  }

  const [data, {mutate, refetch}] = createResource(url, fetchResource);

  return [data, {mutate, refetch}];
}