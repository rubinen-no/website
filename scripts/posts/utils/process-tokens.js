import { Parser } from 'htmlparser2';

export const processTokens = (tokens) => {
  const output = [];
  const parser = new Parser({
    onopentag(name, attrs) {
      output.push({
        type: 'tag_open',
        nesting: 1,
        meta: {
          tag: 'html-tag',
          attributes: [
            { type: 'attribute', name: 'name', value: name },
            { type: 'attribute', name: 'attrs', value: attrs }
          ]
        }
      });
    },

    ontext(content) {
      if (typeof content === 'string' && content.trim().length > 0)
        output.push({ type: 'text', content });
    },

    onclosetag() {
      output.push({
        type: 'tag_close',
        nesting: -1,
        meta: { tag: 'html-tag' }
      });
    }
  });

  for (const token of tokens) {
    if (token.type.startsWith('html')) {
      parser.write(token.content);
      continue;
    }

    if (token.type === 'inline') token.children = processTokens(token.children);

    output.push(token);
  }

  return output;
};
