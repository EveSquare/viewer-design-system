import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { MainViewer } from "./"

export default {
    title: "Design System/Pages/MainViewer",
    component: MainViewer,
    decorators: [
        (story: any) => <div>{story()}</div>,
        withDesign,
    ],
    argTypes: {}
} as ComponentMeta<typeof MainViewer>



const Template: ComponentStory<typeof MainViewer> = (args) => <MainViewer {...args} />


export const Default = Template.bind({})

Default.args = {
}

Default.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/y8YYJXzyLQGp66zMNRpgeJ/MainViewer?node-id=0%3A1',
    },
}
