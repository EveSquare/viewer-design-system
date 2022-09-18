import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from 'react';
import { load } from '@loaders.gl/core';
import { JSONLoader } from '@loaders.gl/json';
import { Props, Animation, ToolTip } from '../../common/viewer/type';
import getConfig from 'next/config'
import { AGENT_COLOR, ICON_MAPPING, LOG_BASE_PATH } from "../../common/viewer/const";
import { Box } from "@chakra-ui/react";
import { ChildProps as ChildSliderArgsProps } from "@/components/organisms/SliderKit/type";
import { OrbitView, COORDINATE_SYSTEM } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { PolygonLayer, IconLayer } from "@deck.gl/layers";

const MainViewer = dynamic(() => import("src/components/pages/MainViewer").then((cmp) => cmp.MainViewer), { ssr: false });


const Viewer: NextPage<Props> = ({ mapData, rescueLogData, metaData }) => {

    const animationSpeed = 1;
    const stepDuration = 60;
    const maxsteps = metaData.maxTimeStep;
    const maxScore = Math.round(metaData.scores[0] * 100) / 100;
    const loopLength = stepDuration * maxsteps;

    const [time, setTime] = useState(0);
    const [step, setStep] = useState(0);
    const [score, _setScore] = useState(maxScore);
    const setScore = (score: number) => { _setScore(Math.round(score * 100) / 100) } // 少数第二位まで表示
    const [isFinished, setIsFinished] = useState(false);
    const [animation] = useState<Animation>({ id: 0 });
    const [layers, setLayers] = useState<any>([]);
    const [rescuelog, setRescueLog] = useState(rescueLogData);
    const [viewState, setViewState] = useState<any>({
        width: globalThis.window?.innerWidth,
        height: globalThis.window?.innerHeight,
        target: [0, 0, 0],
        rotationX: 30,
        rotationOrbit: 0,
        zoom: 0.5,
        minZoom: 0,
        maxZoom: 20,
    })

    const [buildings, setBuildings] = useState<any>();
    const [roads, setRoads] = useState<any>();
    const [agents, setAgents] = useState<any>();

    const [sliderKitState, setSliderKitState] = React.useState({
        isPlaying: true,
        isDisabled: false,
        value: 0,
        max: maxsteps,
    });

    const sliderArgs: ChildSliderArgsProps = {
        isPlaying: sliderKitState.isPlaying,
        isDisabled: sliderKitState.isDisabled,
        value: sliderKitState.value,
        max: sliderKitState.max - 1, // +1をフェッチしているため表示上は-1する
        onChange: (value: number) => {
            setSliderKitState({ ...sliderKitState, value: value, isPlaying: false });
            setStep(value);
            setTime(value * stepDuration);
        },
        onChangeEnd: () => {
            setSliderKitState({ ...sliderKitState, isPlaying: true })
        },
        onClickPlayButton: () => {
            setSliderKitState({ ...sliderKitState, isPlaying: !sliderKitState.isPlaying })
            if (sliderKitState.isPlaying === false) {
                setTime(step * stepDuration);
            }
        },
    }

    const getNormalizedPos = useCallback((v: number, axis: "x" | "y") => {
        if (axis == "x") {
            return (v - mapData.width / 2) / 1000;
        }
        else {
            return (v - mapData.height / 2) / 1000;
        }
    }, [mapData.height, mapData.width]);

    const animate = useCallback(() => {
        setTime(t => (t + animationSpeed) % loopLength);
        animation.id = window.requestAnimationFrame(animate);
    }, [animation, loopLength]);

    useEffect(() => {
        animation.id = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(animation.id);
    }, [animate, animation]);

    useEffect(() => {
        const s = Math.floor(time / stepDuration);
        if (step < s && sliderKitState.isPlaying) {
            setStep(s);
            setSliderKitState({ ...sliderKitState, value: s });
            setScore(metaData.scores[s]);
        }
    }, [metaData.scores, sliderKitState, step, time]);

    useEffect(() => {
        async function fetchData() {
            const host = getConfig().publicRuntimeConfig.LOG_HOST;
            const featch_url = new URL(LOG_BASE_PATH + `/full/${step + 1}.json`, host).href;
            const log = await load(featch_url, JSONLoader);
            setRescueLog(log);
        }
        if (step === maxsteps - 1) {
            setIsFinished(true);
            console.log("finished");
        } else {
            fetchData();
        };
    }, [maxsteps, step]);

    useEffect(() => {

        const b = mapData.entities
            .filter(v => v.type === "Building")
            .map(v => {
                let d = v.edges.map(vv => [getNormalizedPos(vv.start.x, "x"), getNormalizedPos(vv.start.y, "y"), 0]);
                d.push([getNormalizedPos(v.edges[0].start.x, "x"), getNormalizedPos(v.edges[0].start.y, "y"), 0]); // push first vertex
                return {
                    type: v.type,
                    id: v.id,
                    x: v.x,
                    y: v.y,
                    contour: d,
                    elevation: Math.floor(Math.random() * 6) + 3
                };
            });
        setBuildings(b);

        const r = mapData.entities
            .filter(v => v.type === "Road" || "Hydrant")
            .map(v => {
                let d = v.edges.map(vv => [getNormalizedPos(vv.start.x, "x"), getNormalizedPos(vv.start.y, "y"), 0]);
                d.push([getNormalizedPos(v.edges[0].start.x, "x"), getNormalizedPos(v.edges[0].start.y, "y"), 0]); // push first vertex
                return {
                    type: v.type,
                    id: v.id,
                    x: v.x,
                    y: v.y,
                    contour: d
                };
            });
        setRoads(r);

        const agents = rescuelog.world.agents.map(v => {
            return {
                id: v.id,
                type: v.type,
                x: v.x,
                y: v.y,
                color: AGENT_COLOR[v.type],
                coordinates: [getNormalizedPos(v.x as number, "x"), getNormalizedPos(v.y as number, "y"), 10]
            }
        });
        setAgents(agents);

    }, [getNormalizedPos, mapData.entities, rescuelog.world.agents]);

    useEffect(() => {
        setLayers([
            new PolygonLayer({
                id: "building",
                data: buildings,
                extruded: true,
                pickable: true,
                stroked: true,
                filled: true,
                wireframe: true,
                lineWidthMinPixels: 1,
                getPolygon: (d: any) => d.contour,
                getElevation: (d: any) => d.elevation,
                getFillColor: [200, 200, 200],
                getLineColor: [80, 80, 80],
                getLineWidth: 1,
                coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
                coordinateOrigin: [-122.4004935, 37.7900486, 0]
            }),
            new PolygonLayer({
                id: "road",
                data: roads,
                extruded: true,
                pickable: true,
                stroked: true,
                filled: true,
                wireframe: true,
                lineWidthMinPixels: 1,
                getPolygon: (d: any) => d.contour,
                getElevation: 0,
                getFillColor: [230, 230, 230],
                getLineColor: [80, 80, 80],
                getLineWidth: 1,
                coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
                coordinateOrigin: [-122.4004935, 37.7900486, 0]
            }),
            new IconLayer({
                id: 'agents',
                data: agents,
                pickable: true,
                iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
                iconMapping: ICON_MAPPING,
                getIcon: (d: any) => 'marker',
                sizeScale: 15,
                getPosition: (d: any) => d.coordinates,
                getSize: (d: any) => 1,
                getColor: (d: any) => d.color,
                transitions: {
                    getPosition: 300,
                },
            })
        ])
    }, [agents, buildings, roads]);

    useEffect(() => {
        const a = rescuelog.world.agents.map(v => {
            return {
                id: v.id,
                type: v.type,
                x: v.x,
                y: v.y,
                color: AGENT_COLOR[v.type],
                coordinates: [getNormalizedPos(v.x as number, "x"), getNormalizedPos(v.y as number, "y"), 10]
            }
        });
        setAgents(a);
    }, [getNormalizedPos, rescuelog]);

    return (
        <>
            <MainViewer
                childSliderKitState={sliderArgs}
                score={score}
                maxScore={maxScore}
            >
                <Box
                    height={"100%"}
                    width={"100%"}
                >
                    <Box
                        position={"relative"}
                        height={"100%"}
                        transition={"height 600ms ease-in 0s"}
                        overflow={"hidden !important"}
                    >
                        <DeckGL
                            controller={true}
                            layers={layers}
                            getTooltip={({ entity }: ToolTip) => entity && `${entity.type} (${entity.id})\n Position: ${entity.x}, ${entity.y}`}
                            views={new OrbitView()}
                            viewState={viewState}
                            onViewStateChange={({ viewState }: any) => {
                                setViewState(viewState);
                            }}
                            onError={(e: Error) => console.error(e)}
                        ></DeckGL>
                    </Box>
                </Box>
            </MainViewer>
        </>
    )
}

export async function getStaticProps() {
    const host = getConfig().publicRuntimeConfig.LOG_HOST;

    const mapUrl = new URL(LOG_BASE_PATH + "/map.json", host).href;
    const mapData = await load(mapUrl, JSONLoader);

    const rescueLogDataUrl = new URL(LOG_BASE_PATH + "/full/1.json", host).href;
    const rescueLogData = await load(rescueLogDataUrl, JSONLoader);

    const metaUrl = new URL(LOG_BASE_PATH + "/meta.json", host).href;
    const metaData = await load(metaUrl, JSONLoader);
    return {
        props: {
            mapData,
            rescueLogData,
            metaData,
        },
    }
}

export default Viewer;