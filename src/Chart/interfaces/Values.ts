export type Value = Record<string, any>;
export type Series = Array<Array<Value>>;

type Values = Array<Value> | Series;

export default Values;
