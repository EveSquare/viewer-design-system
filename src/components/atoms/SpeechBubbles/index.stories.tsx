import { Box, Button, FormControl, Input } from "@chakra-ui/react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
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

  const [text, setText] = useState("　");
  const [priority, setPriority] = useState(0);

  function onClickHandler() {
    const dt = new Date();
    dt.setHours(dt.getHours() + 1);
    const timeLimit_at = dt;

    const message = {
      text: text,
      priority: priority,
      created_at: new Date(),
      updated_at: new Date(),
      timeLimit_at: timeLimit_at,
      position: { x: 0, y: 0 },
    }

    window.dispatchEvent(new CustomEvent('speechMessage', {
      detail: message
    }))
  }

  return (
    <>
      <SpeechBubbles {...args} isDebug={true} />
      <Box m={5}></Box>
      <FormControl>
        <Input placeholder='テキスト' value={text} onChange={(event) => setText(event.target.value)} />
        <Input placeholder='優先度' value={priority} onChange={(event => setPriority(Number(event.target.value)))} min={0} max={3} />
        <Button onClick={onClickHandler}>送信</Button>
      </FormControl>
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
