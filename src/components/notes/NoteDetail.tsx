import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import type { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"


type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])
    const params = useParams()
    const location = useLocation()
    const queryClient = useQueryClient()
    const queryParams = new URLSearchParams(location.search)
    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!


    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)

        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })


        }
    })


    if (isLoading) return 'Cargando...'

    return (
        <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-xl shadow-sm flex justify-between items-start gap-4">
            <div className="flex-1">
                <p className="text-slate-700 mb-1">{note.content}</p>
                <div className="text-sm text-slate-500 flex justify-between items-center">
                    <span className="font-semibold text-slate-600">
                        {note.createdBy.name}
                    </span>
                    <span className="text-xs">{formatDate(note.createdAt)}</span>
                </div>
            </div>

            {canDelete && (
                <button
                    type="button"
                    className="text-xs px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-sm transition-all"
                    onClick={() =>
                        mutate({ projectId, taskId, noteId: note._id })
                    }
                >
                    Eliminar
                </button>
            )}
        </div>
    );
}