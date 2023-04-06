// define some example arrow funtion to call api using axios exported from axios.ts

import { apiClient } from "../shared/axios";

const getExample = async () => {
    const response = await apiClient.get('/example');
    return response.data;
    }
// define a post arrow function with type
const postExample = async (data: any) => {
    const response = await apiClient.post('/example', data);
    return response.data;
    }
// define a get arrow function with type with paging
const getExampleWithPaging = async (page: number, size: number) => {
    const response = await apiClient.get(`/example?page=${page}&size=${size}`);
    return response.data;
    }   
// define a get arrow function with type with paging and search
const getExampleWithPagingAndSearch = async (page: number, size: number, search: string) => {
    const response = await apiClient.get(`/example?page=${page}&size=${size}&search=${search}`);
    return response.data;
    }
