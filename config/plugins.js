'use strict';

const path = require('path');

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: path.resolve(__dirname, '../src/providers/upload/supabase.js'),
      providerOptions: {},
    },
  },
});
