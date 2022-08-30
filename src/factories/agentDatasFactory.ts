import { Props as AgentCardProps } from "@/components/molecules/AgentCard/type";
import { action } from "@storybook/addon-actions";

export const agentDatas: Array<AgentCardProps> = [
    {
        agentType: 'civilian',
        title: '市民',
        description: '市民の説明',
        onClick: action('clicked'),
    },
    {
        agentType: 'ambulance',
        title: '救急隊',
        description: '救急隊の説明',
        onClick: action('clicked'),
    },
    {
        agentType: 'fire',
        title: '消防隊',
        description: '消防隊の説明',
        onClick: action('clicked'),
    },
]