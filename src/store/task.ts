import {TaskType, TaskListType} from "../components/taskType";
import {atom, useRecoilState} from "recoil";
import {ComponentProps} from "react";

const defaultTasks: Array<TaskType> = [
    // { id: 1, title: 'Something', state: 'TASK_INBOX' },
    // { id: 2, title: 'Something more', state: 'TASK_INBOX' },
    // { id: 3, title: 'Something else', state: 'TASK_INBOX' },
    // { id: 4, title: 'Something again', state: 'TASK_INBOX' },
]

const taskBox: TaskListType = {
    tasks: defaultTasks,
    status: 'idle',
    error: 'null',
    isLoading: false,
}

export const taskListState = atom<TaskListType>({
    key: 'task',
    default: taskBox
});

export const useTaskUpdate = () => {
    const [taskList, setTaskList] = useRecoilState<TaskListType>(taskListState);

    const addNewTask = (newTask: TaskType) => {
        setTaskList({
            ...taskList,
            tasks: [...taskList.tasks, newTask]
        });
    }

    const removeTask = (idx: number) => {
        setTaskList({
            ...taskList,
            tasks: taskList.tasks.splice(idx, 1)
        })
    }

    const updateTaskState = (idx: number, state: string) => {
        const task = taskList.tasks[idx];
        task.state = state;
        setTaskList({
            ...taskList,
            tasks: [
                ...taskList.tasks.slice(0, idx),
                task,
                ...taskList.tasks.slice(idx+1, taskList.tasks.length)
            ]
        })
    }

    const changeTaskList = (newList: Array<TaskType>) => {
        console.log(taskList, newList)
        setTaskList({
            ...taskList,
            tasks: [...newList]
        })
    }

    const updateStatus = (status: string) => {
        setTaskList({
            ...taskList,
            status
        })
    }

    const updateError = (error: string) => {
        setTaskList({
            ...taskList,
            error
        })
    }

    const updateLoading = (loading: boolean) => {
        setTaskList({
            ...taskList,
            isLoading: loading
        })
    }

    const updateProps = (props: TaskListType) => {
        setTaskList(props)
    }

    return {
        addNewTask,
        removeTask,
        updateTaskState,
        changeTaskList,
        updateStatus,
        updateError,
        updateLoading,
        updateProps
    }
}