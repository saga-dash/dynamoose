import * as dynamoose from 'dynamoose'
/*
dynamoose.AWS.config.update({
  accessKeyId: 'Your AWS Access Key ID',
  secretAccessKey: 'Your AWS Secret Access Key',
  region: 'us-east-1'
});
*/

import { Cat, CatDataSchema } from './models/Cat'

let cat = new Cat.Model(new CatDataSchema(666, 'Garfield'));
cat.save().then(() => {
  Cat.getAll().then(result => {
    result.forEach(element => {
      console.log(element.toString());
    });
  })
})
