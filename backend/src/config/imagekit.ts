import ImageKit from 'imagekit';
import { env } from './env';

let imageKitInstance: ImageKit | null = null;

export const getImageKitClient = (): ImageKit | null => {
  if (imageKitInstance) {
    return imageKitInstance;
  }

  if (!env.IMAGEKIT_PUBLIC_KEY || !env.IMAGEKIT_PRIVATE_KEY || !env.IMAGEKIT_URL_ENDPOINT) {
    return null;
  }

  imageKitInstance = new ImageKit({
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
  });

  return imageKitInstance;
};

export const isImageKitConfigured = (): boolean => {
  return Boolean(
    env.IMAGEKIT_PUBLIC_KEY &&
    env.IMAGEKIT_PRIVATE_KEY &&
    env.IMAGEKIT_URL_ENDPOINT &&
    !env.IMAGEKIT_PUBLIC_KEY.includes('your_imagekit')
  );
};
