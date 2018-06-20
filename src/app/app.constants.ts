import { MimeTypes } from './enums/mime-types.enum';

export const MAX_ALLOWED_IMAGE_SIZE: number = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES: MimeTypes[] = [
    MimeTypes.IMAGE_PNG,
    MimeTypes.IMAGE_JPEG,
];
