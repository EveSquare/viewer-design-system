import { Heading, Text } from "@chakra-ui/react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { ExplanationPage } from "./"
import { RiPoliceCarLine } from 'react-icons/ri';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

export default {
  title: "Design System/Pages/ExplanationPage",
  component: ExplanationPage,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof ExplanationPage>



const Template: ComponentStory<typeof ExplanationPage> = (args) => <ExplanationPage {...args} />

export const Default = Template.bind({})

function SampleChildComponent() {
  return (
    <div>
      <Heading mb={"2rem"}>RRSとは</Heading>
      <Text>RoboCup Rescue Simulation(RRS)とは都市直下型地震で被災した仮想都市における災害救助シミュレーションのことです。複数種類のロボットの協力による救助活動でいかに災害の被害を抑えられるかを競います。</Text>
    </div>
  )
}

const sideBarInfo = [
  {
    key: "chapter1",
    text: "競技の説明",
    icon: RiPoliceCarLine,
    sections: [
      {
        key: 'whatistherrs',
        text: "はじめに１：RRSとは",
        href: "explanation/chaper1/whatistherrs",
        isSelected: true,
      },
      {
        key: 'whatistheagent',
        text: "はじめに２：エージェントとは",
        href: "explanation/chaper1/whatistheagent",
        isSelected: false,
      },
    ]
  },
  {
    key: "chapter2",
    text: "競技の流れ",
    icon: QuestionOutlineIcon,
    sections: [
      {
        key: 'flowofthegame',
        text: "競技の流れ１：競技の流れ",
        href: "explanation/chaper2/flowofthegame",
        isSelected: false,
      },
      {
        key: 'flowofthegame',
        text: "競技の流れ２：競技の流れ",
        href: "explanation/chaper2/flowofthegame",
        isSelected: false,
      },
    ],
  },
]

Default.args = {
  sideBarInfo: sideBarInfo,
  children: <SampleChildComponent />,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/L7PtXUsLHUMheEJRF9DXJC/explanationPage?node-id=0%3A1',
  },
}
