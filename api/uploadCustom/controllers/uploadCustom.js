'use strict';
const mime = require('mime-types'); //used to detect file's mime type
const fs = require('fs');
const validateUploadBody = (data = {}, isMulti = false) => {
  const schema = isMulti ? multiUploadSchema : uploadSchema;

  return schema.validate(data, { abortEarly: false }).catch(err => {
    throw strapi.errors.badRequest('ValidationError', { errors: formatYupErrors(err) });
  });
};
module.exports = {
  async uploadCustom(ctx) {
    const {
      request: { body, files: { files } = {} },
    } = ctx;
console.log(files);
    const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
      data: await validateUploadBody(body),
      files,
    });


    /*const rootDir = process.cwd();
    const fileName = 'test.csv';
    const filePath = `${rootDir}/public/uploads/${fileName}`
    const stats = fs.statSync(filePath);
    const uploadedFiles = await strapi.plugins['upload'].services.upload.upload({
      data: await validateUploadBody(body),
      files: {
        path: filePath,
        name: fileName,
        type: mime.lookup(filePath), // mime type of the file
        size: stats.size,
      }
    });*/
    ctx.body = sanitize(uploadedFiles);
  }
};
