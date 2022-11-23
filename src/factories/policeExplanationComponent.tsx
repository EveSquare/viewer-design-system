import { ImageCard } from "@/components/molecules/ImageCard";
import { Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

export const PoliceExplanationComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <Text mb={4}>
                {t("道路を塞いでいるがれきを撤去")} {t("青色で表示されます。")}
            </Text>
            <ImageCard
                src="/Resources/img/police.svg"
                title={t("土木隊")}
                description={t("道路を塞いでいるがれきを撤去")}
            />
        </>
    )
}
