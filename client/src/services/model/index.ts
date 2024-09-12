import useFetch from "hooks/revision/useFetch";

const baseURL = "";

function get() {
  const [data, setData, {refetch}] = useFetch(baseURL.concat(""), {
    method: "GET"
  });

  return [data, setData, {refetch}];
}

function create() {
  const [data, setData, {refetch}] = useFetch(baseURL.concat(""), {
    method: "POST"
  });

  return [data, setData, {refetch}];
}

function update() {
  const [data, setData, {refetch}] = useFetch(baseURL.concat(""), {
    method: "PUT"
  });

  return [data, setData, {refetch}];
}

function delet() {
  const [data, setData, {refetch}] = useFetch(baseURL.concat(""), {
    method: "DELETE"
  });

  return [data, setData, {refetch}];
}

export {get, create, update, delet}