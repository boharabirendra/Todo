export interface ITodo {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface GetTodoQuery{
  q?: string;
  page?: number;
  size?: number;
}