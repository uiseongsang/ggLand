# 프로젝트 소개
우리만의 이야기를 담을 수 있는 ”팀 소개 웹페이지”


# <b>Stacks</b>
-------------
# Environment
<p>
  <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</p>

# Development
-------------
<p>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/jquery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
</p>
<p>
  <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
</p>

# Communication
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">

----------------
# 프로젝트 설명
* 이 프로젝트는 각각 팀원이 각자의 개성있고 본인의 아일랜드를 독립적으로 표현할수 있도록 설계를 하게 되었습니다. 그래서 메인페이지에 맞는 html,css,js파일이 있고 상세페이지는 각자 5명 들어가기 떄문에 각자의 html, css, js파일이 존재합니다. 대표적 기능을 소개 하자면 CRUD 방식인데 저희는 추가,수정,삭제 이런 흔한 표현 보다 흔적 남기기, 흔적 지우기, 흔적 고치기 이런식으로 재밌게 표현을 했고 좋아요 누르는 기능까지 추가적으로 구현했습니다. 그래서 이 서비스가 달성하고자 하는 목표는 우리 팀원 5명의 아일랜드를 개성있게 표현하기입니다.

---------------
# 주요 기능

## 🏝️ 흔적 남기기 - 방명록 추가하기
* 본인이 쓰고 싶은 이름 및 글을 적습니다.
  수정 및 삭제 할 떄 필요한 비밀번호로 적고 방명록 작성 버튼누르면 추가됩니다.

## 🏝️ 흔적 나열하기 - 방명록 보여주기
* MongoDB에 저장되어 있는 모든 흔적들을 보여줍니다.

## 🏝️ 흔적 고치기 - 방명록 수정
* 타인이 고의적으로 수정하기를 막기 위해 비밀번호를 매칭시켜야 수정하도록 만들었습니다.
  그래서 본인이 방명록을 적었을 때 사용했던 비밀번호로 본인 방명록을 수정해야합니다.

## 🏝️ 흔적 지우기 - 방명록 삭제
* 수정하기하고 같은 방법으로 본인이 사용한 비밀번호를 사용하여 방명록을 삭제를 합니다.

## 🏝️ 좋아요
 * 좋아요 버튼을 누르면 +1씩 카운트됩니다.

---------
API 명세서

| 기능 | Method | URL | Request | Response | 
| :-: | :-: | :-: | :-: | :-: |
| 게시물 전체 조회 | POST | /api/comments | islandId_give  | {"result": [all_comments]} |
| 게시물 저장 | POST | /api/save-comment | {commentName_give, commentContent_give, commentPassword_give,islandId_give }  | {"msg": "나의 발자취를 남겼다"} |
| 게시물 수정 | UPDATE or PUT | /api/update-comment | {_id_give, targetname_give, targetcontent_give, islandId_give }  | {"msg": "나의 발자취를 고쳤다"} |
| 게시물 삭제 | DELETE | /api/delete-comment | {_id_give, islandId_give}  | {"msg":"나의 발자취를 지웠다"}|
| 좋아요 불러오기 | GET | /api/island-get-liked | X | {"result": [all_likeCnts]} |
| 좋아요 추가하기 | GET | /api/island-get-liked | { id_give, cnt_give} | {"msg": complete} |
| 방명록 | GET | /api/island-get-liked | { id_give, cnt_give} | {"msg": complete} |

-------------

# 화면 기록
-----------
## 메인페이지
![ezgif com-video-to-gif](https://github.com/uiseongsang/ggLand/assets/40707686/3c214bfc-a378-424f-b375-d22e878974c8)

## 흔적 남기기 && 좋아요
![ezgif com-video-to-gif-2](https://github.com/uiseongsang/ggLand/assets/40707686/a3b9fd8c-f41f-4b85-8f34-34b505f01d97)

## 흔적 고치기 && 흔적 지우기
![ezgif com-video-to-gif-3](https://github.com/uiseongsang/ggLand/assets/40707686/1aa8615b-f195-4af2-bcf4-91d57b3bc953)

## 두번쨰 아일랜드
![ezgif com-video-to-gif-4](https://github.com/uiseongsang/ggLand/assets/40707686/e8c2c6ef-0bc1-4097-ba2a-7e787eaea2d3)

## 나머지 아일랜드
![ezgif com-video-to-gif-5](https://github.com/uiseongsang/ggLand/assets/40707686/f6c0bedb-6ebb-4d12-8e87-ce8b775787a1)

## 플레이그라운드 
![ezgif com-video-to-gif-6](https://github.com/uiseongsang/ggLand/assets/40707686/fbd7129f-8ea9-4782-b898-72adae111b65)


# 트러블슈팅
* 기술적으로 가장 어려웠던 부분은 각자의 아일랜드 즉 각자의 데이터를 다루는 문제에서 각자의 db table명을 지칭하는 부분에서 어려움이 있었는데 db.table명을 각자의 js 파일에서 각자의 이니셜 변수값을 백엔드로 전달 해줘서 table명을 get_collection 메소드 매개변수안에 넣어서 해당 아일랜드의 DB table를 지칭할수 있었습니다.
-------------------
<p>
  영상링크: https://youtu.be/mK0RekyzNeg
</p>
<p>
  S.A: https://velog.io/@uiseongsang/내일배움캠프-A-6조개새기조-개발자-새내기조
</p>

