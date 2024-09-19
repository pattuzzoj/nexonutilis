import { createEffect } from "solid-js";
import useFetch from "hooks/useFetch";
import useLocalStorage from "hooks/useLocalStorage";
import { baseURL } from "utils/constants";

function getResources() {
  const [lastSync, setLastSync] = useLocalStorage<string>("lastResourcesSync", ' ');
  const newSync = new Date().toISOString();
  const [data, setData] = useFetch(baseURL.concat(`/resource/${lastSync()}`), {
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
          setLastSync(newSync);
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