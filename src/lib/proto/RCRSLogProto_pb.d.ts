// package: 
// file: RCRSLogProto.proto

import * as jspb from "google-protobuf";
import * as RCRSProto_pb from "./RCRSProto_pb";

export class LogProto extends jspb.Message {
  hasStart(): boolean;
  clearStart(): void;
  getStart(): StartLogProto | undefined;
  setStart(value?: StartLogProto): void;

  hasInitialcondition(): boolean;
  clearInitialcondition(): void;
  getInitialcondition(): InitialConditionsLogProto | undefined;
  setInitialcondition(value?: InitialConditionsLogProto): void;

  hasCommand(): boolean;
  clearCommand(): void;
  getCommand(): CommandLogProto | undefined;
  setCommand(value?: CommandLogProto): void;

  hasPerception(): boolean;
  clearPerception(): void;
  getPerception(): PerceptionLogProto | undefined;
  setPerception(value?: PerceptionLogProto): void;

  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): ConfigLogProto | undefined;
  setConfig(value?: ConfigLogProto): void;

  hasUpdate(): boolean;
  clearUpdate(): void;
  getUpdate(): UpdatesLogProto | undefined;
  setUpdate(value?: UpdatesLogProto): void;

  hasEnd(): boolean;
  clearEnd(): void;
  getEnd(): EndLogProto | undefined;
  setEnd(value?: EndLogProto): void;

  getLogCase(): LogProto.LogCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogProto.AsObject;
  static toObject(includeInstance: boolean, msg: LogProto): LogProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LogProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogProto;
  static deserializeBinaryFromReader(message: LogProto, reader: jspb.BinaryReader): LogProto;
}

export namespace LogProto {
  export type AsObject = {
    start?: StartLogProto.AsObject,
    initialcondition?: InitialConditionsLogProto.AsObject,
    command?: CommandLogProto.AsObject,
    perception?: PerceptionLogProto.AsObject,
    config?: ConfigLogProto.AsObject,
    update?: UpdatesLogProto.AsObject,
    end?: EndLogProto.AsObject,
  }

  export enum LogCase {
    LOG_NOT_SET = 0,
    START = 1,
    INITIALCONDITION = 2,
    COMMAND = 3,
    PERCEPTION = 4,
    CONFIG = 5,
    UPDATE = 6,
    END = 7,
  }
}

export class StartLogProto extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartLogProto.AsObject;
  static toObject(includeInstance: boolean, msg: StartLogProto): StartLogProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartLogProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartLogProto;
  static deserializeBinaryFromReader(message: StartLogProto, reader: jspb.BinaryReader): StartLogProto;
}

export namespace StartLogProto {
  export type AsObject = {
  }
}

export class InitialConditionsLogProto extends jspb.Message {
  clearEntitiesList(): void;
  getEntitiesList(): Array<RCRSProto_pb.EntityProto>;
  setEntitiesList(value: Array<RCRSProto_pb.EntityProto>): void;
  addEntities(value?: RCRSProto_pb.EntityProto, index?: number): RCRSProto_pb.EntityProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitialConditionsLogProto.AsObject;
  static toObject(includeInstance: boolean, msg: InitialConditionsLogProto): InitialConditionsLogProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InitialConditionsLogProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitialConditionsLogProto;
  static deserializeBinaryFromReader(message: InitialConditionsLogProto, reader: jspb.BinaryReader): InitialConditionsLogProto;
}

export namespace InitialConditionsLogProto {
  export type AsObject = {
    entitiesList: Array<RCRSProto_pb.EntityProto.AsObject>,
  }
}

export class CommandLogProto extends jspb.Message {
  getTime(): number;
  setTime(value: number): void;

  clearCommandsList(): void;
  getCommandsList(): Array<RCRSProto_pb.MessageProto>;
  setCommandsList(value: Array<RCRSProto_pb.MessageProto>): void;
  addCommands(value?: RCRSProto_pb.MessageProto, index?: number): RCRSProto_pb.MessageProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommandLogProto.AsObject;
  static toObject(includeInstance: boolean, msg: CommandLogProto): CommandLogProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommandLogProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommandLogProto;
  static deserializeBinaryFromReader(message: CommandLogProto, reader: jspb.BinaryReader): CommandLogProto;
}

export namespace CommandLogProto {
  export type AsObject = {
    time: number,
    commandsList: Array<RCRSProto_pb.MessageProto.AsObject>,
  }
}

export class PerceptionLogProto extends jspb.Message {
  getTime(): number;
  setTime(value: number): void;

  getEntityid(): number;
  setEntityid(value: number): void;

  hasVisible(): boolean;
  clearVisible(): void;
  getVisible(): RCRSProto_pb.ChangeSetProto | undefined;
  setVisible(value?: RCRSProto_pb.ChangeSetProto): void;

  clearCommunicationsList(): void;
  getCommunicationsList(): Array<RCRSProto_pb.MessageProto>;
  setCommunicationsList(value: Array<RCRSProto_pb.MessageProto>): void;
  addCommunications(value?: RCRSProto_pb.MessageProto, index?: number): RCRSProto_pb.MessageProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PerceptionLogProto.AsObject;
  static toObject(includeInstance: boolean, msg: PerceptionLogProto): PerceptionLogProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PerceptionLogProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PerceptionLogProto;
  static deserializeBinaryFromReader(message: PerceptionLogProto, reader: jspb.BinaryReader): PerceptionLogProto;
}

export namespace PerceptionLogProto {
  export type AsObject = {
    time: number,
    entityid: number,
    visible?: RCRSProto_pb.ChangeSetProto.AsObject,
    communicationsList: Array<RCRSProto_pb.MessageProto.AsObject>,
  }
}

export class ConfigLogProto extends jspb.Message {
  hasConfig(): boolean;
  clearConfig(): void;
  getConfig(): RCRSProto_pb.ConfigProto | undefined;
  setConfig(value?: RCRSProto_pb.ConfigProto): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfigLogProto.AsObject;
  static toObject(includeInstance: boolean, msg: ConfigLogProto): ConfigLogProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConfigLogProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfigLogProto;
  static deserializeBinaryFromReader(message: ConfigLogProto, reader: jspb.BinaryReader): ConfigLogProto;
}

export namespace ConfigLogProto {
  export type AsObject = {
    config?: RCRSProto_pb.ConfigProto.AsObject,
  }
}

export class UpdatesLogProto extends jspb.Message {
  getTime(): number;
  setTime(value: number): void;

  hasChanges(): boolean;
  clearChanges(): void;
  getChanges(): RCRSProto_pb.ChangeSetProto | undefined;
  setChanges(value?: RCRSProto_pb.ChangeSetProto): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdatesLogProto.AsObject;
  static toObject(includeInstance: boolean, msg: UpdatesLogProto): UpdatesLogProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdatesLogProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdatesLogProto;
  static deserializeBinaryFromReader(message: UpdatesLogProto, reader: jspb.BinaryReader): UpdatesLogProto;
}

export namespace UpdatesLogProto {
  export type AsObject = {
    time: number,
    changes?: RCRSProto_pb.ChangeSetProto.AsObject,
  }
}

export class EndLogProto extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndLogProto.AsObject;
  static toObject(includeInstance: boolean, msg: EndLogProto): EndLogProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EndLogProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EndLogProto;
  static deserializeBinaryFromReader(message: EndLogProto, reader: jspb.BinaryReader): EndLogProto;
}

export namespace EndLogProto {
  export type AsObject = {
  }
}

