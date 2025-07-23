import axios, { AxiosError } from 'axios';
import type {
  Project,
  Bug,
  CreateProjectRequest,
  CreateBugRequest,
  UpdateBugRequest,
  ApiResponse,
  BugStatistics
} from '../types';

// Use relative URL to work in both development and Docker environments
const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const message = error.response?.data?.error?.message || 'An unexpected error occurred';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

// Project API calls
export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ApiResponse<Project[]>>('/projects');
  return response.data.data;
};

export const getProject = async (id: number): Promise<Project> => {
  const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
  return response.data.data;
};

export const createProject = async (project: CreateProjectRequest): Promise<Project> => {
  const response = await api.post<ApiResponse<Project>>('/projects', project);
  return response.data.data;
};

// Bug API calls
export const getBugsByProject = async (projectId: number): Promise<Bug[]> => {
  const response = await api.get<ApiResponse<Bug[]>>(`/projects/${projectId}/bugs`);
  return response.data.data;
};

export const getBug = async (projectId: number, bugId: number): Promise<Bug> => {
  const response = await api.get<ApiResponse<Bug>>(`/projects/${projectId}/bugs/${bugId}`);
  return response.data.data;
};

export const createBug = async (projectId: number, bug: CreateBugRequest): Promise<Bug> => {
  const response = await api.post<ApiResponse<Bug>>(`/projects/${projectId}/bugs`, bug);
  return response.data.data;
};

export const updateBug = async (projectId: number, bugId: number, bug: UpdateBugRequest): Promise<Bug> => {
  const response = await api.put<ApiResponse<Bug>>(`/projects/${projectId}/bugs/${bugId}`, bug);
  return response.data.data;
};

export const deleteBug = async (projectId: number, bugId: number): Promise<void> => {
  await api.delete(`/projects/${projectId}/bugs/${bugId}`);
};

export const getBugStatistics = async (projectId: number): Promise<BugStatistics> => {
  const response = await api.get<ApiResponse<BugStatistics>>(`/projects/${projectId}/bugs/statistics`);
  return response.data.data;
};