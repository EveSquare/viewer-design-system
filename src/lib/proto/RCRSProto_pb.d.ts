// package: 
// file: RCRSProto.proto

import * as jspb from "google-protobuf";

export class MessageProto extends jspb.Message {
  getUrn(): number;
  setUrn(value: number): void;

  getComponentsMap(): jspb.Map<number, MessageComponentProto>;
  clearComponentsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageProto.AsObject;
  static toObject(includeInstance: boolean, msg: MessageProto): MessageProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageProto;
  static deserializeBinaryFromReader(message: MessageProto, reader: jspb.BinaryReader): MessageProto;
}

export namespace MessageProto {
  export type AsObject = {
    urn: number,
    componentsMap: Array<[number, MessageComponentProto.AsObject]>,
  }
}

export class MessageListProto extends jspb.Message {
  clearCommandsList(): void;
  getCommandsList(): Array<MessageProto>;
  setCommandsList(value: Array<MessageProto>): void;
  addCommands(value?: MessageProto, index?: number): MessageProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageListProto.AsObject;
  static toObject(includeInstance: boolean, msg: MessageListProto): MessageListProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageListProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageListProto;
  static deserializeBinaryFromReader(message: MessageListProto, reader: jspb.BinaryReader): MessageListProto;
}

export namespace MessageListProto {
  export type AsObject = {
    commandsList: Array<MessageProto.AsObject>,
  }
}

export class MessageComponentProto extends jspb.Message {
  hasChangeset(): boolean;
  clearChangeset(): void;
  getChangeset(): ChangeSetProto | undefined;
  setChangeset(value?: ChangeSetProto): void;

  hasCommandlist(): boolean;
  clearCommandlist(): void;
  getCommandlist(): MessageListProto | undefined;
  setCommandlist(value?: MessageListProto): void;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): ConfigProto | undefined;
  setConfig(value?: ConfigProto): void;

  hasEntity(): boolean;
  clearEntity(): void;
  getEntity(): EntityProto | undefined;
  setEntity(value?: EntityProto): void;

  hasEntityid(): boolean;
  clearEntityid(): void;
  getEntityid(): number;
  setEntityid(value: number): void;

  hasEntityidlist(): boolean;
  clearEntityidlist(): void;
  getEntityidlist(): IntListProto | undefined;
  setEntityidlist(value?: IntListProto): void;

  hasEntitylist(): boolean;
  clearEntitylist(): void;
  getEntitylist(): EntityListProto | undefined;
  setEntitylist(value?: EntityListProto): void;

  hasFloatlist(): boolean;
  clearFloatlist(): void;
  getFloatlist(): FloatListProto | undefined;
  setFloatlist(value?: FloatListProto): void;

  hasIntvalue(): boolean;
  clearIntvalue(): void;
  getIntvalue(): number;
  setIntvalue(value: number): void;

  hasIntlist(): boolean;
  clearIntlist(): void;
  getIntlist(): IntListProto | undefined;
  setIntlist(value?: IntListProto): void;

  hasRawdata(): boolean;
  clearRawdata(): void;
  getRawdata(): Uint8Array | string;
  getRawdata_asU8(): Uint8Array;
  getRawdata_asB64(): string;
  setRawdata(value: Uint8Array | string): void;

  hasStringvalue(): boolean;
  clearStringvalue(): void;
  getStringvalue(): string;
  setStringvalue(value: string): void;

  hasStringlist(): boolean;
  clearStringlist(): void;
  getStringlist(): StrListProto | undefined;
  setStringlist(value?: StrListProto): void;

  getComponentCase(): MessageComponentProto.ComponentCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageComponentProto.AsObject;
  static toObject(includeInstance: boolean, msg: MessageComponentProto): MessageComponentProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageComponentProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageComponentProto;
  static deserializeBinaryFromReader(message: MessageComponentProto, reader: jspb.BinaryReader): MessageComponentProto;
}

export namespace MessageComponentProto {
  export type AsObject = {
    changeset?: ChangeSetProto.AsObject,
    commandlist?: MessageListProto.AsObject,
    config?: ConfigProto.AsObject,
    entity?: EntityProto.AsObject,
    entityid: number,
    entityidlist?: IntListProto.AsObject,
    entitylist?: EntityListProto.AsObject,
    floatlist?: FloatListProto.AsObject,
    intvalue: number,
    intlist?: IntListProto.AsObject,
    rawdata: Uint8Array | string,
    stringvalue: string,
    stringlist?: StrListProto.AsObject,
  }

