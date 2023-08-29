export const getImageUrl = (image?: string | Types.CloudinaryImage) => {
  const imageUrl = typeof image === 'string' ? image : image?.[0]?.url;

  if (!imageUrl || imageUrl === 'unresolved') return '';

  if (imageUrl.startsWith('//')) return imageUrl.replace('//', 'https://');

  return imageUrl;
};

export const fromCamelCaseText = (text?: string) => {
  const result = text?.replace(/([A-Z])/g, ' $1') || '';
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const formatProjectMapLink = (projectMapLink: Types.ProjectMapLink) => {
  const { dynamicInputValues = {}, path } = projectMapLink || {};
  return Object.keys(dynamicInputValues || {}).reduce(
    (acc, key) => acc.replace(`:${key}`, dynamicInputValues[key]),
    path
  );
};
