'use strict';

/**
 * Lifecycle hooks for Blog content type
 * Automatically copies media URLs to text fields:
 *  - mainImage → mainImageUrl
 *  - subImage → subImageUrl
 * This works on create and update.
 */

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // Copy mainImage URL if exists
    if (data.mainImage && data.mainImage.url) {
      data.mainImageUrl = data.mainImage.url;
    }

    // Copy subImage URL if exists
    if (data.subImage && data.subImage.url) {
      data.subImageUrl = data.subImage.url;
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    // Update mainImageUrl if mainImage changed
    if (data.mainImage && data.mainImage.url) {
      data.mainImageUrl = data.mainImage.url;
    }

    // Update subImageUrl if subImage changed
    if (data.subImage && data.subImage.url) {
      data.subImageUrl = data.subImage.url;
    }
  },
};
