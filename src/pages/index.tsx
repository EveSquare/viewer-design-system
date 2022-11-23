import type { NextPage } from "next";
import { LogList } from "@/components/templates/LogList";
import { Props as LogCardProps } from "@/components/molecules/LogCard/type";
import { LogSection as LogSectionProps } from "@/components/templates/LogList/type";
import { useTranslation } from "next-export-i18n";
import { getSortedMostViewLogs } from "@/repositories/standardRepositories";

interface Props {
    popularLogs: LogCardProps[];
}

const Home: NextPage<Props> = ({ popularLogs }) => {

    const { t } = useTranslation();

    // 翻訳されるようにuseTranslationを使う
    const translatedPopularLogs = popularLogs.map(log => {
        log.title = t(log.title);
        log.description = t(log.description || "");
        log.tags = log.tags.map(tag => {
            tag.color = "bule";
            tag.tag.name = t(tag.tag.name);
            return tag;
        });
        return log;
    })

    const logSections: Array<LogSectionProps> = [
        { sectionName: t("人気"), logs: translatedPopularLogs }
    ]

    return (
        <>
            <LogList logSections={logSections} />
        </>
    );
};

export async function getStaticProps() {

    // SerializableErrorが発生するため再度パースする
    const popularLogs = JSON.parse(JSON.stringify(await getSortedMostViewLogs()));

    // 現在の言語に対応したURLに変換
    // const transLinkedPopularLogs = popularLogs.map((log: any) => {
    //     log.url = `/${locale}${log.url}`;
    //     return log;
    // });

    return {
        props: {
            popularLogs: popularLogs,
        },
    };
}

export default Home;