  export enum ComponentCase {
    COMPONENT_NOT_SET = 0,
    CHANGESET = 1,
    COMMANDLIST = 2,
    CONFIG = 3,
    ENTITY = 4,
    ENTITYID = 5,
    ENTITYIDLIST = 6,
    ENTITYLIST = 7,
    FLOATLIST = 8,
    INTVALUE = 9,
    INTLIST = 10,
    RAWDATA = 11,
    STRINGVALUE = 12,
    STRINGLIST = 13,
  }
}

export class StrListProto extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<string>;
  setValuesList(value: Array<string>): void;
  addValues(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StrListProto.AsObject;
  static toObject(includeInstance: boolean, msg: StrListProto): StrListProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StrListProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StrListProto;
  static deserializeBinaryFromReader(message: StrListProto, reader: jspb.BinaryReader): StrListProto;
}

export namespace StrListProto {
  export type AsObject = {
    valuesList: Array<string>,
  }
}

export class IntListProto extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<number>;
  setValuesList(value: Array<number>): void;
  addValues(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntListProto.AsObject;
  static toObject(includeInstance: boolean, msg: IntListProto): IntListProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IntListProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IntListProto;
  static deserializeBinaryFromReader(message: IntListProto, reader: jspb.BinaryReader): IntListProto;
}

export namespace IntListProto {
  export type AsObject = {
    valuesList: Array<number>,
  }
}

export class FloatListProto extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<number>;
  setValuesList(value: Array<number>): void;
  addValues(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FloatListProto.AsObject;
  static toObject(includeInstance: boolean, msg: FloatListProto): FloatListProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FloatListProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FloatListProto;
  static deserializeBinaryFromReader(message: FloatListProto, reader: jspb.BinaryReader): FloatListProto;
}

export namespace FloatListProto {
  export type AsObject = {
    valuesList: Array<number>,
  }
}

export class IntMatrixProto extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<IntListProto>;
  setValuesList(value: Array<IntListProto>): void;
  addValues(value?: IntListProto, index?: number): IntListProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntMatrixProto.AsObject;
  static toObject(includeInstance: boolean, msg: IntMatrixProto): IntMatrixProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IntMatrixProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IntMatrixProto;
  static deserializeBinaryFromReader(message: IntMatrixProto, reader: jspb.BinaryReader): IntMatrixProto;
}

export namespace IntMatrixProto {
  export type AsObject = {
    valuesList: Array<IntListProto.AsObject>,
  }
}

export class ValueProto extends jspb.Message {
  getDefined(): boolean;
  setDefined(value: boolean): void;

  hasIntvalue(): boolean;
  clearIntvalue(): void;
  getIntvalue(): number;
  setIntvalue(value: number): void;

  hasBoolvalue(): boolean;
  clearBoolvalue(): void;
  getBoolvalue(): boolean;
  setBoolvalue(value: boolean): void;

  hasDoublevalue(): boolean;
  clearDoublevalue(): void;
  getDoublevalue(): number;
  setDoublevalue(value: number): void;

  hasBytelist(): boolean;
  clearBytelist(): void;
  getBytelist(): Uint8Array | string;
  getBytelist_asU8(): Uint8Array;
  getBytelist_asB64(): string;
  setBytelist(value: Uint8Array | string): void;

  hasIntlist(): boolean;
  clearIntlist(): void;
  getIntlist(): IntListProto | undefined;
  setIntlist(value?: IntListProto): void;

  hasIntmatrix(): boolean;
  clearIntmatrix(): void;
  getIntmatrix(): IntMatrixProto | undefined;
  setIntmatrix(value?: IntMatrixProto): void;

  hasEdgelist(): boolean;
  clearEdgelist(): void;
  getEdgelist(): EdgeListProto | undefined;
  setEdgelist(value?: EdgeListProto): void;

  hasPoint2d(): boolean;
  clearPoint2d(): void;
  getPoint2d(): Point2DProto | undefined;
  setPoint2d(value?: Point2DProto): void;

  getValueCase(): ValueProto.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValueProto.AsObject;
  static toObject(includeInstance: boolean, msg: ValueProto): ValueProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValueProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValueProto;
  static deserializeBinaryFromReader(message: ValueProto, reader: jspb.BinaryReader): ValueProto;
}

