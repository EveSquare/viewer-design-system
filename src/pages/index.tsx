import type { NextPage } from "next";
import { useTranslation } from "next-export-i18n";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { HeaderBase } from "@/components/atoms/HeaderBase";
import { Logo } from "@/components/organisms/Logo";

interface Props {
}

const Home: NextPage<Props> = () => {

    const { t } = useTranslation();

    return (
        <>
            <Box>
                <Grid
                    templateAreas={`"header"
                                    "main"`}
                    gridTemplateColumns={`300px 1fr`}
                    w={"100vw"}
                >
                    <GridItem area={'header'}>
                        <HeaderBase>
                            <Box m={2}>
                                <Logo />
                            </Box>
                        </HeaderBase>
                    </GridItem>
                    <GridItem area={'main'}>

                    </GridItem>
                </Grid>
            </Box>
        </>
    );
};

export default Home;
