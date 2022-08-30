import { Button } from "@chakra-ui/react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { SpeechBubbles } from "./"

export default {
  title: "Design System/Atoms/SpeechBubbles",
  component: SpeechBubbles,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof SpeechBubbles>



const Template: ComponentStory<typeof SpeechBubbles> = (args) => {
  function onClickHandler() {
    window.dispatchEvent(new CustomEvent('speechMessage', {
      detail: {
        message: String(new Date().getTime())
      }
    }))
  }
  return (
    <>
      <Button
        onClick={onClickHandler}
        m={2}
      >イベント発火
      </Button>
      <SpeechBubbles {...args} />
    </>
  )
}

export const Default = Template.bind({})

Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/W6WTLAiy0lUaagdHdUcPci/MessageArea?node-id=0%3A1',
  },
}
