$(document).ready(function () {
    show_Comment();
});

// 방명록 저장
function posting() {
    //let commentId = $('#commentId').val()
    let commentName = $('#commentName').val()
    let commentContent = $('#commentContent').val()
    let commentPassword = $('#commentPassword').val()
    let today = new Date()
    let commentDate = dateFormat(today)

    console.log(commentName,commentContent,commentPassword,commentDate)

    let formData = new FormData();
    //formData.append("commentId_give", commentId);
    formData.append("commentName_give", commentName);
    formData.append("commentContent_give", commentContent);
    formData.append("commentPassword_give", commentPassword);
    formData.append("commentDate_give", commentDate);

    fetch("/api/comment-save/cy", { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            alert(data["msg"]);
            window.location.reload();
        });
}

// 댓글 삭제
function delete_comment(num1) {
    let formData = new FormData();
    formData.append("_id_give", String(num1));
    fetch("/api/delete-comment/cy", { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
        alert("삭제 완료!")
        window.location.reload();
    })
}

//댓글 출력 기능
function show_Comment() {
    fetch("/api/comment/cy").then((res) => res.json()).then((data) => {
        let rows = data['result'];

        $('#comments').empty();
        rows.forEach((a) => {
            let _id = a['_id'];
            let name = a['commentName'];
            let date = a['commentDate'];
            let content = a['commentContent'];

            let temp_html = `<div class="comment1">
                                <div class="comments">
                                    ${date} &nbsp; ${name} :  " ${content} "
                                </div>
                                <div class="btn-area">
                                <button class="update-btn">수정</button> 
                                <button class="delete-btn" onclick="delete_comment('${_id}')">삭제</button>
                                </div>
                            </div>
                            <hr/>`

            $('#comments').append(temp_html);
        })
    })
}

//Date Format 기능
function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
}