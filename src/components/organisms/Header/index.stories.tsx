import { headerInfo } from "@/factories/headerInfoFactory"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { Header } from "./"

export default {
  title: "Design System/Organisms/Header",
  component: Header,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof Header>



const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Default = Template.bind({})

Default.args = {
  ...headerInfo
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/adTjZbOjszx5sV4rhcMKq2/Header?node-id=0%3A1',
  },
}
