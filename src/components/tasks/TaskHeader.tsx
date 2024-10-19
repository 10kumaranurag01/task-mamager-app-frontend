type TaskHeaderProps = {
  firstName: string;
  lastName: string;
};

const TaskHeader = ({ firstName, lastName }: TaskHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-medium text-white">
        Hello!, {firstName} {lastName}
      </h1>
      <p className="text-zinc-400">Let's see what we've got to do today.</p>
    </div>
  );
};

export default TaskHeader;
