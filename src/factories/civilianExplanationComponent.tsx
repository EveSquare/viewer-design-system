import { Text } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";

export const CivilianExplanationComponent = () => {
    return (
        <>
            <Text mb={4}>
                市民は避難所に着くことを目指します。緑色で表示されます。
            </Text>
            <ImageCard
                src="/Resources/img/civilian.svg"
                title="市民"
                description="自力で避難所まで向かう"
            />
        </>
    )
}
