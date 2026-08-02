export async function deleteEntity(id: string) {
  const res = await fetch(`http://localhost:3001/delete/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete entity')

  console.log(res)
}

export function useDeleteEntity() {}
