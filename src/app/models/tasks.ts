export interface Task {
    message: string;
    title: string;
    due_date?: string;
    priority?: string;
    assigned_to?: number;
    taskid?: number;
    user_id?: number;
    id: number;
    assigned_name: string;
  }
  
  export interface User {
    id: string;
    name: string;
    picture: string;
  }
  