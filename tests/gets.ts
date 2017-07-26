import { gets } from '../src/index';

const content = `
  // comment 1
  /* comment 2 */
`;

it('should return correctly', () => {
  expect(gets(content)).toMatchSnapshot();
});

it('should return correctly with custom callback', () => {
  expect(gets(content, comment => `<!-- ${comment} -->`)).toMatchSnapshot();
});
