/*
  description : implementaion todoList using Vanilla JS
  e-mail : cksgnlcjswoo@naver.com
  author : 김찬휘 */
fetch('/').then( res=> res.json()).then(data=> {
  console.log(data.data)
})