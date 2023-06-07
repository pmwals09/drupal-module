export function hexColor(props, propName, componentName) {
  if (
    props[propName] &&
    !/^#([\da-fA-F]{6,8}|[\da-fA-F]{3})$/.test(props[propName])
  ) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}': ${props[propName]}. Validation failed.`
    );
  }
  return null;
}
