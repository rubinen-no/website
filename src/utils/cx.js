export const cx = (
  cls,
  cls_obj
) => {
  if (!cls) return '';

  if (!cls_obj && typeof cls !== 'string') {
    return `${Object.keys(cls)
      .filter((classname) => cls[classname])
      .join(' ')}`.trim();
  }

  return `${(cls).trim()} ${
    cls_obj
      ? Object.keys(cls_obj)
        .filter((classname) => cls_obj[classname])
        .join(' ')
      : ''
  }`.trim();
};
