import * as C from './styles';
import { Item } from '../../types/Item';
import {FaTimesCircle} from 'react-icons/fa'

type Props = {
    item: Item,
    onChange: (id: number, done: boolean) => void
    onClick: (id: number) => void
}

export const ListItem = ({ item, onChange, onClick }: Props) => {
    return (
        <C.Container done={item.done}>
            <C.ContainerLabel>
            <input
                type="checkbox"
                checked={item.done}
                onChange={e => onChange(item.id, e.target.checked)}
            />
            <label>{item.description}</label>
            </C.ContainerLabel>

            <FaTimesCircle
                onClick={e => onClick(item.id)}
            />
            
        </C.Container>
    );
}