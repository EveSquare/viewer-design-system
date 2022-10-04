import { ImageCard } from "@/components/molecules/ImageCard";
import { Text } from "@chakra-ui/react";

export const PoliceExplanationComponent = () => {
    return (
        <>
            <Text mb={4}>
                道路を塞いでいるがれきを撤去します。青色で表示されます。
            </Text>
            <ImageCard
                src="/Resources/img/police.svg"
                title="土木隊"
                description="道路を塞いでいるがれきを撤去"
            />
        </>
    )
}
