import Task from "./task";
import TaskType from "./taskType";

type Props = {
    tasks: Array<TaskType>;
    loading: boolean;
};

const TaskList = ({ tasks, loading }: Props) => {
    return (
        <>
            {loading && `Loading...`}
            {!loading && tasks.length === 0 && `List is Empty`}
            {tasks.map((t, i) => (
                <Task
                    key={`task${i}`}
                    task={t}
                    onArchiveTask={() => {}}
                    onPinTask={() => {}}
                />
            ))}
        </>
    );
};

export default TaskList;
