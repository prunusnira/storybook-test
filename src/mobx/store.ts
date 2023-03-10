import { makeAutoObservable } from "mobx";
import TaskType from "../components/taskType";

const defaultTasks: Array<TaskType> = [
    { id: 1, title: "Something", state: "TASK_INBOX" },
    { id: 2, title: "Something more", state: "TASK_INBOX" },
    { id: 3, title: "Something else", state: "TASK_INBOX" },
    { id: 4, title: "Something again", state: "TASK_INBOX" },
];

class TaskBox {
    tasks: Array<TaskType> = defaultTasks;
    status: string = "idle";
    error: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    updateTaskState = (id: number, newTaskStatus: string) => {
        const task = this.tasks.findIndex((task) => task.id === id);
        if (task >= 0) {
            this.tasks[task].state = newTaskStatus;
        }
    };
    addNewTask = (newTask: string) => {
        this.tasks.push({
            id: this.tasks.length + 1,
            title: newTask,
            state: "TASK_INBOX",
        });
    };
}

const taskBoxStore = new TaskBox();
export default taskBoxStore;
