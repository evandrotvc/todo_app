import * as C from './styles';
import { Todo } from '../../types/todo';
import {useNavigate} from 'react-router-dom'

type Props = {
  item: Todo
}

export const ListTodo = ({ item }: Props) => {
    const navigate = useNavigate()

    const handleClick = (id: number) => {
        navigate(`/todos/${id}`)
    }

    return (
        <C.Container onClick={() => handleClick(item.id)}>
            <label>{item.title}</label>
        </C.Container>
    );
}