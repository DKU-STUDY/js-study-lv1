# js-study-lv1

## 들어가기 전에

pr 테스트를 수정해주세요
다시 수정해주세요

### Editor 혹은 IDE

- [VSCode](https://code.visualstudio.com/)
  - 대부분의 프론트엔드 개발자가 사용하는 **무료** `에디터`
  - 장점
    - 강력한 플러그인 지원
    - 직관적인 UI
    - 빠름
  - 단점
    - 설치 직후 다운 받아야 하는 것들이 너무 많음
    - 즉, 커스텀이 힘듦
- [Intellij](https://www.jetbrains.com/ko-kr/idea/)
  - 대부분의 개발자가 사용하는 **유료** `IDE`
  - 장점
    - 학생 이메일이 있을 경우 무료로 `Ultimate` 사용 가능
    - 필요한 모든 기능이 탑재되어 있음
  - 단점
    - 기본적으로 기능이 너무 많아서 헷갈림
    - 고사양 PC가 아닐 경우 버벅임


### git

> git 명령어에 대해 이해해야 합니다.

- [git download](https://git-scm.com/)
- [git 간편 안내서](https://rogerdudler.github.io/git-guide/index.ko.html)
  
### git 명령어 요약

`git` 설치가 완료되었다면

- `mac`의 경우 terminal을 열어서 `git`을 입력하여 설치 되었음을 확인 
- `window`의 경우 폴더 혹은 바탕화면에서 마우스 우클릭으로 `git bash` 존재 여부 확인

```bash

########## 설치한 직후에 email, name 설정 ##########
$ git config --global user.name "junilhwang"          # 본인의 github id 입력
$ git config --global user.email "junil.h@kakao.com"  # 본인의 github email 입력
#################################################

# 프로젝트 코드 가져오기
$ git clone https://github.com/DKU-STUDY/js-study-lv1

# 프로젝트 폴더로 이동하기
$ cd js-study-lv

# 원격 저장소 존재 여부 확인
$ git remote  
> origin # origin은 `https://github.com/DKU-STUDY/js-study-lv1`의 별칭으로 등록된 원격 저장소

# 테스트 파일 추가 
$ echo "테스트 파일 추가" > test.txt

# git 파일 추가 
$ git add test.txt

# 파일에 대한 커밋 로그 작성
$ git commit -m "테스트 파일 추가"

# 커밋 로그를 원격 저장소에 업로드
$ git push origin main

# 위의 명령어는 다음 명령어와 똑같음
$ git push https://github.com/DKU-STUDY/js-study-lv1 main
```

* 잘 이해가 되지 않을 경우 디스코드 채널에 질문 남겨주세요!

### Github

- Github Pull Request에 대해 이해해야 합니다.
- 이 [동영상](https://youtu.be/pR5SNFyzdg8)을 보면서 튜토리얼을 진행해주세요.

## 스터디 과정 

- [1주차: [워밍업] Todo List 만들기](./step1)
- [2주차: Webpack + TodoList 리팩토링](./step2)
- [3주차: ExpressJS로 API 서버 만들기](./step3)
- [4주차: API 연동](./step4)
- [5주차: 배포하기](./step5)
