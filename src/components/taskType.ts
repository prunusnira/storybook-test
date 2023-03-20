export type TaskType = {
    id: number;
    title: string;
    state: string;
};

export type TaskListType = {
    tasks: Array<TaskType>,
    isLoading: boolean,
    status: string,
    error: string,
};
