import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Todo } from './types/todo';
import { Item } from './types/Item';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';
import axios from 'axios'

const App = () => {
  const [todo, setTodo] = useState<Todo>();
  const [items, setItem] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect( () => {
    async function getItems(){
      const response = await axios.get(`http://localhost:3000/todos/1`);
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

    const response = await axios.post(`http://localhost:3000/todos/1/items`, dto);

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

    const response = await axios.put(`http://localhost:3000/todos/1/items/${id}/done`, dto);

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

export default App;