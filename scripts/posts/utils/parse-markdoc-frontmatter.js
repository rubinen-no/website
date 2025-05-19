import yaml from 'js-yaml';

export const parseMarkdocFrontmatter = (ast) => {
  return ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {};
};
