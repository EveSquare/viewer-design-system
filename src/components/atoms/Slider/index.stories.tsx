import { action } from "@storybook/addon-actions"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { withDesign } from "storybook-addon-designs"
import { Slider } from "./"

export default {
  title: "Design System/Atoms/Slider",
  component: Slider,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof Slider>



const Template: ComponentStory<typeof Slider> = (args) => {
  const [value, setValue] = React.useState(0);
  function customSetValueWrapper(value: number) {
    setValue(value);
    action('値が変更されました')(value);
  }
  return (
    <Slider
      {...args}
      value={value}
      onChange={(v) => customSetValueWrapper(v)}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  min: 0,
  max: 100,
  isDisabled: false,
  onChangeEnd: action("スライダーの選択が外されました"),
}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
