import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { Section } from "./"

export default {
  title: "Design System/Atoms/Section",
  component: Section,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof Section>



const Template: ComponentStory<typeof Section> = (args) => <Section {...args} />

export const Default = Template.bind({})

Default.args = {
  text: "RRSとは",
  href: "#"
}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
