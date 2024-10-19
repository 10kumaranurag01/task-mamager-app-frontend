interface StatusFilterDropdownProps {
  status: string;
  setStatus: (status: string) => void;
}

const StatusFilterDropdown: React.FC<StatusFilterDropdownProps> = ({
  status,
  setStatus,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };
  return (
    <form className="relative mb-4 mt-3 w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%]">
      <select
        id="status"
        value={status}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleStatusChange}
      >
        <option selected value="">
          Select Status
        </option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </form>
  );
};

export default StatusFilterDropdown;
