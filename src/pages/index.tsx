import type { NextPage } from "next";
import { LogList } from "@/components/templates/LogList";
import { Props as LogCardProps } from "@/components/molecules/LogCard/type";
import { LogSection as LogSectionProps } from "@/components/templates/LogList/type";
import { useTranslation } from 'next-i18next';

const Home: NextPage = () => {

  const { t, i18n } = useTranslation();

  const popularLogs: Array<LogCardProps> = [
    {
      title: t("Sample01"),
      description: t("Sample01の説明文です。"),
      href: "/viewer",
      tags: [{
        name: t("イベント"),
        color: "bule",
      }, {
        name: t("サンプル"),
        color: "red",
      }],
    },
    {
      title: t("Sample02"),
      description: t("Sample02の説明文です。"),
      href: "/viewer",
      tags: [{
        name: t("イベント"),
        color: "bule",
      }, {
        name: t("サンプル"),
        color: "red",
      }],
    },
    {
      title: t("Sample03"),
      description: t("Sample03の説明文です。"),
      href: "/viewer",
      tags: [{
        name: t("イベント"),
        color: "bule",
      }, {
        name: t("サンプル"),
        color: "red"
      }],
    },
  ]

  const logSections: Array<LogSectionProps> = [
    { sectionName: t("人気"), logs: popularLogs }
  ]

  return (
    <>
      <LogList logSections={logSections} />
    </>
  );
};

export default Home;
