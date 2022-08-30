import { Button, useDisclosure } from "@chakra-ui/react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { ExplanationModal } from "./"

export default {
  title: "Design System/Organisms/ExplanationModal",
  component: ExplanationModal,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof ExplanationModal>



const Template: ComponentStory<typeof ExplanationModal> = (args) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button mt={3} onClick={onOpen}>
        モーダルを開く
      </Button>
      <ExplanationModal
        {...args}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  )
}

function SampleChildren() {
  return (
    <>
      <h1>モーダルの中身</h1>
      <p>
        テキストなど<i>HTML</i>を記述します
        <br />
        <br />
        {
          Array(100)
            .fill('')
            .map(i => (
              <>
                長いテキストがある場合スクロールされます
                < br />
              </>
            ))
        }
      </p>
    </>
  )
}

export const Default = Template.bind({})

Default.args = {
  title: "市民とは",
  closeButtonText: "閉じる",
  children: <SampleChildren />,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/SuUry7ENSZSH1hg3GbxvHc/ExplanationModal?node-id=0%3A1',
  },
}
