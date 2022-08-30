import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { LinkCard } from "./"

export default {
  title: "Design System/Molecules/LinkCard",
  component: LinkCard,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof LinkCard>



const Template: ComponentStory<typeof LinkCard> = (args) => <LinkCard {...args} />

export const Default = Template.bind({})

Default.args = {
  prependIcon: < QuestionOutlineIcon w={5} h={5} />,
  title: "RRSとは",
  href: "#",
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hYYLPkVokeOD9BTGSnyDbu/LinkCard?node-id=0%3A1',
  },
}
