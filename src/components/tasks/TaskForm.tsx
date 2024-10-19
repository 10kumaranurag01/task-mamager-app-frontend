import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useTasks } from "../../lib/context/TaskContext";
import axios from "axios";
import { useTaskForm } from "../../lib/context/TaskFormContext";
import Loader from "../../icons/Loader";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchTasks } = useTasks();
  const { formVisible, setFormVisible, editTaskId, setEditTaskId } =
    useTaskForm();

  const subnitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editTaskId) {
      try {
        await axios.put(
          `/server/task_manager_app_function/tasks/edit/${editTaskId}`,
          {
            title,
            description,
          }
        );
        setFormVisible(false);
        setTitle("");
        setDescription("");
        setEditTaskId(null);
      } catch (err: any) {
        console.log(err.response);
      } finally {
        setIsSubmitting(false);
        fetchTasks();
      }
    } else {
      try {
        await axios.post("/server/task_manager_app_function/tasks/add", {
          title,
          description,
        });
        setFormVisible(false);
        setTitle("");
        setDescription("");
      } catch (err: any) {
        console.log(err.response);
      } finally {
        setIsSubmitting(false);
        fetchTasks();
      }
    }
  };

  const saveTaskHandler = () => {
    setFormVisible((pv: boolean) => !pv);
    setTitle("");
    setDescription("");
    setEditTaskId(null);
  };

  useEffect(() => {
    const setTask = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/server/task_manager_app_function/tasks/${editTaskId}`
        );
        setTitle(response.data.data.taskItem.title);
        setDescription(response.data.data.taskItem.description);
      } catch (err: any) {
        console.log(err.response);
      } finally {
        setLoading(false);
      }
    };

    if (editTaskId) {
      setTask();
    }
  }, [editTaskId]);

  return (
    <div className="fixed bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
      <AnimatePresence>
        {formVisible && (
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            onSubmit={(e) => {
              subnitHandler(e);
            }}
            className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
          >
            {loading ? (
              <div className="flex justify-center h-auto">
                <Loader />
              </div>
            ) : (
              <>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What do you need to do?"
                  className="h-18 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="h-18 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5"></div>
                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-blue-500"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </motion.form>
        )}
      </AnimatePresence>
      <button
        onClick={saveTaskHandler}
        type="button"
        className="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900"
        title="Save Task"
      >
        <FiPlus
          className={`transition-transform ${
            formVisible ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
};

export default TaskForm;
