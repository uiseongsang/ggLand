// 클릭 이벤트를 등록합니다.
document.querySelector("button").addEventListener("click", (event) => {
    // 기본 이벤트를 취소합니다.
    event.preventDefault();
  
    // 버튼을 누르면 POST 요청을 전송합니다.
    fetch("/", {
      method: "POST",
    })
      .then(() => {
        // 페이지를 새로고침합니다.
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  });
  