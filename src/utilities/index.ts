export const getMediaUrl = (media?: string | Types.CloudinaryImage | { path?: string }) => {
  let mediaUrl: string | undefined;

  if (typeof media === 'string') {
    mediaUrl = media;
  } else {
    mediaUrl = Array.isArray(media) ? media?.[0]?.url || media?.[0]?.src : media?.path;
  }

  if (!mediaUrl || mediaUrl === 'unresolved') return '';

  if (mediaUrl.startsWith('//')) return mediaUrl.replace('//', 'https://');

  return mediaUrl;
};

export const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, '');
};

export const fromCamelCaseText = (text?: string) => {
  const result = text?.replace(/([A-Z])/g, ' $1') || '';
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const formatProjectMapLink = (projectMapLink?: Types.ProjectMapLink) => {
  if (!projectMapLink) return projectMapLink;
  const { dynamicInputValues = {}, path } = projectMapLink || {};
  return Object.keys(dynamicInputValues || {}).reduce(
    (acc, key) => acc?.replace(`:${key}`, dynamicInputValues[key]),
    path
  );
};
