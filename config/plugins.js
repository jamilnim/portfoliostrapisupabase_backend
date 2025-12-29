'use strict';

const path = require('path');

module.exports = ({ env }) => ({
  upload: {
    config: {
      // Use the local custom provider
      provider: path.resolve(__dirname, '../src/providers/upload/supabase.js'),
      providerOptions: {}, // No options needed
    },
  },
});
