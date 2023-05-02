import * as C from './styles';
import { Item } from '../../types/Item';
import { Todo } from '../../types/todo';

type Props = {
  item: Todo
}

export const ListTodo = ({ item }: Props) => {
    return (
        <C.Container>
            <label>{item.title}</label>
        </C.Container>
    );
}