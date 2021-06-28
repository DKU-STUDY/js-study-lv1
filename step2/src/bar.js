export default function bar() {

  return Array(5).fill(`
    템플릿 리터럴을 사용해봅시다.
    안녕하세요
  `).join('\n');
}