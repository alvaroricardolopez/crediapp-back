'use strict';

const _ = require('lodash');
const { sanitizeEntity } = require('strapi-utils');
const validateSettings = require('../validation/settings');
const validateUploadBody = require('../validation/upload');

const sanitize = (data, options = {}) => {
  return sanitizeEntity(data, {
    model: strapi.getModel('file', 'upload'),
    ...options,
  });
};

module.exports = {
  async uploadFilesC(ctx) {
    const {
      request: { body, files: { files } = {} },
    } = ctx;
    console.log(JSON.stringify(files));
   // const custom_files = {...files,path}
    const uploadedFiles = await strapi.plugins.upload.services.upload.upload({
      data: await validateUploadBody(body),
      files,
    });

    ctx.body = sanitize(uploadedFiles);
  },
};
