
import { Props as LinkCardProps } from "@/components/molecules/LinkCard/type";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

export const linkDatas: Array<LinkCardProps> = [
    {
        prependIcon: <QuestionOutlineIcon w={5} h={5} />,
        title: 'RRSとは',
        href: '/explanation/chapter1/whatisrrs'
    },
    {
        prependIcon: <QuestionOutlineIcon w={5} h={5} />,
        title: 'エージェントとは',
        href: '/explanation/chapter1/whatistheagent'
    }
]