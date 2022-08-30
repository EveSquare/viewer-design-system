
import { Props as LinkCardProps } from "@/components/molecules/LinkCard/type";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

export const linkDatas: Array<LinkCardProps> = [
    {
        prependIcon: <QuestionOutlineIcon w={5} h={5} />,
        title: 'RRSとは',
        href: '#'
    },
    {
        prependIcon: <QuestionOutlineIcon w={5} h={5} />,
        title: '操作方法',
        href: '#'
    }
]