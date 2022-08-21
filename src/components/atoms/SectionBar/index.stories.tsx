import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { SectionBar } from "./"

export default {
  title: "Design System/Atoms/SectionBar",
  component: SectionBar,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof SectionBar>



const Template: ComponentStory<typeof SectionBar> = (args) => <SectionBar {...args} />

export const Default = Template.bind({})

Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
