import * as dynamoose from 'dynamoose'

import {
  DataSchemaBase,
  DataSchema,
  AttributeType,
  HashKey,
  Validate
} from './index'

@DataSchema
export class CatDataSchema extends DataSchemaBase {
  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
  }
  @HashKey
  @AttributeType(String)
  @Validate((v) => { return v >= 100; })
  id: number
  @AttributeType(String)
  name: string
  toString() {
    return 'cat: ' + this.id + ' - ' + this.name;
  }
}

interface CatModelSchema extends dynamoose.Model<CatDataSchema>, CatDataSchema { }

export class Cat {
  static TableName: string = 'Cat'
  static Schema = CatDataSchema.getSchema();
  static Model = dynamoose.model<CatDataSchema, any, CatModelSchema>(
    Cat.TableName,
    Cat.Schema
  )
  static async scan(filter?: object): Promise<dynamoose.ScanResult<CatModelSchema>> {
    let result = await Cat.Model.scan(filter).exec();
    if (!result) throw new Error('Failed Get');
    return result;
  }
  static async getAll(): Promise<dynamoose.ScanResult<CatModelSchema>> {
    return Cat.scan();
  }
}