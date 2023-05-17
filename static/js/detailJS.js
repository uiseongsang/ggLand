$(document).ready(function(){
    show_Comment();
  });


function posting() {
    //let commentId = $('#commentId').val()
    let commentName = $('#commentName').val()
    let commentContent = $('#commentContent').val()

    let formData = new FormData();
    //formData.append("commentId_give", commentId);
    formData.append("commentName_give", commentName);
    formData.append("commentContent_give", commentContent);

    fetch("/api/comment", { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            alert(data["msg"]);
            window.location.reload();
        });
}

function show_Comment() {
    fetch("/api/comment").then((res) => res.json()).then((data) => {
    let rows = data['result'];

    $('#comments').empty();
    rows.forEach((a)=> {
        let name = a['commentName'];
        let date = a['commentDate'];
        let content = a['commentContent'];

        //console.log(name,date,content)
        let temp_html =`<div class="comment1">
                            <div class="comments">
                                ${date} &nbsp; ${name} :  " ${content} "
                            </div>
                            <div class="btn-area">
                            <button class="update-btn" onclick="location.href='/'">수정</button> <button class="delete-btn" onclick="">삭제</button>
                            </div>
                        </div>
                        <hr/>`

        $('#comments').append(temp_html);

    })
    })
}