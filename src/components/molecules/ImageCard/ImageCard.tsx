import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'
import Image from "next/image";

export const ImageCard: React.FC<Props> = ({ src, title, description }) => {
    return (
        <>
            <Grid w={"100%"} templateAreas={`"img explanation"`} templateColumns={"140px 1fr"}>
                <GridItem area="img">
                    <Image
                        src={src}
                        width="100px"
                        height="100px"
                        alt={title}
                    />
                </GridItem>
                <GridItem>
                    <Text fontSize={"xl"} as="b">{title}</Text>
                    <Text>{description}</Text>
                </GridItem>
            </Grid>
        </>
    );
}

ImageCard.displayName = "IMAGECARD";