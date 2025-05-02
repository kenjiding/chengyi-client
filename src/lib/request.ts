import { getHost } from "./utils";

interface RequestInit {
  method?: string;
  headers?: {
    [key: string]: string;
  };
  body?: BodyInit | null;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
  data?: any,
  ignore?: boolean,
  next?: any
}

const PrePath = '/api';

function objectToQueryString(obj: Record<string, string | number>): string {
  const keyValuePairs: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value !== null && value !== undefined) {
        keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`);
      }
    }
  }
  return keyValuePairs.join('&');
}

class Request {
  constructor() {}
  public static request<T>(url: string, configs: RequestInit): Promise<T> {
    if(!configs.headers) configs.headers = {};
    // const state = useUserStore.getState();
    // if(state.userData?.access_token) {
    //   configs.headers.Authorization = `Bearer ${state.userData?.access_token}`;
    // }

    delete configs.data;
    return fetch(getHost(PrePath + url), {
      // cache: 'no-cache',
      ...configs,
    }).then(async response => {
      if (!response.ok) {
        const errorData = await response.json();
        return Promise.reject({
          ok: response.ok,
          status: errorData.statusCode,
          statusText: errorData.message,
        });
      }
      return response.json().then(data => data.data);
    });
  };

  public static get<T>(url: string, configs?: RequestInit) {
    const requestConfigs = {
      method: 'GET',
      ...configs,
    } as RequestInit;

    url += `?${objectToQueryString(requestConfigs.data)}`;

    return Request.request<T>(url, requestConfigs);
  }

  public static post<T>(url: string, configs?: RequestInit) {
    const requestConfigs = {
      method: 'POST',
      ...configs,
    } as RequestInit;
    if(!requestConfigs.body) {
      if (requestConfigs.headers) {
        requestConfigs.headers['Content-Type'] = 'application/json';
      }
      requestConfigs.body = JSON.stringify(requestConfigs.data);
    }
    return Request.request<T>(url, requestConfigs);
  }
}


export default Request;
