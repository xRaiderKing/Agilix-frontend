

export const isManager = (
  manager: { _id: string } | string,
  userId: string
) => {
  if (typeof manager === 'string') return manager === userId
  if (typeof manager === 'object' && '_id' in manager) return manager._id === userId
  return false
}
