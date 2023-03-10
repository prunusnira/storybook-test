import Task from "./task";
import { observer } from "mobx-react";
import store from "../mobx/store";

const TaskList = observer(() => {
    const { tasks, status, updateTaskState, addNewTask } = store;

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

    if (status === "loading") {
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

    if (tasks.length === 0) {
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
});

export default TaskList;
