import { Props as LogCardProps } from "@/components/molecules/LogCard/type";

export interface Props {
    logSections: Array<LogSection>;
}

export interface LogSection {
    sectionName: string;
    logs: Array<LogCardProps>;
}