export namespace ValueProto {
  export type AsObject = {
    defined: boolean,
    intvalue: number,
    boolvalue: boolean,
    doublevalue: number,
    bytelist: Uint8Array | string,
    intlist?: IntListProto.AsObject,
    intmatrix?: IntMatrixProto.AsObject,
    edgelist?: EdgeListProto.AsObject,
    point2d?: Point2DProto.AsObject,
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    INTVALUE = 2,
    BOOLVALUE = 3,
    DOUBLEVALUE = 4,
    BYTELIST = 5,
    INTLIST = 6,
    INTMATRIX = 7,
    EDGELIST = 8,
    POINT2D = 9,
  }
}

export class PropertyProto extends jspb.Message {
  getUrn(): number;
  setUrn(value: number): void;

  getDefined(): boolean;
  setDefined(value: boolean): void;

  hasIntvalue(): boolean;
  clearIntvalue(): void;
  getIntvalue(): number;
  setIntvalue(value: number): void;

  hasBoolvalue(): boolean;
  clearBoolvalue(): void;
  getBoolvalue(): boolean;
  setBoolvalue(value: boolean): void;

  hasDoublevalue(): boolean;
  clearDoublevalue(): void;
  getDoublevalue(): number;
  setDoublevalue(value: number): void;

  hasBytelist(): boolean;
  clearBytelist(): void;
  getBytelist(): Uint8Array | string;
  getBytelist_asU8(): Uint8Array;
  getBytelist_asB64(): string;
  setBytelist(value: Uint8Array | string): void;

  hasIntlist(): boolean;
  clearIntlist(): void;
  getIntlist(): IntListProto | undefined;
  setIntlist(value?: IntListProto): void;

  hasIntmatrix(): boolean;
  clearIntmatrix(): void;
  getIntmatrix(): IntMatrixProto | undefined;
  setIntmatrix(value?: IntMatrixProto): void;

  hasEdgelist(): boolean;
  clearEdgelist(): void;
  getEdgelist(): EdgeListProto | undefined;
  setEdgelist(value?: EdgeListProto): void;

  hasPoint2d(): boolean;
  clearPoint2d(): void;
  getPoint2d(): Point2DProto | undefined;
  setPoint2d(value?: Point2DProto): void;

  getValueCase(): PropertyProto.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyProto.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyProto): PropertyProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PropertyProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyProto;
  static deserializeBinaryFromReader(message: PropertyProto, reader: jspb.BinaryReader): PropertyProto;
}

export namespace PropertyProto {
  export type AsObject = {
    urn: number,
    defined: boolean,
    intvalue: number,
    boolvalue: boolean,
    doublevalue: number,
    bytelist: Uint8Array | string,
    intlist?: IntListProto.AsObject,
    intmatrix?: IntMatrixProto.AsObject,
    edgelist?: EdgeListProto.AsObject,
    point2d?: Point2DProto.AsObject,
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    INTVALUE = 3,
    BOOLVALUE = 4,
    DOUBLEVALUE = 5,
    BYTELIST = 6,
    INTLIST = 7,
    INTMATRIX = 8,
    EDGELIST = 9,
    POINT2D = 10,
  }
}

export class Point2DProto extends jspb.Message {
  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Point2DProto.AsObject;
  static toObject(includeInstance: boolean, msg: Point2DProto): Point2DProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Point2DProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Point2DProto;
  static deserializeBinaryFromReader(message: Point2DProto, reader: jspb.BinaryReader): Point2DProto;
}

export namespace Point2DProto {
  export type AsObject = {
    x: number,
    y: number,
  }
}

export class EntityProto extends jspb.Message {
  getUrn(): number;
  setUrn(value: number): void;

  getEntityid(): number;
  setEntityid(value: number): void;

  clearPropertiesList(): void;
  getPropertiesList(): Array<PropertyProto>;
  setPropertiesList(value: Array<PropertyProto>): void;
  addProperties(value?: PropertyProto, index?: number): PropertyProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntityProto.AsObject;
  static toObject(includeInstance: boolean, msg: EntityProto): EntityProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntityProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntityProto;
  static deserializeBinaryFromReader(message: EntityProto, reader: jspb.BinaryReader): EntityProto;
}

export namespace EntityProto {
  export type AsObject = {
    urn: number,
    entityid: number,
    propertiesList: Array<PropertyProto.AsObject>,
  }
}

