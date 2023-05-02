
import * as C from '../App.styles';
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { AddArea } from '../components/AddArea';
import api from '../services/index'
import { ListTodo } from '../components/ListTodos';

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect( () => {
    async function getItems(){
      const response = await api.get(`/todos`);

      setTodos(response.data.todos)
      setLoading(true)
    }

    getItems()
  }, [])

  const handleAddTask = async (todoName: string) => {
    let newList = [...todos];

    const dto = {
      todo: {
        title: todoName
      }
    }

    const response = await api.post(`/todos`, dto);

    newList.push({
      id: response.data.id,
      title: response.data.title,
      items: []
    });

    setTodos(newList);
  }

  return (
    	<C.Container>
        <C.Area>
          <C.Header>Lista de TOdos</C.Header>

          <AddArea onEnter={handleAddTask} />
          <>
          { loading && todos.map((todo)=>(
            <ListTodo
              key={todo.id}
              item={todo}
            />
          ))}
          </>

        </C.Area>
      </C.Container>
  );
}

export default Home;