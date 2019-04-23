export const rem = px => {
  return `${px /
    parseFloat(
      getComputedStyle(document.body).getPropertyValue("font-size")
    )}rem`;
};
