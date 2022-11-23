import React from "react";
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { Container, Heading, VStack } from "@chakra-ui/react";
import { SectionBar } from "@/components/atoms/SectionBar";
import { AgentCard } from "@/components/molecules/AgentCard";
import { LinkCard } from "@/components/molecules/LinkCard";
import { Props } from "./type";
import { useTranslation } from "next-export-i18n";

export const SideBar: React.FC<Props> = ({ agentDatas, linkDatas, isShowing }) => {
    const { t } = useTranslation();
    return (
        <>
            <Container
                w="300px"
                h="100vh"
                bg="bg"
                visibility={isShowing == "show" ? "visible" : "hidden"}
            >
                <VStack>
                    <SectionBar />
                    <>
                        {
                            agentDatas ?
                                (
                                    agentDatas
                                        .map((agentData, idx) => (

                                            <AgentCard
                                                key={idx}
                                                agentType={agentData.agentType}
                                                title={agentData.title}
                                                description={agentData.description}
                                                onClick={agentData.onClick}
                                            />
                                        ))
                                )
                                :
                                (
                                    <></>
                                )
                        }
                    </>
                    <SectionBar />
                    <>
                        <Heading fontSize="xl">{t("外部リンク")}</Heading>
                        {
                            linkDatas ?
                                (linkDatas
                                    .map((linkData, idx) => (
                                        <LinkCard
                                            key={idx}
                                            prependIcon={<QuestionOutlineIcon w={5} h={5} />}
                                            title={linkData.title}
                                            href={linkData.href}
                                        />
                                    ))
                                )
                                :
                                (
                                    <></>
                                )
                        }
                    </>
                </VStack >
            </Container>
        </>
    );
}

SideBar.displayName = "SIDEBAR";