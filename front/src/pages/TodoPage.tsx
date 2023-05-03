
import * as C from '../App.styles';
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { Item } from '../types/Item';
import { ListItem } from '../components/ListItem';
import { AddArea } from '../components/AddArea';
import api from '../services/index'
import { useNavigate, useParams } from 'react-router-dom';
import {FaArrowCircleLeft} from 'react-icons/fa'
import { addTaskRequest, changeTaskRequest, RemoveTaskRequest } from '../services/apiService';

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

    const data = await addTaskRequest(params.id, taskName)

    newList.push({
      id: data.id,
      description: data.description,
      done: false
    });

    setItem(newList);
  }

  const handleTaskChange = async (id: number, done: boolean) => {
    await changeTaskRequest(params.id, id, done)

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

  const handleClickRemove = async (id: number) => {
    await RemoveTaskRequest(params.id, id)

    const updatedTodos = items.filter(item => item.id !== id );

    setItem(updatedTodos);
  }

  return (
    	<C.Container>
        <C.Area>
          <C.IconBack>
            <FaArrowCircleLeft size={30}
            onClick={() => handleClickBack()}
            color={'white'}
          />
          </C.IconBack>
          <C.Header>{todo?.title}</C.Header>

          <AddArea onEnter={handleAddTask} />

          { loading && items.sort((a, b) => a.id - b.id).map((item)=>(
            <ListItem
              key={item.id}
              item={item}
              onChange={handleTaskChange}
              onClick={handleClickRemove}
            />
          ))}

        </C.Area>
      </C.Container>
  );
}

export default TodoPage;