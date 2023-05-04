
import * as C from '../App.styles';
import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { AddArea } from '../components/AddArea';
import { ListTodo } from '../components/ListTodos';
import { getTodosRequest, addTodoRequest } from '../services/apiService';

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect( () => {
    async function getItems(){
      const listTodos = await getTodosRequest();

      setTodos(listTodos.todos)
      setLoading(true)
    }

    getItems()
  }, [])

  const handleAddTask = async (todoName: string) => {
    let newList = [...todos];

    const todo = await addTodoRequest(todoName);

    newList.push({
      id: todo.id,
      title: todo.title,
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