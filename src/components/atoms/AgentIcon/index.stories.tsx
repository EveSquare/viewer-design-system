import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { AgentIcon } from "./"

export default {
  title: "Design System/Atoms/AgentIcon",
  component: AgentIcon,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof AgentIcon>



const Template: ComponentStory<typeof AgentIcon> = (args) => <AgentIcon {...args} />

export const Civilian = Template.bind({})

Civilian.args = {
  agentType: "civilian",
}

Civilian.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/touQFcZrIeeksOOHUA10wb/%E7%84%A1%E9%A1%8C?node-id=0%3A1',
  },
}

export const Ambulance = Template.bind({})

Ambulance.args = {
  agentType: "ambulance",
}

Ambulance.parameters = {
  ...Civilian.parameters
}

export const Fire = Template.bind({})

Fire.args = {
  agentType: "fire",
}

Fire.parameters = {
  ...Civilian.parameters
}

export const Police = Template.bind({})

Police.args = {
  agentType: "police",
}

Police.parameters = {
  ...Civilian.parameters
}