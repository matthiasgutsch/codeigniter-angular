export interface Task {
    message: string;
    due_date?: string;
    priority?: string;
    id: string;
    assigned_to?: number;
    taskid?: number;
    assigned_name: string;
  }
  
  export interface User {
    id: string;
    name: string;
    picture: string;
  }
  