import api from './index'
import { toast } from 'react-toastify'

export async function addTaskRequest(id: string | undefined, taskName: string)
{
  if (id === undefined) return toast.error("Todo id is blank");

  const dto = {
      item: {
        description: taskName
      }
    }

  try {
      const response = await api.post(`/todos/${id}/items`, dto);

      toast.success("task added!");

      return response.data
  } catch (error) {
    toast.error(`Error Server ${error}`);
  }
}

export async function changeTaskRequest(todo_id: string | undefined, item_id: number, done: boolean)
{
  if (todo_id === undefined) return toast.error("Todo id is blank");

  const dto = {
    item: {
      done: done
    }
  }

  try {
      await api.put(`/todos/${todo_id}/items/${item_id}/done`, dto);
  } catch (error) {
    toast.error(`Error Server ${error}`);
  }
}

export async function RemoveTaskRequest(todo_id: string | undefined, item_id: number)
{
  if (todo_id === undefined) return toast.error("Todo id is blank");

  try {
      await api.delete(`/todos/${todo_id}/items/${item_id}/`);
  } catch (error) {
    toast.error(`Error Server ${error}`);
  }
}