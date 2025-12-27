// path: config/plugins.js
module.exports = ({ env }) => ({
    // Upload plugin configuration
    upload: {
      config: {
        provider: "local", // ✅ use local storage
        providerOptions: {
          sizeLimit: 100000000, // optional, in bytes (100MB here)
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  });
  