import React from "react";

import TaskList from "./taskList";
import * as TaskStories from "./task.stories";
import { Meta, Story } from "@storybook/react";

type TaskListProps = React.ComponentProps<typeof TaskList>;

export default {
    component: TaskList,
    title: "TaskList",
    decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
} as Meta<typeof TaskList>;

const Template: Story<TaskListProps> = (args) => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
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
    loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Loading.args,
    loading: false,
};
