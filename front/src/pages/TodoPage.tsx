
import * as C from '../App.styles';
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { Item } from '../types/Item';
import { ListItem } from '../components/ListItem';
import { AddArea } from '../components/AddArea';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const TodoPage = () => {
  const [todo, setTodo] = useState<Todo>();
  const [items, setItem] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams()

  useEffect( () => {
    async function getItems(){
      const response = await axios.get(`http://localhost:3000/todos/${params.id}`);
      debugger
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

    const response = await axios.post(`http://localhost:3000/todos/${params.id}/items`, dto);

    newList.push({
      id: response.data.id,
      description: response.data.description,
      done: false
    });

    setItem(newList);
  }

  const handleTaskChange = async (id: number, done: boolean) => {
    let newList = [...items];

    const dto = {
      item: {
        done: done
      }
    }

    const response = await axios.put(`http://localhost:3000/todos/${params.id}/items/${id}/done`, dto);

    newList.find(item => {
      if (item.id === id){
        item.done = done;
      }
      return item;
    })

    setItem(newList);
  }

  return (
    	<C.Container>
        <C.Area>
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