import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { MessageArea } from "./"

export default {
  title: "Design System/Organisms/MessageArea",
  component: MessageArea,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof MessageArea>



const Template: ComponentStory<typeof MessageArea> = (args) => <MessageArea {...args} />

export const Default = Template.bind({})

Default.args = {
  isShowing: "show",
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/W6WTLAiy0lUaagdHdUcPci/MessageArea?node-id=0%3A1',
  },
}
