import { useAnimate, usePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { useTasks } from "../../lib/context/TaskContext";
import { useTaskForm } from "../../lib/context/TaskFormContext";

type TaskItemType = {
  id: string;
  children: React.ReactNode;
  status: string;
};

const TaskItem = ({ id, children, status }: TaskItemType) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();
  const [checked, setChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { fetchTasks } = useTasks();
  const { setEditTaskId, setFormVisible } = useTaskForm();

  useEffect(() => {
    setChecked(status === "completed");
  }, [status]);

  const handleCheck = async (id: string) => {
    setChecked((prev) => !prev);
    setIsEditing(true);
    let updatedStatus: string;

    if (!checked) {
      updatedStatus = "completed";
    } else {
      updatedStatus = "pending";
    }

    try {
      await axios.put(`/server/task_manager_app_function/tasks/edit/${id}`, {
        status: updatedStatus,
      });
    } catch (err: any) {
      console.log(err.response);
    } finally {
      setIsEditing(false);
      fetchTasks();
    }
  };

  const removeElement = async (id: string) => {
    try {
      await axios.delete(`/server/task_manager_app_function/tasks/${id}`);
    } catch (err: any) {
      console.log(err.response);
    } finally {
      fetchTasks();
    }
  };

  const editElement = (id: string) => {
    setEditTaskId(id);
    setFormVisible(true);
  };

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        if (scope.current) {
          await animate(
            "div",
            {
              color: checked ? "#6ee7b7" : "#fca5a5",
            },
            {
              ease: "easeIn",
              duration: 0.125,
            }
          );

          await animate(
            scope.current,
            {
              scale: 1.025,
            },
            {
              ease: "easeIn",
              duration: 0.125,
            }
          );

          await animate(
            scope.current,
            {
              opacity: 0,
              x: checked ? 24 : -24,
            },
            {
              delay: 0.75,
            }
          );
        }
        safeToRemove();
      };

      exitAnimation();
    }
  }, [animate, checked, isPresent, safeToRemove, scope]);

  return (
    <motion.div
      ref={scope}
      layout
      className="relative flex w-full items-center gap-3 rounded border border-zinc-700 bg-zinc-900 p-3"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck(id)}
        className="size-4 accent-blue-600"
        title="Mark as completed"
        disabled={isEditing}
      />

      <div
        className={`text-white transition-colors ${checked && "text-zinc-400"}`}
      >
        {children}
      </div>
      <div className="ml-auto flex gap-1.5">
        <button
          onClick={() => editElement(id)}
          type="button"
          className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-sm text-zinc-400"
          title="Edit task"
          disabled={isEditing}
        >
          <FaRegEdit />
        </button>
        <button
          onClick={() => removeElement(id)}
          type="button"
          className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
          title="Remove task"
          disabled={isEditing}
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
