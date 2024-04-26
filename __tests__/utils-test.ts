import utils from '../src/utils/utils.ts';

test('데이터 타입 체크하는 함수', () => {
  const result = utils.isNotString('zxc', 12, 'xc');
  expect(false).toBe(result);
});
