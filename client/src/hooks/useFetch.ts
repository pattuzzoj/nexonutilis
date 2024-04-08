import { ResourceReturn, createResource } from 'solid-js';

export default function useFetch<T>(url: string): ResourceReturn<T> {
  async function fetchResource(): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        
      },
      mode: 'cors'
    });

    if(response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error('Network response was not ok' + response.status);
    }
  }

  const [data, {mutate, refetch}] = createResource(url, fetchResource);

  return [data, {mutate, refetch}];
}