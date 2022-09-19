import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { PageLink } from "./"

export default {
  title: "Design System/Atoms/PageLink",
  component: PageLink,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof PageLink>



const Template: ComponentStory<typeof PageLink> = (args) => <PageLink {...args} />

export const Default = Template.bind({})

Default.args = {
  href: "#",
  title: "サンプル",
}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
