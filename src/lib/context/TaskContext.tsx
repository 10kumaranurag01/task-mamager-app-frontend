import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

type TaskType = {
  id: string;
  title: string;
  description: string;
  status: string;
};

type TaskContextType = {
  tasks: TaskType[];
  fetchTasks: () => void;
  emptyTasks: () => void;
};

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  fetchTasks: () => {},
  emptyTasks: () => {},
});

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { isUserAuthenticated } = useAuth();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "/server/task_manager_app_function/tasks/all"
      );
      setTasks(response.data.data.taskItems);
    } catch (err: any) {
      console.log(err.response);
    } finally {
    }
  };

  useEffect(() => {
    if (!isUserAuthenticated) return;

    fetchTasks();
  }, [isUserAuthenticated]);

  const emptyTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, emptyTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
