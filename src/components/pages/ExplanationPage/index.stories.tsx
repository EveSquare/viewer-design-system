import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { ExplanationPage } from "./"

export default {
  title: "Design System/Pages/ExplanationPage",
  component: ExplanationPage,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof ExplanationPage>



const Template: ComponentStory<typeof ExplanationPage> = (args) => <ExplanationPage {...args} />

export const Default = Template.bind({})

Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/L7PtXUsLHUMheEJRF9DXJC/explanationPage?node-id=0%3A1',
  },
}
