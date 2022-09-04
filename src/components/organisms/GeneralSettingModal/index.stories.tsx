import { Button, useDisclosure } from "@chakra-ui/react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { withDesign } from "storybook-addon-designs"
import { GeneralSettingModal } from "./"

export default {
  title: "Design System/Organisms/GeneralSettingModal",
  component: GeneralSettingModal,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof GeneralSettingModal>



const Template: ComponentStory<typeof GeneralSettingModal> = (args) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = React.useState({
    colorMode: "dark",
    headerVisibility: "show",
    sideBarVisibility: "show",
    characterVisibility: "show",
  });
  return (
    <>
      <Button mt={3} onClick={onOpen}>
        モーダルを開く
      </Button>
      <GeneralSettingModal
        {...args}
        isOpen={isOpen}
        onClose={onClose}
        state={state}
        setState={setState}
      />
    </>
  )
}

export const Default = Template.bind({})

Default.args = {}

Default.parameters = {}
