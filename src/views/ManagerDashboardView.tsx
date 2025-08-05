import { useQuery } from '@tanstack/react-query'
import { getManagerDashboard } from '@/api/ProjectAPI'
import { Navigate } from 'react-router-dom'

export default function ManagerDashboardView() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['manager-dashboard'],
    queryFn: getManagerDashboard,
    retry: false,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <div className="text-center">Cargando dashboard...</div>
  
  if (isError) {
    return <Navigate to="/" replace />
  }

  if (!data) return null

  const { summary, projectBreakdown } = data

  // Calcular porcentajes para el gráfico circular
  const totalStories = summary.openStories + summary.closedStories
  const closedPercentage = totalStories > 0 ? (summary.closedStories / totalStories) * 100 : 0
  const openPercentage = totalStories > 0 ? (summary.openStories / totalStories) * 100 : 0

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard del Manager</h1>
        <p className="text-gray-600">Vista general del rendimiento del equipo</p>
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Proyectos</h3>
          <p className="text-3xl font-bold text-blue-600">{summary.totalProjects}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Historias Cerradas</h3>
          <p className="text-3xl font-bold text-green-600">{summary.closedStories}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Historias Abiertas</h3>
          <p className="text-3xl font-bold text-yellow-600">{summary.openStories}</p>
        </div>
      </div>

      {/* Gráfico Circular Simple con CSS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Distribución de Historias</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Gráfico circular usando conic-gradient */}
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(
                    #10b981 0deg ${closedPercentage * 3.6}deg,
                    #f59e0b ${closedPercentage * 3.6}deg 360deg
                  )`
                }}
              >
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{totalStories}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Leyenda */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-sm text-gray-700">
                Cerradas: {summary.closedStories} ({closedPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
              <span className="text-sm text-gray-700">
                Abiertas: {summary.openStories} ({openPercentage.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Estadísticas por Proyecto */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Rendimiento por Proyecto</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {projectBreakdown.map((project: any) => {
              const projectStats = project.stats.reduce((acc: any, stat: any) => {
                if (stat.status === 'completed') {
                  acc.closed = stat.count
                } else {
                  acc.open += stat.count
                }
                return acc
              }, { open: 0, closed: 0 })

              const total = projectStats.open + projectStats.closed
              const completionRate = total > 0 ? (projectStats.closed / total) * 100 : 0

              return (
                <div key={project._id} className="border-b pb-3">
                  <h4 className="font-medium text-gray-800 mb-2">{project.projectName}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progreso: {completionRate.toFixed(1)}%</span>
                    <span>{projectStats.closed}/{total} completadas</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tabla Detallada */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Detalle por Proyecto</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proyecto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Historias Cerradas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Historias Abiertas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projectBreakdown.map((project: any) => {
                const projectStats = project.stats.reduce((acc: any, stat: any) => {
                  if (stat.status === 'completed') {
                    acc.closed = stat.count
                  } else {
                    acc.open += stat.count
                  }
                  return acc
                }, { open: 0, closed: 0 })

                const total = projectStats.open + projectStats.closed
                const completionRate = total > 0 ? (projectStats.closed / total) * 100 : 0

                return (
                  <tr key={project._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {project.projectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                      {projectStats.closed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-semibold">
                      {projectStats.open}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        completionRate >= 80 ? 'bg-green-100 text-green-800' :
                        completionRate >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {completionRate.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
