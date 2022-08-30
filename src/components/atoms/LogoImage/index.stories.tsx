import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { LogoImage } from "./"

export default {
  title: "Design System/Atoms/LogoImage",
  component: LogoImage,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof LogoImage>



const Template: ComponentStory<typeof LogoImage> = (args) => <LogoImage {...args} />

export const Default = Template.bind({})

Default.args = {}

Default.args = {
  width: 212,
  height: 100,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ONu7luPtlNwFjg2NcfS1Zd/ROGO?node-id=1%3A2',
  },
}