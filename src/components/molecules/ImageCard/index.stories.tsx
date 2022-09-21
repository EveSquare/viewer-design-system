import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { ImageCard } from "./"

export default {
  title: "Design System/Molecules/ImageCard",
  component: ImageCard,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof ImageCard>



const Template: ComponentStory<typeof ImageCard> = (args) => <ImageCard {...args} />

export const Default = Template.bind({})

Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
