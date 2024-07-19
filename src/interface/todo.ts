export interface ITodo {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface GetTodoQuery{
  q?: string;
  page?: number;
  size?: number;
}