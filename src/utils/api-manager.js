import { toast } from "react-hot-toast";
import axios from "./axios";
import { serialize } from 'object-to-formdata';
import { getLocalStorage } from "./local-storage";

export const post = async (url, obj) => {
    try {
        let formData = new FormData();
        let form_data_options = {
            indices: true,
        }
        formData = serialize(obj, form_data_options);
        let config = {
            headers: {
                'Content-Type': "multipart/form-data",
            }
        };
        const { data: response } = await axios.post(url, formData, config);
        if (response?.code > 0) {
            return response?.data;
        } else {
            toast.error(response?.message);
            return false;
        }
    } catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.message);
        return false;
    }
}
export const deleteItem = async (url, obj) => {
    try {
        const { data: response } = await axios.delete(url, obj);
        if (response?.code > 0) {
            return response?.data;
        } else {
            toast.error(response?.message);
            return false;
        }
    } catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.message);
        return false;
    }
}
export const put = async (url, obj) => {
    try {
        let formData = new FormData();
        let form_data_options = {
            indices: true,
        }
        formData = serialize(obj, form_data_options);
        let config = {
            headers: {
                'Content-Type': "multipart/form-data",
            }
        };
        const { data: response } = await axios.put(url, formData, config);
        if (response?.code > 0) {
            return response?.data;
        } else {
            toast.error(response?.message);
            return false;
        }
    } catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.message);
        return false;
    }
}
export const get = async (url, params) => {
    try {
        let query = new URLSearchParams(params).toString()
        const { data: response } = await axios.get(`${url}?${query}`);
        if (response?.code > 0) {
            return response?.data;
        } else {
            toast.error(response?.message);
            return false;
        }
    } catch (err) {
        console.log(err)
        return false;
    }
}
export const apiManager = (table, type, params) => {
    let obj = settingParams(table, type, params);
    let pathname = window.location.pathname;
    let dns_data = getLocalStorage('themeDnsData');
    dns_data = JSON.parse(dns_data);
    let base_url = `/api`;
    if (!(obj?.brand_id > 0)) {
        obj['brand_id'] = dns_data?.id;
    }
    if (type == 'get') {
        return get(`${base_url}/${table}/${params?.id}`);
    }
    if (type == 'list') {
        return get(`${base_url}/${table}`, obj);
    }
    if (type == 'create') {
        return post(`${base_url}/${table}`, obj);
    }
    if (type == 'update') {
        return put(`${base_url}/${table}/${params?.id}`, obj);
    }
    if (type == 'delete') {
        return deleteItem(`${base_url}/${table}/${params?.id}`);
    }
}
export const apiApiServer = (table, type, params) => {
    let obj = settingParams(table, type, params);
    let pathname = window.location.pathname;

    let base_url = `${process.env.API_URL}/api`;
    if (type == 'get') {
        return get(`${base_url}/${table}/${params?.id}`);
    }
    if (type == 'list') {
        return get(`${base_url}/${table}`, obj);
    }
    if (type == 'create') {
        return post(`${base_url}/${table}`, obj);
    }
    if (type == 'update') {
        return put(`${base_url}/${table}/${params?.id}`, obj);
    }
    if (type == 'delete') {
        return deleteItem(`${base_url}/${table}/${params?.id}`);
    }
}
const settingdeleteImageObj = (obj_) => {//이미지 존재안할시 삭제함
    let obj = obj_;
    let keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].slice(-5) == '_file') {
            if (!obj[keys[i]]) {
                delete obj[keys[i]];
            }
        }
    }
    return obj;
}
export const settingParams = (table, type, params) => {
    let obj = { ...params };
    let keys = Object.keys(obj);

    if (type == 'create') {
        obj = settingdeleteImageObj(obj);
    }
    if (type == 'update') {
        obj = settingdeleteImageObj(obj);
    }
    return obj
}