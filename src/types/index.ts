export type BaseEntity = {
  id: string;
  createdAt: number;
};

export interface FireStoreResponseItem<T> {
  name: string;
  createdAt: number;
  updatedAt: number;
  fields: T;
}

export interface FireStoreResponseList<T> {
  documents: FireStoreResponseItem<T>[];
}
