import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface TaskFormContextProps {
  formVisible: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editTaskId: string | null;
  setEditTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TaskFormContext = createContext<TaskFormContextProps>({
  formVisible: false,
  setFormVisible: () => {},
  editTaskId: null,
  setEditTaskId: () => {},
});

export const TaskFormProvider = ({ children }: { children: ReactNode }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  return (
    <TaskFormContext.Provider
      value={{ formVisible, setFormVisible, editTaskId, setEditTaskId }}
    >
      {children}
    </TaskFormContext.Provider>
  );
};

export const useTaskForm = () => useContext(TaskFormContext);
