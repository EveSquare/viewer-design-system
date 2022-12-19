/* eslint-disable react/display-name */
import {
  Container,
  Stack,
  VStack,
  Box,
  useColorMode,
  useColorModeValue,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "next-export-i18n";

type Props = {
  filter: object;
  setFilter: any;
  enabledLayers: boolean[];
  setEnabledLayers: any;
};

const Widget = memo(({ ...props }: Props) => {
  const { t } = useTranslation();
  const [_enabledLayers, _setEnabledLayers] = useState({
    agentsLayer: true,
    buildingsLayer: true,
    roadsLayer: true,
    blockadesLayer: true,
  });
  const [filterAgentId, setFilterAgentId] = useState(0);
  const [filterAgentType, setFilterAgentType] = useState({
    civilian: true,
    police: true,
    fire: true,
    ambulance: true,
  });

  const handleEnableLayersSet = () => {
    props.setEnabledLayers([
      _enabledLayers.agentsLayer,
      _enabledLayers.buildingsLayer,
      _enabledLayers.roadsLayer,
      _enabledLayers.blockadesLayer,
    ]);
  };

  const handleFilterSet = () => {
    props.setFilter({
      agents: {
        id: filterAgentId === 0 ? null : filterAgentId,
        type: { ...filterAgentType },
      },
    });
  };

  return (
    <Box
      id="Widget"
      height="calc(100vh - 65px)"
      position="fixed"
      left="0"
      top="65px"
      zIndex="2"
    >
      <Container w="300px" h="100vh" bg="bg">
        <Tabs>
          <TabList>
            <Tab>Layers</Tab>
            <Tab>Filter</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack>
                <Checkbox
                  isChecked={_enabledLayers.agentsLayer}
                  onChange={(e) => {
                    _setEnabledLayers({
                      ..._enabledLayers,
                      agentsLayer: e.target.checked,
                    });
                  }}
                >
                  Agent
                </Checkbox>
                <Checkbox
                  isChecked={_enabledLayers.buildingsLayer}
                  onChange={(e) => {
                    _setEnabledLayers({
                      ..._enabledLayers,
                      buildingsLayer: e.target.checked,
                    });
                  }}
                >
                  Building
                </Checkbox>
                <Checkbox
                  isChecked={_enabledLayers.roadsLayer}
                  onChange={(e) => {
                    _setEnabledLayers({
                      ..._enabledLayers,
                      roadsLayer: e.target.checked,
                    });
                  }}
                >
                  Road
                </Checkbox>
                <Checkbox
                  isChecked={_enabledLayers.blockadesLayer}
                  onChange={(e) => {
                    _setEnabledLayers({
                      ..._enabledLayers,
                      blockadesLayer: e.target.checked,
                    });
                  }}
                >
                  Blockage
                </Checkbox>
              </Stack>
              <Button
                mt={5}
                colorScheme="teal"
                // isLoading={props.isSubmitting}
                type="submit"
                onClick={handleEnableLayersSet}
              >
                Apply
              </Button>
            </TabPanel>
            <TabPanel>
              <FormControl>
                <Box>
                  <FormLabel>Type</FormLabel>
                  <Stack>
                    <Checkbox
                      isChecked={filterAgentType.civilian}
                      onChange={(e) => {
                        setFilterAgentType({
                          ...filterAgentType,
                          civilian: e.target.checked,
                        });
                      }}
                    >
                      Civilian
                    </Checkbox>
                    <Checkbox
                      isChecked={filterAgentType.fire}
                      onChange={(e) => {
                        setFilterAgentType({
                          ...filterAgentType,
                          fire: e.target.checked,
                        });
                      }}
                    >
                      Fire Brigade
                    </Checkbox>
                    <Checkbox
                      isChecked={filterAgentType.police}
                      onChange={(e) => {
                        setFilterAgentType({
                          ...filterAgentType,
                          police: e.target.checked,
                        });
                      }}
                    >
                      Police Force
                    </Checkbox>
                    <Checkbox
                      isChecked={filterAgentType.ambulance}
                      onChange={(e) => {
                        setFilterAgentType({
                          ...filterAgentType,
                          ambulance: e.target.checked,
                        });
                      }}
                    >
                      Ambulance Team
                    </Checkbox>
                  </Stack>
                </Box>
                <Box mt={5}>
                  <FormLabel>ID</FormLabel>
                  <Input
                    value={filterAgentId}
                    type="number"
                    onChange={(e) =>
                      setFilterAgentId(Number.parseInt(e.target.value))
                    }
                    placeholder="111111"
                  />
                </Box>
                <Button
                  mt={5}
                  colorScheme="teal"
                  // isLoading={props.isSubmitting}
                  type="submit"
                  onClick={handleFilterSet}
                >
                  Apply
                </Button>
              </FormControl>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
});
export default Widget;
