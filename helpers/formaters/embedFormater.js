const iconInfo = (icon, content) => {
  return `:${icon}: \u200B \u200B${content}`;
};

const verticalSpacer = (size = 0) => {
  return "\n\u200B".repeat(size);
};

export const embedFormater = {
  iconInfo,
  verticalSpacer
};
