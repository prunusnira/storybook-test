import Task from "./task";
import {taskListState, useTaskUpdate} from "../store/task";
import {useRecoilState} from "recoil";

type Props = {}

const TaskList = (props: Props) => {
    const {updateTaskState} = useTaskUpdate()
    const [taskList] = useRecoilState(taskListState)
    const {tasks, isLoading} = taskList;

    const pinTask = (value: number) => {
        updateTaskState(value, "TASK_PINNED");
    };

    const archiveTask = (value: number) => {
        updateTaskState(value, "TASK_ARCHIVED");
    };

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );

    if (isLoading) {
        return (
            <div className="list-items" data-testid="loading" key={"loading"}>
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        );
    }
    else if (tasks.length === 0) {
        return (
            <div className="list-items" key={"empty"} data-testid="empty">
                <div className="wrapper-message">
                    <span className="icon-check" />
                    <div className="title-message">You have no tasks</div>
                    <div className="subtitle-message">Sit back and relax</div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="list-items" data-testid="success" key={"success"}>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onPinTask={(task) => pinTask(task)}
                        onArchiveTask={(task) => archiveTask(task)}
                    />
                ))}
            </div>
        );
    }
};

export default TaskList;
