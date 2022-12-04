// @generated by protoc-gen-es v0.2.1 with parameter "target=ts"
// @generated from file RCRSProto.proto (syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message MessageProto
 */
export class MessageProto extends Message<MessageProto> {
  /**
   * @generated from field: int32 urn = 1;
   */
  urn = 0;

  /**
   * @generated from field: map<int32, MessageComponentProto> components = 2;
   */
  components: { [key: number]: MessageComponentProto } = {};

  constructor(data?: PartialMessage<MessageProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "MessageProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "urn", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "components", kind: "map", K: 5 /* ScalarType.INT32 */, V: {kind: "message", T: MessageComponentProto} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageProto {
    return new MessageProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageProto {
    return new MessageProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageProto {
    return new MessageProto().fromJsonString(jsonString, options);
  }

  static equals(a: MessageProto | PlainMessage<MessageProto> | undefined, b: MessageProto | PlainMessage<MessageProto> | undefined): boolean {
    return proto3.util.equals(MessageProto, a, b);
  }
}

/**
 * @generated from message MessageListProto
 */
export class MessageListProto extends Message<MessageListProto> {
  /**
   * @generated from field: repeated MessageProto commands = 1;
   */
  commands: MessageProto[] = [];

  constructor(data?: PartialMessage<MessageListProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "MessageListProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "commands", kind: "message", T: MessageProto, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageListProto {
    return new MessageListProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageListProto {
    return new MessageListProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageListProto {
    return new MessageListProto().fromJsonString(jsonString, options);
  }

  static equals(a: MessageListProto | PlainMessage<MessageListProto> | undefined, b: MessageListProto | PlainMessage<MessageListProto> | undefined): boolean {
    return proto3.util.equals(MessageListProto, a, b);
  }
}

/**
 * @generated from message MessageComponentProto
 */
export class MessageComponentProto extends Message<MessageComponentProto> {
  /**
   * @generated from oneof MessageComponentProto.component
   */
  component: {
    /**
     * @generated from field: ChangeSetProto changeSet = 1;
     */
    value: ChangeSetProto;
    case: "changeSet";
  } | {
    /**
     * @generated from field: MessageListProto commandList = 2;
     */
    value: MessageListProto;
    case: "commandList";
  } | {
    /**
     * @generated from field: ConfigProto config = 3;
     */
    value: ConfigProto;
    case: "config";
  } | {
    /**
     * @generated from field: EntityProto entity = 4;
     */
    value: EntityProto;
    case: "entity";
  } | {
    /**
     * @generated from field: int32 entityID = 5;
     */
    value: number;
    case: "entityID";
  } | {
    /**
     * @generated from field: IntListProto entityIDList = 6;
     */
    value: IntListProto;
    case: "entityIDList";
  } | {
    /**
     * @generated from field: EntityListProto entityList = 7;
     */
    value: EntityListProto;
    case: "entityList";
  } | {
    /**
     * @generated from field: FloatListProto floatList = 8;
     */
    value: FloatListProto;
    case: "floatList";
  } | {
    /**
     * @generated from field: int32 intValue = 9;
     */
    value: number;
    case: "intValue";
  } | {
    /**
     * @generated from field: IntListProto intList = 10;
     */
    value: IntListProto;
    case: "intList";
  } | {
    /**
     * @generated from field: bytes rawData = 11;
     */
    value: Uint8Array;
    case: "rawData";
  } | {
    /**
     * @generated from field: string stringValue = 12;
     */
    value: string;
    case: "stringValue";
  } | {
    /**
     * @generated from field: StrListProto stringList = 13;
     */
    value: StrListProto;
    case: "stringList";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<MessageComponentProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "MessageComponentProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "changeSet", kind: "message", T: ChangeSetProto, oneof: "component" },
    { no: 2, name: "commandList", kind: "message", T: MessageListProto, oneof: "component" },
    { no: 3, name: "config", kind: "message", T: ConfigProto, oneof: "component" },
    { no: 4, name: "entity", kind: "message", T: EntityProto, oneof: "component" },
    { no: 5, name: "entityID", kind: "scalar", T: 5 /* ScalarType.INT32 */, oneof: "component" },
    { no: 6, name: "entityIDList", kind: "message", T: IntListProto, oneof: "component" },
    { no: 7, name: "entityList", kind: "message", T: EntityListProto, oneof: "component" },
    { no: 8, name: "floatList", kind: "message", T: FloatListProto, oneof: "component" },
    { no: 9, name: "intValue", kind: "scalar", T: 5 /* ScalarType.INT32 */, oneof: "component" },
    { no: 10, name: "intList", kind: "message", T: IntListProto, oneof: "component" },
    { no: 11, name: "rawData", kind: "scalar", T: 12 /* ScalarType.BYTES */, oneof: "component" },
    { no: 12, name: "stringValue", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "component" },
    { no: 13, name: "stringList", kind: "message", T: StrListProto, oneof: "component" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MessageComponentProto {
    return new MessageComponentProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MessageComponentProto {
    return new MessageComponentProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MessageComponentProto {
    return new MessageComponentProto().fromJsonString(jsonString, options);
  }

  static equals(a: MessageComponentProto | PlainMessage<MessageComponentProto> | undefined, b: MessageComponentProto | PlainMessage<MessageComponentProto> | undefined): boolean {
    return proto3.util.equals(MessageComponentProto, a, b);
  }
}

/**
 * @generated from message StrListProto
 */
export class StrListProto extends Message<StrListProto> {
  /**
   * @generated from field: repeated string values = 1;
   */
  values: string[] = [];

  constructor(data?: PartialMessage<StrListProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "StrListProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "values", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StrListProto {
    return new StrListProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StrListProto {
    return new StrListProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StrListProto {
    return new StrListProto().fromJsonString(jsonString, options);
  }

  static equals(a: StrListProto | PlainMessage<StrListProto> | undefined, b: StrListProto | PlainMessage<StrListProto> | undefined): boolean {
    return proto3.util.equals(StrListProto, a, b);
  }
}

/**
 * @generated from message IntListProto
 */
export class IntListProto extends Message<IntListProto> {
  /**
   * @generated from field: repeated int32 values = 1;
   */
  values: number[] = [];

  constructor(data?: PartialMessage<IntListProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "IntListProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "values", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): IntListProto {
    return new IntListProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): IntListProto {
    return new IntListProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): IntListProto {
    return new IntListProto().fromJsonString(jsonString, options);
  }

  static equals(a: IntListProto | PlainMessage<IntListProto> | undefined, b: IntListProto | PlainMessage<IntListProto> | undefined): boolean {
    return proto3.util.equals(IntListProto, a, b);
  }
}

/**
 * @generated from message FloatListProto
 */
export class FloatListProto extends Message<FloatListProto> {
  /**
   * @generated from field: repeated float values = 1;
   */
  values: number[] = [];

  constructor(data?: PartialMessage<FloatListProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "FloatListProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "values", kind: "scalar", T: 2 /* ScalarType.FLOAT */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FloatListProto {
    return new FloatListProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FloatListProto {
    return new FloatListProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FloatListProto {
    return new FloatListProto().fromJsonString(jsonString, options);
  }

  static equals(a: FloatListProto | PlainMessage<FloatListProto> | undefined, b: FloatListProto | PlainMessage<FloatListProto> | undefined): boolean {
    return proto3.util.equals(FloatListProto, a, b);
  }
}

/**
 * @generated from message IntMatrixProto
 */
export class IntMatrixProto extends Message<IntMatrixProto> {
  /**
   * @generated from field: repeated IntListProto values = 1;
   */
  values: IntListProto[] = [];

  constructor(data?: PartialMessage<IntMatrixProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "IntMatrixProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "values", kind: "message", T: IntListProto, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): IntMatrixProto {
    return new IntMatrixProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): IntMatrixProto {
    return new IntMatrixProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): IntMatrixProto {
    return new IntMatrixProto().fromJsonString(jsonString, options);
  }

  static equals(a: IntMatrixProto | PlainMessage<IntMatrixProto> | undefined, b: IntMatrixProto | PlainMessage<IntMatrixProto> | undefined): boolean {
    return proto3.util.equals(IntMatrixProto, a, b);
  }
}

/**
 * @generated from message ValueProto
 */
export class ValueProto extends Message<ValueProto> {
  /**
   * @generated from field: bool defined = 1;
   */
  defined = false;

  /**
   * @generated from oneof ValueProto.value
   */
  value: {
    /**
     * @generated from field: int32 intValue = 2;
     */
    value: number;
    case: "intValue";
  } | {
    /**
     * @generated from field: bool boolValue = 3;
     */
    value: boolean;
    case: "boolValue";
  } | {
    /**
     * @generated from field: double doubleValue = 4;
     */
    value: number;
    case: "doubleValue";
  } | {
    /**
     * @generated from field: bytes byteList = 5;
     */
    value: Uint8Array;
    case: "byteList";
  } | {
    /**
     * @generated from field: IntListProto intList = 6;
     */
    value: IntListProto;
    case: "intList";
  } | {
    /**
     * @generated from field: IntMatrixProto intMatrix = 7;
     */
    value: IntMatrixProto;
    case: "intMatrix";
  } | {
    /**
     * @generated from field: EdgeListProto edgeList = 8;
     */
    value: EdgeListProto;
    case: "edgeList";
  } | {
    /**
     * @generated from field: Point2DProto point2D = 9;
     */
    value: Point2DProto;
    case: "point2D";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<ValueProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "ValueProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "defined", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "intValue", kind: "scalar", T: 5 /* ScalarType.INT32 */, oneof: "value" },
    { no: 3, name: "boolValue", kind: "scalar", T: 8 /* ScalarType.BOOL */, oneof: "value" },
    { no: 4, name: "doubleValue", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, oneof: "value" },
    { no: 5, name: "byteList", kind: "scalar", T: 12 /* ScalarType.BYTES */, oneof: "value" },
    { no: 6, name: "intList", kind: "message", T: IntListProto, oneof: "value" },
    { no: 7, name: "intMatrix", kind: "message", T: IntMatrixProto, oneof: "value" },
    { no: 8, name: "edgeList", kind: "message", T: EdgeListProto, oneof: "value" },
    { no: 9, name: "point2D", kind: "message", T: Point2DProto, oneof: "value" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ValueProto {
    return new ValueProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ValueProto {
    return new ValueProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ValueProto {
    return new ValueProto().fromJsonString(jsonString, options);
  }

  static equals(a: ValueProto | PlainMessage<ValueProto> | undefined, b: ValueProto | PlainMessage<ValueProto> | undefined): boolean {
    return proto3.util.equals(ValueProto, a, b);
  }
}

/**
 * @generated from message PropertyProto
 */
export class PropertyProto extends Message<PropertyProto> {
  /**
   * @generated from field: int32 urn = 1;
   */
  urn = 0;

  /**
   * @generated from field: bool defined = 2;
   */
  defined = false;

  /**
   * @generated from oneof PropertyProto.value
   */
  value: {
    /**
     * @generated from field: int32 intValue = 3;
     */
    value: number;
    case: "intValue";
  } | {
    /**
     * @generated from field: bool boolValue = 4;
     */
    value: boolean;
    case: "boolValue";
  } | {
    /**
     * @generated from field: double doubleValue = 5;
     */
    value: number;
    case: "doubleValue";
  } | {
    /**
     * @generated from field: bytes byteList = 6;
     */
    value: Uint8Array;
    case: "byteList";
  } | {
    /**
     * @generated from field: IntListProto intList = 7;
     */
    value: IntListProto;
    case: "intList";
  } | {
    /**
     * @generated from field: IntMatrixProto intMatrix = 8;
     */
    value: IntMatrixProto;
    case: "intMatrix";
  } | {
    /**
     * @generated from field: EdgeListProto edgeList = 9;
     */
    value: EdgeListProto;
    case: "edgeList";
  } | {
    /**
     * @generated from field: Point2DProto point2D = 10;
     */
    value: Point2DProto;
    case: "point2D";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<PropertyProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "PropertyProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "urn", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "defined", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "intValue", kind: "scalar", T: 5 /* ScalarType.INT32 */, oneof: "value" },
    { no: 4, name: "boolValue", kind: "scalar", T: 8 /* ScalarType.BOOL */, oneof: "value" },
    { no: 5, name: "doubleValue", kind: "scalar", T: 1 /* ScalarType.DOUBLE */, oneof: "value" },
    { no: 6, name: "byteList", kind: "scalar", T: 12 /* ScalarType.BYTES */, oneof: "value" },
    { no: 7, name: "intList", kind: "message", T: IntListProto, oneof: "value" },
    { no: 8, name: "intMatrix", kind: "message", T: IntMatrixProto, oneof: "value" },
    { no: 9, name: "edgeList", kind: "message", T: EdgeListProto, oneof: "value" },
    { no: 10, name: "point2D", kind: "message", T: Point2DProto, oneof: "value" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PropertyProto {
    return new PropertyProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PropertyProto {
    return new PropertyProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PropertyProto {
    return new PropertyProto().fromJsonString(jsonString, options);
  }

  static equals(a: PropertyProto | PlainMessage<PropertyProto> | undefined, b: PropertyProto | PlainMessage<PropertyProto> | undefined): boolean {
    return proto3.util.equals(PropertyProto, a, b);
  }
}

/**
 * @generated from message Point2DProto
 */
export class Point2DProto extends Message<Point2DProto> {
  /**
   * @generated from field: double X = 1;
   */
  X = 0;

  /**
   * @generated from field: double Y = 2;
   */
  Y = 0;

  constructor(data?: PartialMessage<Point2DProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "Point2DProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "X", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 2, name: "Y", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Point2DProto {
    return new Point2DProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Point2DProto {
    return new Point2DProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Point2DProto {
    return new Point2DProto().fromJsonString(jsonString, options);
  }

  static equals(a: Point2DProto | PlainMessage<Point2DProto> | undefined, b: Point2DProto | PlainMessage<Point2DProto> | undefined): boolean {
    return proto3.util.equals(Point2DProto, a, b);
  }
}

/**
 * @generated from message EntityProto
 */
export class EntityProto extends Message<EntityProto> {
  /**
   * @generated from field: int32 urn = 1;
   */
  urn = 0;

  /**
   * @generated from field: int32 entityID = 2;
   */
  entityID = 0;

  /**
   * @generated from field: repeated PropertyProto properties = 3;
   */
  properties: PropertyProto[] = [];

  constructor(data?: PartialMessage<EntityProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "EntityProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "urn", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "entityID", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "properties", kind: "message", T: PropertyProto, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EntityProto {
    return new EntityProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EntityProto {
    return new EntityProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EntityProto {
    return new EntityProto().fromJsonString(jsonString, options);
  }

  static equals(a: EntityProto | PlainMessage<EntityProto> | undefined, b: EntityProto | PlainMessage<EntityProto> | undefined): boolean {
    return proto3.util.equals(EntityProto, a, b);
  }
}

/**
 * @generated from message EntityListProto
 */
export class EntityListProto extends Message<EntityListProto> {
  /**
   * @generated from field: repeated EntityProto entities = 1;
   */
  entities: EntityProto[] = [];

  constructor(data?: PartialMessage<EntityListProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "EntityListProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "entities", kind: "message", T: EntityProto, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EntityListProto {
    return new EntityListProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EntityListProto {
    return new EntityListProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EntityListProto {
    return new EntityListProto().fromJsonString(jsonString, options);
  }

  static equals(a: EntityListProto | PlainMessage<EntityListProto> | undefined, b: EntityListProto | PlainMessage<EntityListProto> | undefined): boolean {
    return proto3.util.equals(EntityListProto, a, b);
  }
}

/**
 * @generated from message ConfigProto
 */
export class ConfigProto extends Message<ConfigProto> {
  /**
   * @generated from field: map<string, string> data = 1;
   */
  data: { [key: string]: string } = {};

  constructor(data?: PartialMessage<ConfigProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "ConfigProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConfigProto {
    return new ConfigProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConfigProto {
    return new ConfigProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConfigProto {
    return new ConfigProto().fromJsonString(jsonString, options);
  }

  static equals(a: ConfigProto | PlainMessage<ConfigProto> | undefined, b: ConfigProto | PlainMessage<ConfigProto> | undefined): boolean {
    return proto3.util.equals(ConfigProto, a, b);
  }
}

/**
 * @generated from message EdgeListProto
 */
export class EdgeListProto extends Message<EdgeListProto> {
  /**
   * @generated from field: repeated EdgeProto edges = 1;
   */
  edges: EdgeProto[] = [];

  constructor(data?: PartialMessage<EdgeListProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "EdgeListProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "edges", kind: "message", T: EdgeProto, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EdgeListProto {
    return new EdgeListProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EdgeListProto {
    return new EdgeListProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EdgeListProto {
    return new EdgeListProto().fromJsonString(jsonString, options);
  }

  static equals(a: EdgeListProto | PlainMessage<EdgeListProto> | undefined, b: EdgeListProto | PlainMessage<EdgeListProto> | undefined): boolean {
    return proto3.util.equals(EdgeListProto, a, b);
  }
}

/**
 * @generated from message EdgeProto
 */
export class EdgeProto extends Message<EdgeProto> {
  /**
   * @generated from field: int32 startX = 1;
   */
  startX = 0;

  /**
   * @generated from field: int32 startY = 2;
   */
  startY = 0;

  /**
   * @generated from field: int32 endX = 3;
   */
  endX = 0;

  /**
   * @generated from field: int32 endY = 4;
   */
  endY = 0;

  /**
   * @generated from field: int32 neighbour = 5;
   */
  neighbour = 0;

  constructor(data?: PartialMessage<EdgeProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "EdgeProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "startX", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "startY", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "endX", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "endY", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "neighbour", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EdgeProto {
    return new EdgeProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EdgeProto {
    return new EdgeProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EdgeProto {
    return new EdgeProto().fromJsonString(jsonString, options);
  }

  static equals(a: EdgeProto | PlainMessage<EdgeProto> | undefined, b: EdgeProto | PlainMessage<EdgeProto> | undefined): boolean {
    return proto3.util.equals(EdgeProto, a, b);
  }
}

/**
 * @generated from message ChangeSetProto
 */
export class ChangeSetProto extends Message<ChangeSetProto> {
  /**
   * @generated from field: repeated ChangeSetProto.EntityChangeProto changes = 1;
   */
  changes: ChangeSetProto_EntityChangeProto[] = [];

  /**
   * @generated from field: repeated int32 deletes = 2;
   */
  deletes: number[] = [];

  constructor(data?: PartialMessage<ChangeSetProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "ChangeSetProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "changes", kind: "message", T: ChangeSetProto_EntityChangeProto, repeated: true },
    { no: 2, name: "deletes", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChangeSetProto {
    return new ChangeSetProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChangeSetProto {
    return new ChangeSetProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChangeSetProto {
    return new ChangeSetProto().fromJsonString(jsonString, options);
  }

  static equals(a: ChangeSetProto | PlainMessage<ChangeSetProto> | undefined, b: ChangeSetProto | PlainMessage<ChangeSetProto> | undefined): boolean {
    return proto3.util.equals(ChangeSetProto, a, b);
  }
}

/**
 * @generated from message ChangeSetProto.EntityChangeProto
 */
export class ChangeSetProto_EntityChangeProto extends Message<ChangeSetProto_EntityChangeProto> {
  /**
   * @generated from field: int32 entityID = 1;
   */
  entityID = 0;

  /**
   * @generated from field: int32 urn = 2;
   */
  urn = 0;

  /**
   * @generated from field: repeated PropertyProto properties = 3;
   */
  properties: PropertyProto[] = [];

  constructor(data?: PartialMessage<ChangeSetProto_EntityChangeProto>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "ChangeSetProto.EntityChangeProto";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "entityID", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "urn", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "properties", kind: "message", T: PropertyProto, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChangeSetProto_EntityChangeProto {
    return new ChangeSetProto_EntityChangeProto().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChangeSetProto_EntityChangeProto {
    return new ChangeSetProto_EntityChangeProto().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChangeSetProto_EntityChangeProto {
    return new ChangeSetProto_EntityChangeProto().fromJsonString(jsonString, options);
  }

  static equals(a: ChangeSetProto_EntityChangeProto | PlainMessage<ChangeSetProto_EntityChangeProto> | undefined, b: ChangeSetProto_EntityChangeProto | PlainMessage<ChangeSetProto_EntityChangeProto> | undefined): boolean {
    return proto3.util.equals(ChangeSetProto_EntityChangeProto, a, b);
  }
}

