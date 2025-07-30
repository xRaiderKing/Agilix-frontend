import { z } from 'zod'
/** Tasks */
export const taskStatusSchema = z.enum(["pending", "inProgress", "onHold", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    Status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string()
})
 
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>

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