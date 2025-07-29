import { z } from 'zod'

/** Projects */
export const projecSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

export const dashboardProjectSchema = z.array(
    projecSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)
export type Project = z.infer<typeof projecSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>