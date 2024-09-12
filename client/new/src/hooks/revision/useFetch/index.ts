import { Accessor, Setter, createSignal, onCleanup } from "solid-js";

type FetchReturn<T> = [
  Accessor<T | Response>,
  Setter<T | Response>,
  utils: {
    refreshFetch: VoidFunction,
    abortFetch: VoidFunction,
    fetchStatus: Accessor<string>,
    fetchError: Accessor<string | null>
  }
]

type FetchStatus = "loading" | "success" | "error";
type FetchError = string | null;

function useFetch<T>(url: RequestInfo | URL): FetchReturn<T>;
function useFetch<T>(url: RequestInfo | URL, options: RequestInit): FetchReturn<T>;
function useFetch<T = string>(url: RequestInfo | URL, options?: RequestInit): FetchReturn<T> {
  const [fetchResponse, setFetchResponse] = createSignal<T | Response>({} as T);
  const [fetchStatus, setFetchStatus] = createSignal<FetchStatus>("loading");
  const [fetchError, setFetchError] = createSignal<FetchError>(null);
  let controller = new AbortController();

  function refreshFetch() {
    setFetchStatus("loading");
    setFetchError(null);
    fetchResource();
  }

  function abortFetch() {
    controller.abort();
  }

  if(options && options?.body && typeof options.body === 'object' && !(options.body instanceof Blob) && !(options.body instanceof FormData) && !(options.body instanceof URLSearchParams)) {
    options.body = JSON.stringify(options.body);
    options.headers = {...options.headers, "content-type": 'application/json'};
  }
  
  async function formatResponse(response: Response): Promise<T | Response> {
    const contentType = response.headers.get("content-type");

    let formatedResponse;

    if (contentType?.includes("application/json")) {
      formatedResponse = await response.json();
    } else if (contentType?.includes("multipart/form-data")) {
      formatedResponse = await response.formData();
    } else if (contentType?.includes("text")) {
      formatedResponse = await response.text();
    } else if (contentType?.includes("application/octet-stream")) {
      const contentDisposition = response.headers.get("content-disposition");

      if (contentDisposition?.includes("attachment") || contentDisposition?.includes("filename")) {
        formatedResponse = await response.blob();
      } else {
        formatedResponse = await response.arrayBuffer();
      }
    } else {
      return response as Response;
    }

    return formatedResponse as T;
  }
  
  async function fetchResource() {
    controller = new AbortController();
    options = {...options, signal: controller.signal};

    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        const formatedResponse = await formatResponse(response);

        setFetchResponse(formatedResponse as Exclude<T, Function>);
        setFetchStatus("success");
      } else {
        throw new Error(`HTTP Status error: ${response.status}`);
      }
    } catch (error: any) {
      setFetchError(String(error.message));
      setFetchStatus("error");
    }
  }

  fetchResource();

  onCleanup(abortFetch);

  return [fetchResponse, setFetchResponse, {refreshFetch, abortFetch, fetchStatus, fetchError}];
};

export default useFetch;