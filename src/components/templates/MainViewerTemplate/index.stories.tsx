import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { MainViewerTemplate } from "./"
import { agentDatas } from "src/factories/agentDatasFactory"
import { linkDatas } from "src/factories/linkDatasFactory"
import { headerInfo } from "src/factories/headerInfoFactory"
import { Box } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Design System/Templates/MainViewerTemplate",
  component: MainViewerTemplate,
  decorators: [
    (story: any) => <div>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof MainViewerTemplate>



const Template: ComponentStory<typeof MainViewerTemplate> = (args) => <MainViewerTemplate {...args} />


function SampleBlankChildren() {
  return (
    <Box bg="green.700" w="100vw" h="100vh"></Box>
  )
}

export const Default = Template.bind({})

Default.args = {
  agentDatas: agentDatas,
  linkDatas: linkDatas,
  headerInfo: headerInfo,
  children: <SampleBlankChildren />,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/y8YYJXzyLQGp66zMNRpgeJ/MainViewer?node-id=0%3A1',
  },
}
