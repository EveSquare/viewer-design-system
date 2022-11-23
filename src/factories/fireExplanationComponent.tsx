import { ImageCard } from "@/components/molecules/ImageCard";
import { Text } from "@chakra-ui/react";
import { useTranslation } from "next-export-i18n";

export const FireExplanationComponent = () => {
    const { t } = useTranslation();
    return (
        <>
            <Text>{t("建物に埋まってしまって動けない市民と人工知能ロボットを救出")}</Text>
            <Text mb={4}>{t("赤色で表示されます。")}</Text>
            <ImageCard
                src="/Resources/img/fire.svg"
                title={t("消防隊")}
                description={t("建物に埋まってしまって動けない市民と人工知能ロボットを救出")}
            />
        </>
    )
}
