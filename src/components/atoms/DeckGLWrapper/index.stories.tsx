import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { DeckGLWrapper } from "./"

export default {
  title: "Design System/Atoms/DeckGLWrapper",
  component: DeckGLWrapper,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof DeckGLWrapper>



const Template: ComponentStory<typeof DeckGLWrapper> = (args) => <DeckGLWrapper {...args} />

export const Default = Template.bind({})

Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
