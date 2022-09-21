import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { IconText } from "./"
import { RiPoliceCarLine } from 'react-icons/ri';

export default {
  title: "Design System/Atoms/IconText",
  component: IconText,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof IconText>



const Template: ComponentStory<typeof IconText> = (args) => <IconText {...args} />

export const Default = Template.bind({})

Default.args = {
  icon: RiPoliceCarLine,
  text: 'テキスト',
  iconSize: '22px',
  fontSize: 'md',
  textMarginLeft: '6px',
}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
