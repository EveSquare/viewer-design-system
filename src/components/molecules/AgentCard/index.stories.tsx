import { ComponentMeta, ComponentStory } from "@storybook/react"
import { action } from '@storybook/addon-actions';
import { withDesign } from "storybook-addon-designs"
import { AgentCard } from "./"

export default {
  title: "Design System/Molecules/AgentCard",
  component: AgentCard,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof AgentCard>



const Template: ComponentStory<typeof AgentCard> = (args) => <AgentCard {...args} />

export const Civilian = Template.bind({})

Civilian.args = {
  agentType: 'civilian',
  title: '市民',
  description: '市民の説明...',
  onClick: action('clicked')
}

Civilian.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/touQFcZrIeeksOOHUA10wb/%E7%84%A1%E9%A1%8C?node-id=0%3A1',
  },
}
