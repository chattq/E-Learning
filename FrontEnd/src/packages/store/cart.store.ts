import { atom } from "jotai";
interface ICart {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export const cartAtom = atom<ICart[]>([]);
