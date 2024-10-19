import { AnimatePresence } from "framer-motion";
import { useTasks } from "../../lib/context/TaskContext";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";
import StatusFilterDropdown from "../StatusFilterDropdown";

const TaskList = () => {
  const { tasks } = useTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearchTerm = task.title
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
    const matchesStatus = status ? task.status === status : true;

    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col md:flex-row justify-start md:items-center md:gap-2">
        <div className="relative mb-4 mt-3 w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%]">
          <input
            type="text"
            placeholder="Search Todos..."
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-black w-full h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <StatusFilterDropdown status={status} setStatus={setStatus} />
      </div>

      <AnimatePresence>
        {filteredTasks.map((t) => (
          <TaskItem id={t.id} key={t.id} status={t.status}>
            {t.title}
            <div className="text-sm text-gray-500">{t.description}</div>
          </TaskItem>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
