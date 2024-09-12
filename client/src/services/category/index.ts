import { createEffect } from "solid-js";
import useFetch from "hooks/revision/useFetch";
import useLocalStorage from "hooks/revision/useLocalStorage";
import { baseURL } from "utils/constants";

function getCategories() {
  const [lastSync, setLastSync] = useLocalStorage("lastSync", {category: '2001-01-01T01:01:01.259Z', resource: '2001-01-01T01:01:01.259Z'});
  const newSync = new Date().toISOString();
  const [data, setData] = useFetch(baseURL.concat(`/category/${lastSync().category}`), {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors'
  });

  createEffect(() => {
    if(data()) {
      setLastSync((prev) => ({...prev, category: newSync}));
    }
  });

  return [data, setData];
}

function createCategory() {
  const [data, setData] = useFetch(baseURL.concat("/category"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors'
  });

  return [data, setData];
}

function updateCategory(id: number) {
  const [data, setData] = useFetch(baseURL.concat(`/category/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors'
  });

  return [data, setData];
}

function deleteCategory(id: number) {
  const [data, setData] = useFetch(baseURL.concat(`/category/${id}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    mode: 'cors'
  });

  return [data, setData];
}

export {getCategories, createCategory, updateCategory, deleteCategory};