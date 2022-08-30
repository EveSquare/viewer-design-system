import { Center } from "@chakra-ui/react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { Card } from "./"

export default {
  title: "Design System/Atoms/Card",
  component: Card,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof Card>



const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Default = Template.bind({})

const SampleComponent = () => {
  return (
    <Center p={3}>
      test
    </Center>
  );
}

Default.args = {
  children: <SampleComponent />,
}
