import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getTaskbyId } from "@/api/TaskAPI";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('editTask');
   
    const {data, isError} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskbyId({projectId,taskId: taskId!}),
        enabled: !!taskId,
        retry: false
    })

   if(isError) return  <Navigate to="/404" />

    if(data && taskId) return <EditTaskModal data={data} taskId={taskId}/>
}
