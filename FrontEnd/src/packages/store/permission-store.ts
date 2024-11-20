import { atom } from "jotai";

interface IProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  active: string;
  bio: string;
  website: string;
  verify: string;
}

export const profileStoreAtom = atom<IProfile | unknown>({});
