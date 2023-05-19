var islandId = "hy";

$(document).ready(function () {
    show_Comment();
    show_likeCnt();

    // 방명록 수정 버튼 코드
    $(document).on("click", ".update-btn", function() {
        var entry = $(this).closest(".comment1");
        var content = entry.find(".comments");
        var editForm = entry.find(".edit-form");
        var editBtn = entry.find(".update-btn");
        var deleteBtn = entry.find(".delete-btn");
        
        var name = entry.find(".edit-form2").data("name");
        var msg = entry.find(".edit-form2").data("content");

        console.log(name,msg);
        
        editForm.find("input[name='name']").val(name);
        editForm.find("textarea[name='message']").val(msg);

        deleteBtn.hide();
        editBtn.hide();
        content.hide();
        editForm.show();
    });
    
    // 방명록 수정 클릭 후 취소 버튼 코드
    $(document).on("click", ".cancel-btn", function(e) {
        e.preventDefault();
        var entry = $(this).closest(".comment1");
        var content = entry.find(".comments");
        var editForm = entry.find(".edit-form");
        var editBtn = entry.find(".update-btn");
        var deleteBtn = entry.find(".delete-btn");

        editForm.hide();
        deleteBtn.show();
        editBtn.show();
        content.show();
    });

    // 방명록 수정 클릭 후 저장 버튼 코드
    $(document).on("click", ".submit-btn", function(e) {
        e.preventDefault();
        var entry = $(this).closest(".comment1");
        var editForm = entry.find(".edit-form");
        var name = editForm.find("input[name='name']").val();
        var msg = editForm.find("textarea[name='message']").val();
        var id = entry.find(".submit-btn").data("id");
        var passwd = entry.find(".submit-btn").data("passwd");

        let insertPasswd = prompt("비밀번호를 입력해주세요");

        if(insertPasswd==passwd){
            let formData = new FormData();
            formData.append("_id_give", id);
            formData.append("targetname_give", name);
            formData.append("targetcontent_give", msg);
            formData.append("islandId_give", islandId);

            fetch('/api/update-comment', { method: "POST", body: formData})
                .then((res) => res.json())
                .then((data) => {
                    alert(data["msg"]);
                    window.location.reload();
            });
        }else{ //비밀번호가 틀릴 경우
            alert("비밀번호가 틀립니다.");
            window.location.reload();
        }
    });
});

function show_Comment() {
    let formData = new FormData();    
    formData.append("islandId_give", islandId);

    fetch("/api/comment", { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        let rows = data['result'];

        $('#comments').empty();
        rows.forEach((a) => {
            let _id = a['_id'];
            let name = a['commentName'];
            let date = a['commentDate'];
            let content = a['commentContent'];
            let passwd = a['commentPassword'];

            let temp_html = `<div class="comment1">
                                <div class="comments">
                                    ${date} &nbsp; <span class="edit-form2" data-name="${name}" data-content="${content}">${name}</span> :  " ${content}</span> "
                                </div>
                                <div class="btn-area">
                                    <button class="update-btn">수정</button> 
                                    <button class="delete-btn" onclick="delete_comment('${_id}','${passwd}')">삭제</button>
                                    <div class="edit-area">
                                        <form class="edit-form" style="display: none;">
                                            <div class="edit-name">
                                                <input type="text" name="name" placeholder="유저 이름" value="${name}" required>
                                                <button class="submit-btn" data-id="${_id}" data-passwd="${passwd}">저장</button>
                                            </div>
                                            <div class="edit-content-area">
                                                <textarea class="edit-content" name="message" placeholder="내용" required>${content}</textarea>
                                                <button class="cancel-btn">취소</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <hr/>`;

            $('#comments').append(temp_html);
        })
    })
}


// 좋아요 출력
function show_likeCnt() {
    let formData = new FormData();
    formData.append("islandId_give", islandId);

    fetch('/api/island-get-liked').then((res) => res.json()).then((data) => {
        let rows = data['result'];

        $('#like-area').empty();
        rows.forEach((a)=> {
            let islandId_receive = a['islandId']
            let likeCnt = 0

            //누구 island인지 판별하는 코드 , 해당 아일랜드에 맞는 좋아요 필드값을 가져와야 하므로.
            if(islandId==islandId_receive){
                likeCnt = a['islandLikeCnt']

                let temp_html = `<div>
                                    <button class="likeCnt" type="button" id="likeButton" onclick="like_island('${islandId_receive}','${likeCnt}')"><p> 🧡${likeCnt}</p> </button>
                                </div>`;
                $('#like-area').append(temp_html)
            }
        })
    });
}

// 좋아요 버튼 클릭
function like_island(id,cnt) {
    
    //island id 비교,
    if(id==islandId){
        let formData = new FormData();
        cnt++;
        formData.append("id_give", id);
        formData.append("cnt_give", cnt);
        
        fetch("/api/island-add-liked", { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
            window.location.reload();
        })
    }
}


// 방명록 저장
function posting() {
    //let commentId = $('#commentId').val()
    let commentName = $('#commentName').val()
    let commentContent = $('#commentContent').val()
    let commentPassword = $('#commentPassword').val()

    console.log(commentName,commentContent,commentPassword)

    let formData = new FormData();
    //formData.append("commentId_give", commentId);
    formData.append("commentName_give", commentName);
    formData.append("commentContent_give", commentContent);
    formData.append("commentPassword_give", commentPassword);
    formData.append("islandId_give", islandId);
    console.log(commentName,commentContent,commentPassword,islandId)
    fetch("/api/comment-save", { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            alert(data["msg"]);
            window.location.reload();
        });
}


// 방명록 삭제
function delete_comment(id,passwd) {
    //비밀번호 입력 받는 코드
    let insertPasswd = prompt("비밀번호를 입력해주세요");

    //비밀번호 일치여부 확인
    if(passwd==insertPasswd){
        let formData = new FormData();
        formData.append("_id_give", String(id));
        formData.append("islandId_give", islandId);
        
        fetch("/api/delete-comment", { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
            alert(data["msg"])
            window.location.reload();
        })
    }else{ //비밀번호가 틀릴 경우
        alert("비밀번호가 틀립니다.");
        window.location.reload();
    }
    
}