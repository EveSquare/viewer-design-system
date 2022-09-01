import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { Live2d } from "./"

export default {
  title: "Design System/Atoms/Live2d",
  component: Live2d,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof Live2d>



const Template: ComponentStory<typeof Live2d> = (args) => <Live2d {...args} />

export const Default = Template.bind({})

Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
