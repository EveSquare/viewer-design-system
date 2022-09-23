import { ImageCard } from "@/components/molecules/ImageCard";
import { Text } from "@chakra-ui/react";

export const FireExplanationComponent = () => {
    return (
        <>
            <Text>消防隊は建物に埋まってしまって動けない市民と人工知能ロボットを救出します。</Text>
            <Text mb={4}>赤色で表示されます。</Text>
            <ImageCard
                src="https://raw.githubusercontent.com/EveSquare/viewer-design-system/master/public/Resources/img/fire.svg"
                title="消防隊"
                description="建物に埋まってしまって動けない市民と人工知能ロボットを救出"
            />
        </>
    )
}
