import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { Title } from "./"

export default {
  title: "Design System/Atoms/Title",
  component: Title,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof Title>



const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />

export const Default = Template.bind({})

Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
