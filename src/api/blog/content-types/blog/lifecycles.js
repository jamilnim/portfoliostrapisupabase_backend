'use strict';

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // Handle mainImage
    if (data.mainImage) {
      const main = Array.isArray(data.mainImage) ? data.mainImage[0] : data.mainImage;
      if (main?.url) {
        data.mainImageUrl = main.url.startsWith('http')
          ? main.url
          : process.env.PUBLIC_URL + main.url;
      } else if (main?.provider_metadata?.publicUrl) {
        data.mainImageUrl = main.provider_metadata.publicUrl;
      }
    }

    // Handle subImage
    if (data.subImage) {
      const sub = Array.isArray(data.subImage) ? data.subImage[0] : data.subImage;
      if (sub?.url) {
        data.subImageUrl = sub.url.startsWith('http')
          ? sub.url
          : process.env.PUBLIC_URL + sub.url;
      } else if (sub?.provider_metadata?.publicUrl) {
        data.subImageUrl = sub.provider_metadata.publicUrl;
      }
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    // Handle mainImage
    if (data.mainImage) {
      const main = Array.isArray(data.mainImage) ? data.mainImage[0] : data.mainImage;
      if (main?.url) {
        data.mainImageUrl = main.url.startsWith('http')
          ? main.url
          : process.env.PUBLIC_URL + main.url;
      } else if (main?.provider_metadata?.publicUrl) {
        data.mainImageUrl = main.provider_metadata.publicUrl;
      }
    }

    // Handle subImage
    if (data.subImage) {
      const sub = Array.isArray(data.subImage) ? data.subImage[0] : data.subImage;
      if (sub?.url) {
        data.subImageUrl = sub.url.startsWith('http')
          ? sub.url
          : process.env.PUBLIC_URL + sub.url;
      } else if (sub?.provider_metadata?.publicUrl) {
        data.subImageUrl = sub.provider_metadata.publicUrl;
      }
    }
  },
};
