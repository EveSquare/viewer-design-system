import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { AnchorLinkList } from "./"
import { Props } from "@/components/atoms/PageLink/type"

export default {
  title: "Design System/Organisms/AnchorLinkList",
  component: AnchorLinkList,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof AnchorLinkList>



const Template: ComponentStory<typeof AnchorLinkList> = (args) => <AnchorLinkList {...args} />

export const Default = Template.bind({})

const links: Array<Props> = [
  {
    href: "#",
    title: "test1"
  },
  {
    href: "#",
    title: "test2"
  },
  {
    href: "#",
    title: "test3"
  },
]

Default.args = {
  links: links
}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
