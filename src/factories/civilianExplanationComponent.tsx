import { Text } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";
import { useTranslation } from "next-export-i18n";

export const CivilianExplanationComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <Text mb={4}>
                {t("市民は避難所に着くことを目指します。緑色で表示されます。")}
            </Text>
            <ImageCard
                src="/Resources/img/civilian.svg"
                title={t("市民")}
                description={t("自力で避難所まで向かう")}
            />
        </>
    )
}
