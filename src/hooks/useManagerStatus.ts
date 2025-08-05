import { useQuery } from "@tanstack/react-query";
import { getManagerDashboard } from "@/api/ProjectAPI";

export const useManagerStatus = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['manager-status'],
        queryFn: getManagerDashboard,
        retry: false,
        refetchOnWindowFocus: false
    })

    // Si hay datos, el usuario es manager; si hay error 403, no es manager
    const isManager = !isError && data !== undefined;

    return { isManager, isLoading }
}
