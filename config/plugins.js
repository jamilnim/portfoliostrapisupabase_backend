module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'local', // use local storage
        providerOptions: {
          sizeLimit: 10000000, // optional: 10MB max file size
        },
      },
    },
  });
  