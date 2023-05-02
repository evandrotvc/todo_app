import { Item } from "./Item";

export type Todo = {
    id: number;
    title: string;
    items: Item[];
}