import api from "@/lib/axios"
import { isAxiosError } from "axios"
import type { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types"


// Actualizar perfil del usuario
export async function updateProfile(formData: UserProfileForm) {
    try {
        const { data } = await api.put<string>('/auth/profile', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Actualizar contraseña desde el perfil
export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
    try {
        const { data } = await api.post<string>('/auth/update-password', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}