import { action } from "@storybook/addon-actions"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { withDesign } from "storybook-addon-designs"
import { SliderKit } from "./"

export default {
  title: "Design System/Organisms/SliderKit",
  component: SliderKit,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof SliderKit>



const Template: ComponentStory<typeof SliderKit> = (args) => {
  const [value, setValue] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <>
      <SliderKit {...args}
        value={value}
        isPlaying={isPlaying}
        onChange={(v) => setValue(v)}
        onClickPlayButton={() => setIsPlaying(!isPlaying)}
      />
    </>
  )
}

export const Default = Template.bind({})

Default.args = {
  max: 100,
  isDisabled: false,
  isShowing: "show",
  onChangeEnd: action("スライダーの選択が外されました"),
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/o7yfzbsUDC5opY59UovfFD/Slider?node-id=0%3A1',
  },
}
