import utils from '../src/utils/utils';

test('데이터 타입 체크하는 함수', () => {
  const result = utils.isValidStringData('zxc', 12, 'xc');
  expect(false).toBe(result);
});
