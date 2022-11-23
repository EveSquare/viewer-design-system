import { ImageCard } from "@/components/molecules/ImageCard";
import { Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

export const AmbulanceExplanationComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <Text mb={4}>
                {t("自力で動けない市民を避難所まで搬送します。白色で表示されます。")}
            </Text>
            <ImageCard
                src="/Resources/img/ambulance.svg"
                title={t("救急隊")}
                description={t("自力で動けない市民を避難所まで搬送")}
            />
        </>
    )
}
