declare module Property {
    export interface Property {
        urn: number,
        isDefined: boolean,
        value: any,
        type: any,
    }
}


declare module Entity {
    export type AsObject = {
        id: string,
        urn: number,
        properties: {[key: number]: any},
    }
    export function update(props: any): void;
    export function clone(): AsObject;
    export function toString(): string;
}