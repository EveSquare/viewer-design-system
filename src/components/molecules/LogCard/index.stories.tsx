import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { LogCard } from "./"

export default {
  title: "Design System/Molecules/LogCard",
  component: LogCard,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof LogCard>



const Template: ComponentStory<typeof LogCard> = (args) => <LogCard {...args} />

export const Default = Template.bind({})

Default.args = {
  title: "Sample01",
  description: "Sample01の説明文です。",
  href: "/",
  tags: [{
    name: "イベント",
    color: "bule",
  }, {
    name: "サンプル",
    color: "red",
  }],
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/eN4ZinhpsyVa3dv6K5KJNl/LogCard?node-id=0%3A1',
  },
}
