import { ImageCard } from "@/components/molecules/ImageCard";
import { Text } from "@chakra-ui/react";

export const AmbulanceExplanationComponent = () => {
    return (
        <>
            <Text mb={4}>
                自力で動けない市民を避難所まで搬送します。白色で表示されます。
            </Text>
            <ImageCard
                src="https://raw.githubusercontent.com/EveSquare/viewer-design-system/master/public/Resources/img/ambulance.svg"
                title="救急隊"
                description="自力で動けない市民を避難所まで搬送"
            />
        </>
    )
}
