import api from "@/lib/axios";
import { type Project, type ProjectFormData, dashboardProjectSchema } from '../types'
import { isAxiosError } from "axios";

// Crear proyectos
export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }
}

// Traer proyectos
export async function getProjects() {
    try {
        const { data } = await api('/projects');
        const response = dashboardProjectSchema.safeParse(data)
        if (response.success) {
            return response.data
        }


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }
}

// Editar proyectos
export async function getProjectById(id: Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`);
        console.log(data)
        return data


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }
}

type ProjectAPIType = {
    formData: ProjectFormData
    projectId: Project['_id']
}
// Actualizar proyecto
export async function updateProject({formData, projectId}: ProjectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData);
        console.log(data)
        return data


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }
}

// Elimnar Proyecto
export async function deleteProject(id: Project['_id']) {
    try {
        const url = `/projects/${id}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }
}