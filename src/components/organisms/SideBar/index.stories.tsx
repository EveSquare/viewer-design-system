import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { SideBar } from "./"
import { agentDatas } from "@/factories/agentDatasFactory";
import { linkDatas } from "@/factories/linkDatasFactory";

export default {
  title: "Design System/Organisms/SideBar",
  component: SideBar,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof SideBar>

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />

export const Default = Template.bind({})

Default.args = {
  agentDatas: agentDatas,
  linkDatas: linkDatas,
  isShowing: "show",
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/y8YYJXzyLQGp66zMNRpgeJ/%E7%84%A1%E9%A1%8C?node-id=1%3A2',
  },
}
