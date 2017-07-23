import * as dynamoose from 'dynamoose'

var _schema: Object = {};

export class DataSchemaBase {
  static getSchema(): dynamoose.Schema { throw new Error('Please set DataSchema decorator to your class extends DataSchemaBase') }
}
/**
 * Actually I want to use defaultdict(Python)
 * @param classname DataSchema name
 * @param key Key of DataSchema
 */
function digSchema(classname: string, key: string) {
  if (!_schema[classname]) _schema[classname] = {};
  if (!_schema[classname][key]) _schema[classname][key] = {};
}
function addAttribute(classname: string, key: string, attribute: string, value: any) {
  digSchema(classname, key);
  _schema[classname][key][attribute] = value;
}

export function DataSchema(clazz: any): any {
  let classname = clazz.name;
  clazz.getSchema = () => {
    let schema = new dynamoose.Schema(_schema[classname]);
    let instance = new clazz();
    for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
      if (key === 'constructor') continue;
      schema.method(key, instance[key])
    }
    return schema;
  }
  return clazz;
}
export function AttributeType(type: any): Function {
  return (clazz: DataSchemaBase, key: string): void => {
    addAttribute(clazz.constructor.name, key, 'type', type);
  }
}
export function HashKey(clazz: DataSchemaBase, key: string): void {
  addAttribute(clazz.constructor.name, key, 'hashKey', true);
}
export function RangeKey(clazz: DataSchemaBase, key: string): void {
  addAttribute(clazz.constructor.name, key, 'rangeKey', true);
}
export function Required(clazz: DataSchemaBase, key: string): void {
  addAttribute(clazz.constructor.name, key, 'required', true);
}
export function Index(object: any): Function {
  return (clazz: DataSchemaBase, key: string): void => {
    addAttribute(clazz.constructor.name, key, 'index', object);
  }
}
export function Default(object: any): Function {
  return (clazz: DataSchemaBase, key: string): void => {
    addAttribute(clazz.constructor.name, key, 'default', object);
  }
}
export function ForceDefault(clazz: DataSchemaBase, key: string): void {
  addAttribute(clazz.constructor.name, key, 'forceDefault', true);
}
export function Validate(object: any): Function {
  return (clazz: DataSchemaBase, key: string): void => {
    addAttribute(clazz.constructor.name, key, 'validate', object);
  }
}
export function Set(func: Function): Function {
  return (clazz: DataSchemaBase, key: string): void => {
    addAttribute(clazz.constructor.name, key, 'set', func);
  }
}
export function Get(func: Function): Function {
  return (clazz: DataSchemaBase, key: string): void => {
    addAttribute(clazz.constructor.name, key, 'get', func);
  }
}
export function ToDynamo(func: Function): Function {
  return (clazz: DataSchemaBase, key: string): void => {
    addAttribute(clazz.constructor.name, key, 'ToDynamo', func);
  }
}
export function FromDynamo(func: Function): Function {
  return (clazz: DataSchemaBase, key: string): void => {
    addAttribute(clazz.constructor.name, key, 'fromDynamo', func);
  }
}
export function Trim(clazz: DataSchemaBase, key: string): void {
  addAttribute(clazz.constructor.name, key, 'trim', true);
}
export function Lowercase(clazz: DataSchemaBase, key: string): void {
  addAttribute(clazz.constructor.name, key, 'lowercase', true);
}
export function Uppercase(clazz: DataSchemaBase, key: string): void {
  addAttribute(clazz.constructor.name, key, 'uppercase', true);
}
