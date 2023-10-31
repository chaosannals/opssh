import { getClient, Body, Response, ResponseType, HttpOptions, HttpVerb } from '@tauri-apps/api/http';
import { isEmpty } from 'lodash';
import { stringify } from 'qs';
import { useAuthStore } from '../stores/AuthStore';

export declare class ApiRequestOptions {
    url?: string;
    path?: string;
    method: HttpVerb;
    query?: any;
    data?: any;
    form?: any;
}

export const apiRequest = async <T>(options: ApiRequestOptions): Promise<Response<T>> => {
    const auth = useAuthStore();

    let uri = options.url ?? `${auth.server.scheme}://${auth.server.host}:${auth.server.port}/${options.path}`;
    if (!isEmpty(options.query)) {
        uri = `${uri}${stringify(options.query)}`;
    }
    const setting: HttpOptions = {
        timeout: 30,
        responseType: ResponseType.JSON,
        method: options.method,
        url: uri,
    };

    if (!isEmpty(options.data)) {
        setting.body = Body.json(options.data);
    } else if (!isEmpty(options.form)) {
        setting.body = Body.form(options.form);
    }

    if (!isEmpty(auth.token)) {
        setting.headers = {
            'Authorization': `Bearer ${auth.token}`
        };
    }
    const client = await getClient();
    return await client.request(setting);
};

export const apiGet = async <T>(path: string, query: any = null): Promise<Response<T>> => {
    return await apiRequest({
        path: path,
        query: query,
        method: 'GET',
    });
};

export const apiPost = async <T>(path: string, data: any): Promise<Response<T>> => {
    return await apiRequest({
        path: path,
        data: data,
        method: 'POST',
    });
};

export const apiPostForm = async <T>(path: string, form: any): Promise<Response<T>> => {
    return await apiRequest({
        path: path,
        form: form,
        method: 'POST',
    });
};

export const apiTouch = async(): Promise<Boolean> => {
    try {
        await apiGet('/auth/touch');
    } catch (e: Error) {
        console.log("api touch: ", e);
    }
    return false;
};