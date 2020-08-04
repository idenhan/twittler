// 필터 후 결과값 할당하는 변수, 배열로 선언
let filteringData = [];

dataLoading();

// obj 객체 html로 변환함수 // // 새로운 트윗 받아오는 변수들 선언
function convertToHtml(obj) {
  //1.  li 태그 생성  클래스 이름 작성
  let liElement = document.createElement('li');
  liElement.classList.add('tweets__box');
  //2.  span 엘리먼트 만들기
  let tweetsName = document.createElement('span');
  tweetsName.classList.add('tweets__name');
  tweetsName.textContent = obj.user;

  let tweetsTime = document.createElement('span');
  tweetsTime.classList.add('tweets__time');
  tweetsTime.textContent = obj.createdAt;

  let tweetsComment = document.createElement('div');
  tweetsComment.classList.add('tweets__comment');
  tweetsComment.textContent = obj.message;

  let div = document.createElement('div');
  div.classList.add('tweetsNameAndTime')
  div.appendChild(tweetsName);
  div.appendChild(tweetsTime);

  //3.  span 내용(user,message,createdAt)
  liElement.appendChild(div);
  liElement.appendChild(tweetsComment);
  return liElement;
}

// ulArea comment 추가 함수 
function printComment(comment) {
  let commentElement = convertToHtml(comment);
  let ulArea = document.querySelector('.tweets');
  ulArea.prepend(commentElement);
}
// ulArea comment 출력 함수 
function printComments(data) {
  let ulArea = document.querySelector('.tweets');
  ulArea.innerHTML = "";
  data.forEach(printComment);
}

//기존 default 데이터 출력 함수

//comment 등록 함수  
//1. 사용자 코멘트 DATA 등록
function addComment() {
  let resultObj = {};
  let name = document.querySelector('.nameBlank').value;
  let comment = document.querySelector('.commentBlank').value;
  let time = new Date().format();
  resultObj['user'] = name;
  resultObj['message'] = comment;
  resultObj['createdAt'] = time;
  DATA.push(resultObj);
}
//2. 등록 버튼 onclick 이벤트 부여
let registerButton = document.querySelector('.tweetBtn');
registerButton.onclick = function () {
  alert('트윗이 등록되었습니다')
  addComment();
  let commentElement = convertToHtml(DATA[DATA.length - 1]);
  let name = document.querySelector('.nameBlank');
  let comment = document.querySelector('.commentBlank');
  name.value = '';
  comment.value = '';

  let ulArea = document.querySelector('.tweets');
  ulArea.prepend(commentElement);
  setUserOnclick();
  dataSaving();
};
// check new tweet 버튼 onclick 부여 
let checkButton = document.querySelector('.checkBtn');
checkButton.onclick = function () {
  if (checkButton.textContent === 'Go Back') {
    printComments(DATA);
    checkButton.textContent = 'Check New Tweet';
    setUserOnclick();
  } else {
    //랜덤 생성후 추가 함수
    let newTweet = generateNewTweet();
    DATA.push(newTweet);
    let commentElement = convertToHtml(newTweet);
    let ulArea = document.querySelector('.tweets');
    ulArea.prepend(commentElement);
    setUserOnclick();
    dataSaving();
  }
};
// 사용자 필터 함수 onclick 부여
function setUserOnclick() {
  let commentUserList = document.querySelectorAll('.tweets__name');
  commentUserList.forEach((ele) => {
    console.log('this is giving onclick');
    ele.onclick = function () {
      let username = ele.textContent;
      let checktweetStr = document.querySelector('.checkBtn');
      if (checktweetStr.textContent === 'Check New Tweet') {
        filteringData = DATA.filter((cur) => cur.user === username);
        printComments(filteringData);
        checktweetStr.textContent = 'Go Back'
      }
    }
  })
}

// 데이터 로딩 함수
function dataLoading() {
  if (localStorage.getItem('data') !== null) {
    DATA = JSON.parse(localStorage.getItem('data'));
  }
}



function dataSaving() {
  localStorage.setItem('data', JSON.stringify(DATA));
}

printComments(DATA);
setUserOnclick();




/*
* 버튼 리스트 for 문으로 순회해서  onclick 리스너로 할당
* onclick 함수 내용
* if문으로 checktweet 버튼의 문자열이 무엇인지 판단
* 1. 'check new tweet'이면
*    그 이름으로 데이터 배열 필터 함수로 newdata 생성
*    newdata 를 printComments 함수로 출력
*    checktweet 버튼의 이름  'go back'으로 바꿈
* 2. 'go back' 이면
*    DATA 배열 출력
*    checktweet 버튼의 이름  'check new tweet'으로 변경
*/