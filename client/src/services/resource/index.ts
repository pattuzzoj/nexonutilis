import { createEffect } from "solid-js";
import useFetch from "hooks/revision/useFetch";
import useLocalStorage from "hooks/revision/useLocalStorage";
import { baseURL } from "utils/constants";

function getResources() {
  const [lastSync, setLastSync] = useLocalStorage<{category: string, resource: string}>("lastSync", {});
  const newSync = new Date().toISOString();
  const [data, setData] = useFetch(baseURL.concat(`/resource/${lastSync()?.resource}`), {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors'
  });

  createEffect(() => {
    if(data()) {
      createEffect(() => {
        if(data()) {
          setLastSync((prev) => ({...prev, resource: newSync}));
        }
      });
    }
  });

  return [data, setData];
}

function createResource() {
  const [data, setData] = useFetch(baseURL.concat("/resource"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors'
  });

  return [data, setData];
}

function updateResource(id: number) {
  const [data, setData] = useFetch(baseURL.concat(`/resource/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors'
  });

  return [data, setData];
}

function deleteResource(id: number) {
  const [data, setData] = useFetch(baseURL.concat(`/resource/${id}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors'
  });

  return [data, setData];
}

export {getResources, createResource, updateResource, deleteResource};