import * as ts_comment from '../src/index';

it('should return correctly', () => {
  expect(
    ts_comment.gets(`
    class X {}
    // comment 1
    const y = 0;
    /* comment 2 */
    function z() {}
  `),
  ).toMatchSnapshot();
});
