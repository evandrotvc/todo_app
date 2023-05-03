
import * as C from '../App.styles';
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { Item } from '../types/Item';
import { ListItem } from '../components/ListItem';
import { AddArea } from '../components/AddArea';
import api from '../services/index'
import { useNavigate, useParams } from 'react-router-dom';
import {FaArrowCircleLeft} from 'react-icons/fa'
import { toast } from 'react-toastify'

const TodoPage = () => {
  const [todo, setTodo] = useState<Todo>();
  const [items, setItem] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const navigate = useNavigate()

  useEffect( () => {
    async function getItems(){
      const response = await api.get(`/todos/${params.id}`);

      setTodo(response.data)
      setItem(response.data.items)
      setLoading(true)
    }

    getItems()
  }, [])


  const handleAddTask = async (taskName: string) => {
    let newList = [...items];

    const dto = {
      item: {
        description: taskName
      }
    }

    const response = await api.post(`/todos/${params.id}/items`, dto);

    newList.push({
      id: response.data.id,
      description: response.data.description,
      done: false
    });

    toast.success("task added!");

    setItem(newList);
  }

  const handleTaskChange = async (id: number, done: boolean) => {
    const dto = {
      item: {
        done: done
      }
    }

    await api.put(`/todos/${params.id}/items/${id}/done`, dto);

    const updatedTodos = items.map(item => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });

    setItem(updatedTodos);
  }

  const handleClickBack = () => {
    navigate('/')
  }

  return (
    	<C.Container>
        <C.Area>
          <FaArrowCircleLeft size={30} color='white' onClick={() => handleClickBack()}/>
          <C.Header>{todo?.title}</C.Header>

          <AddArea onEnter={handleAddTask} />

          { loading && items.map((item)=>(
            <ListItem
              key={item.id}
              item={item}
              onChange={handleTaskChange}
            />
          ))}

        </C.Area>
      </C.Container>
  );
}

export default TodoPage;