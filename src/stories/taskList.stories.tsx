import TaskList from "../components/taskList";
import {ComponentMeta, Story} from "@storybook/react";
import React, {useEffect} from "react";
import {RecoilRoot} from "recoil";
import {TaskType} from "../components/taskType";
import {useTaskUpdate} from "../store/task";

const mockedTasks: Array<TaskType> = [
    { id: 1, title: "Task 1", state: "TASK_INBOX" },
    { id: 2, title: "Task 2", state: "TASK_INBOX" },
    { id: 3, title: "Task 3", state: "TASK_INBOX" },
    { id: 4, title: "Task 4", state: "TASK_INBOX" },
    { id: 5, title: "Task 5", state: "TASK_INBOX" },
    { id: 6, title: "Task 6", state: "TASK_INBOX" },
];

type Props = {
    tasks: Array<TaskType>,
    status: string;
    error: string;
    isLoading: boolean;
}
const MockedComponent = (props: Props) => {
    // const {changeTaskList, updateStatus, updateError, updateLoading} = useTaskUpdate();
    const {updateProps} = useTaskUpdate()
    useEffect(() => {
        // console.log(props.tasks)
        // changeTaskList(props.tasks)
        // updateStatus(props.status);
        // updateError(props.error);
        // updateLoading(props.isLoading);
        updateProps(props)
    }, [])
    return <TaskList />
}

const meta: ComponentMeta<typeof MockedComponent> = {
    title: "TaskList",
    component: MockedComponent,
    decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>]
};
export default meta;

const Template: Story<Props> = (props: Props) => <MockedComponent {...props} />

export const Default = Template.bind({});
Default.args = {
    tasks: [...mockedTasks],
    isLoading: false,
    status: 'idle',
    error: 'null',
}

export const WithArchivedTasks = Template.bind({});
WithArchivedTasks.args = {
    // Shaping the stories through args composition.
    // Inherited data coming from the Default story.
    ...Default.args,
    tasks: [
        ...mockedTasks.slice(0, 5),
        { id: 6, title: "Task 6 (archived)", state: "TASK_ARCHIVED" },
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    ...Default.args,
    status: "loading",
    isLoading: true,
};

export const Empty = Template.bind({});
Empty.args = {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Default.args,
    tasks: [],
    status: "empty",
};
