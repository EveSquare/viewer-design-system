import { Button } from "@chakra-ui/react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { Live2d } from "./"

export default {
  title: "Design System/Atoms/Live2d",
  component: Live2d,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof Live2d>



const Template: ComponentStory<typeof Live2d> = (args) => {
  function onClickHandler() {
    window.dispatchEvent(new CustomEvent('live2dOnTap', {
      detail: {
        x: 0,
        y: 0,
      }
    }));
  }
  return (
    <>
      <Button
        onClick={onClickHandler}
        m={2}
      >イベント発火</Button>
      <Live2d {...args} />
    </>
  )
}

export const Default = Template.bind({})

Default.args = {
  ModelList: ['unitychan'],
}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
