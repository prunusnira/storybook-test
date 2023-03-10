import TaskList from "./taskList";
import * as TaskStories from "./task.stories";
import { Meta, Story } from "@storybook/react";
import TaskType from "./taskType";
import { makeAutoObservable, observable } from "mobx";

const MockedMobXStore = {
    // Shaping the stories through args composition.
    // The data was inherited from the Default story in Task.stories.js.
    tasks: [
        { ...TaskStories.Default.args!.task!, id: 1, title: "Task 1" },
        { ...TaskStories.Default.args!.task!, id: 2, title: "Task 2" },
        { ...TaskStories.Default.args!.task!, id: 3, title: "Task 3" },
        { ...TaskStories.Default.args!.task!, id: 4, title: "Task 4" },
        { ...TaskStories.Default.args!.task!, id: 5, title: "Task 5" },
        { ...TaskStories.Default.args!.task!, id: 6, title: "Task 6" },
    ],
    status: "idle",
    error: "null",
};

const mockedStore = observable(MockedMobXStore);

// class MockedTaskBoxClass {
//     tasks: Array<TaskType> = MockedMobXStore.tasks;
//     status: string = "idle";
//     error: string = "";

//     constructor() {
//         makeAutoObservable(this);
//     }

//     updateTaskState = (id: number, newTaskStatus: string) => {
//         const task = this.tasks.findIndex((task) => task.id === id);
//         if (task >= 0) {
//             this.tasks[task].state = newTaskStatus;
//         }
//     };
//     addNewTask = (newTask: string) => {
//         this.tasks.push({
//             id: this.tasks.length + 1,
//             title: newTask,
//             state: "TASK_INBOX",
//         });
//     };
// }

// const taskBoxStore = new MockedTaskBoxClass();
const { tasks, status, error } = mockedStore;

export default {
    component: TaskList,
    title: "TaskList",
    decorators: [
        // (story: Story) => <div style={{ padding: "3rem" }}>{story()}</div>,
    ],
};

const Template: Story = () => <TaskList />;

export const Default = Template.bind({});
Default.args = {
    tasks: [...tasks],
};

export const WithArchivedTasks = Template.bind({});
WithArchivedTasks.args = {
    // Shaping the stories through args composition.
    // Inherited data coming from the Default story.
    tasks: [
        ...Default.args!.tasks!.slice(0, 5),
        { id: 6, title: "Task 6 (archived)", state: "TASK_ARCHIVED" },
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    tasks: [],
    status: "loading",
};

export const Empty = Template.bind({});
Empty.args = {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Loading.args,
    status: "empty",
};
