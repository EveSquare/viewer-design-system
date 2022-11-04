import { ComponentMeta, ComponentStory } from "@storybook/react"
import { withDesign } from "storybook-addon-designs"
import { LogList } from "./"

export default {
  title: "Design System/Templates/LogList",
  component: LogList,
  decorators: [
    (story: any) => <div style={{ padding: '0 2rem' }}>{story()}</div>,
    withDesign,
  ],
  argTypes: {}
} as ComponentMeta<typeof LogList>



const Template: ComponentStory<typeof LogList> = (args) => <LogList {...args} />

export const Default = Template.bind({})

const popularLogs = [
  {
    title: "Sample01",
    description: "Sample01の説明文です。",
    url: "/",
    tags: [{
      tag: {
        name: "イベント",
      },
      color: "bule",
    }, {
      tag: {
        name: "サンプル",
      },
      color: "red",
    }],
  },
  {
    title: "Sample02",
    description: "Sample02の説明文です。",
    url: "/",
    tags: [{
      tag: {
        name: "イベント",
      },
      color: "bule",
    }, {
      tag: {
        name: "サンプル",
      },
      color: "red",
    }],
  },
  {
    title: "Sample03",
    description: "Sample03の説明文です。",
    url: "/",
    tags: [{
      tag: {
        name: "イベント",
      },
      color: "bule",
    }, {
      tag: {
        name: "サンプル",
      },
      color: "red",
    }],
  },
]

const logSections = [
  { sectionName: "人気", logs: popularLogs }
]

Default.args = {
  logSections: logSections,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/YS3wdNdnltcAcG2q1ulUM8/AllocationTop?node-id=1%3A2',
  },
}
