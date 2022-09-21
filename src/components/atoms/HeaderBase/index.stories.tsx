import { Logo } from "@/components/organisms/Logo"
import { Box } from "@chakra-ui/react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { HeaderBase } from "./"

export default {
  title: "Design System/Atoms/HeaderBase",
  component: HeaderBase,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof HeaderBase>



const Template: ComponentStory<typeof HeaderBase> = (args) => <HeaderBase {...args} />

export const Default = Template.bind({})

function LogoComponent() {
  return (
    <Box m={2}><Logo /></Box>
  )
}

Default.args = {
  children: <LogoComponent />,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