export class EntityListProto extends jspb.Message {
  clearEntitiesList(): void;
  getEntitiesList(): Array<EntityProto>;
  setEntitiesList(value: Array<EntityProto>): void;
  addEntities(value?: EntityProto, index?: number): EntityProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntityListProto.AsObject;
  static toObject(includeInstance: boolean, msg: EntityListProto): EntityListProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntityListProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntityListProto;
  static deserializeBinaryFromReader(message: EntityListProto, reader: jspb.BinaryReader): EntityListProto;
}

export namespace EntityListProto {
  export type AsObject = {
    entitiesList: Array<EntityProto.AsObject>,
  }
}

export class ConfigProto extends jspb.Message {
  getDataMap(): jspb.Map<string, string>;
  clearDataMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfigProto.AsObject;
  static toObject(includeInstance: boolean, msg: ConfigProto): ConfigProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConfigProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfigProto;
  static deserializeBinaryFromReader(message: ConfigProto, reader: jspb.BinaryReader): ConfigProto;
}

export namespace ConfigProto {
  export type AsObject = {
    dataMap: Array<[string, string]>,
  }
}

export class EdgeListProto extends jspb.Message {
  clearEdgesList(): void;
  getEdgesList(): Array<EdgeProto>;
  setEdgesList(value: Array<EdgeProto>): void;
  addEdges(value?: EdgeProto, index?: number): EdgeProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EdgeListProto.AsObject;
  static toObject(includeInstance: boolean, msg: EdgeListProto): EdgeListProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EdgeListProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EdgeListProto;
  static deserializeBinaryFromReader(message: EdgeListProto, reader: jspb.BinaryReader): EdgeListProto;
}

export namespace EdgeListProto {
  export type AsObject = {
    edgesList: Array<EdgeProto.AsObject>,
  }
}

export class EdgeProto extends jspb.Message {
  getStartx(): number;
  setStartx(value: number): void;

  getStarty(): number;
  setStarty(value: number): void;

  getEndx(): number;
  setEndx(value: number): void;

  getEndy(): number;
  setEndy(value: number): void;

  getNeighbour(): number;
  setNeighbour(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EdgeProto.AsObject;
  static toObject(includeInstance: boolean, msg: EdgeProto): EdgeProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EdgeProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EdgeProto;
  static deserializeBinaryFromReader(message: EdgeProto, reader: jspb.BinaryReader): EdgeProto;
}

export namespace EdgeProto {
  export type AsObject = {
    startx: number,
    starty: number,
    endx: number,
    endy: number,
    neighbour: number,
  }
}

export class ChangeSetProto extends jspb.Message {
  clearChangesList(): void;
  getChangesList(): Array<ChangeSetProto.EntityChangeProto>;
  setChangesList(value: Array<ChangeSetProto.EntityChangeProto>): void;
  addChanges(value?: ChangeSetProto.EntityChangeProto, index?: number): ChangeSetProto.EntityChangeProto;

  clearDeletesList(): void;
  getDeletesList(): Array<number>;
  setDeletesList(value: Array<number>): void;
  addDeletes(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeSetProto.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeSetProto): ChangeSetProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangeSetProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeSetProto;
  static deserializeBinaryFromReader(message: ChangeSetProto, reader: jspb.BinaryReader): ChangeSetProto;
}

export namespace ChangeSetProto {
  export type AsObject = {
    changesList: Array<ChangeSetProto.EntityChangeProto.AsObject>,
    deletesList: Array<number>,
  }

  export class EntityChangeProto extends jspb.Message {
    getEntityid(): number;
    setEntityid(value: number): void;

    getUrn(): number;
    setUrn(value: number): void;

    clearPropertiesList(): void;
    getPropertiesList(): Array<PropertyProto>;
    setPropertiesList(value: Array<PropertyProto>): void;
    addProperties(value?: PropertyProto, index?: number): PropertyProto;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EntityChangeProto.AsObject;
    static toObject(includeInstance: boolean, msg: EntityChangeProto): EntityChangeProto.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EntityChangeProto, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EntityChangeProto;
    static deserializeBinaryFromReader(message: EntityChangeProto, reader: jspb.BinaryReader): EntityChangeProto;
  }

  export namespace EntityChangeProto {
    export type AsObject = {
      entityid: number,
      urn: number,
      propertiesList: Array<PropertyProto.AsObject>,
    }
  }
}

