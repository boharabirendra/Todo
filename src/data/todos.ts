import { ITodo } from "../interface/todo";

export const todos: ITodo[] = [
  {
    id: "1",
    userId: "101",
    title: "Buy groceries",
    description: "Buy milk, bread, and eggs from the supermarket.",
    completed: false,
    created_at: new Date("2024-01-01T09:00:00Z"),
    updated_at: new Date("2024-01-01T09:00:00Z"),
  },
  {
    id: "2",
    userId: "102",
    title: "Finish project report",
    description:
      "Complete the final report for the project and submit it to the manager.",
    completed: true,
    created_at: new Date("2024-01-02T10:30:00Z"),
    updated_at: new Date("2024-01-03T14:00:00Z"),
  },
];
