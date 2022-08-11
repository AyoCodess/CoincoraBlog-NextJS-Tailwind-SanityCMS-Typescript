import {
  createImageUrlBuilder,
  createCurrentUserHook,
  createClient,
} from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-10-21', // Learn more: https://www.sanity.io/docs/api-versioning
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === 'production',
};

//set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// function's to build the image urls
export const urlFor = (source) => {
  imageUrlBuilder(config).image(source);
};

// helper function to get the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
