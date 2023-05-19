var islandId = "sy";

$(document).ready(function() {
    show_comment();
    show_likeCnt();

    // 타이핑 효과
    const text = document.getElementById("myname");
    const typewriter = new Typewriter(text, {
        loop: true
    });

    typewriter.typeString('이수연 개새기의 아일랜드')
        .pauseFor(2000)
        .deleteChars(4)
        .typeString('ISLAND')
        .pauseFor(2000)
        .deleteAll()
        .typeString('이수연')
        .pauseFor(2500)
        .start();

    $(document).on("click", ".button_ud", function() {
        var entry = $(this).closest(".card");
        var content = entry.find(".card-body");
        var editForm = entry.find(".edit-form");
        var editBtn = entry.find(".button_ud");
        var deleteBtn = entry.find(".button_del");

        let name = content.find("#commentName_").text();
        let msg = content.find("#commentContent_").text();

        editForm.find("input[name='name']").val(name);
        editForm.find("textarea[name='message']").val(msg);

        deleteBtn.hide();
        editBtn.hide();
        content.hide();
        editForm.show();
    });

    $(document).on("click", ".cancel-btn", function(e) {
        e.preventDefault();
        var entry = $(this).closest(".card");
        var content = entry.find(".card-body");
        var editForm = entry.find(".edit-form");
        var editBtn = entry.find(".button_ud");
        var deleteBtn = entry.find(".button_del");

        editForm.hide();
        deleteBtn.show();
        editBtn.show();
        content.show();
    });

    $(document).on("click", ".submit-btn", function(e) {
        e.preventDefault();
        var entry = $(this).closest(".card");
        var editForm = entry.find(".edit-form");
        var name = editForm.find("input[name='name']").val();
        var msg = editForm.find("textarea[name='message']").val();
        var id = entry.find(".submit-btn").data("id");
        var passwd = entry.find(".submit-btn").data("passwd");
        // console.log(name, msg)
        // console.log("hi")
        // console.log(id)

        swal("비밀번호를 입력하세요", {
            content: "input",
        }).then((value) => {
             //비밀번호 일치여부 확인
            if(passwd==value){
                let formData = new FormData();
                formData.append("_id_give", id);
                formData.append("targetname_give", name);
                formData.append("targetcontent_give", msg);
                formData.append("islandId_give", islandId);
                    
                fetch("/api/update-comment", { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
                    // alert창 커스텀
                    swal({
                        title: "방명록 수정 완료",
                        icon: "success",
                        closeOnClickOutside: false
                    }).then(function () {
                        window.location.reload();
                    });
                });
            } else { //비밀번호가 틀릴 경우
                swal({
                    title: "비밀번호가 틀립니다",
                    icon: "error",
                    closeOnClickOutside: false
                }).then(function () {
                    window.location.reload();
                });
            }
        }); //swal


        // let formData = new FormData();
        // formData.append("_id_give", id);
        // formData.append("targetname_give", name);
        // formData.append("targetcontent_give", msg);
        // formData.append("islandId_give", islandId);

        // fetch('/api/update-comment', { method: "POST", body: formData})
        //     .then((res) => res.json())
        //     .then((data) => {
        //         // alert창 커스텀
        //         swal({
        //             title: "방명록 수정 완료",
        //             icon: "success",
        //             closeOnClickOutside: false
        //         }).then(function () {
        //             window.location.reload();
        //         });
        // });
    });
});
// 좋아요 출력
function show_likeCnt() {
    let formData = new FormData();
    formData.append("islandId_give", islandId);

    fetch('/api/island-get-liked').then((res) => res.json()).then((data) => {
        let rows = data['result'];

        $('.team').empty();
        rows.forEach((a)=> {
            let islandId_receive = a['islandId']
            let likeCnt = 0

            //누구 island인지 판별하는 코드 , 해당 아일랜드에 맞는 좋아요 필드값을 가져와야 하므로.
            if(islandId==islandId_receive){
                likeCnt = a['islandLikeCnt']

                let temp_html = `<div class="circle" onclick="like_island('${islandId_receive}','${likeCnt}')">
                                    <div class="wave-one"></div>
                                    <div class="wave-two"></div>
                                    <div class="wave-three"></div>
                                    <div class="wave-four"></div>
    
                                    <form method="post" id="like-area">
                                        <p id="text1">좋아요</p>
                                        <p id="text2" >${likeCnt}</p>
                                    </form>
                                
                                    <!--<img class="fas fa-moon" src="{{url_for('static', filename = '/image/island.png')}}"></img>-->
                                </div>`
                    
                $('.team').append(temp_html);
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

// 댓글 보이기 (페이지 로딩과 동시에 적용)
function show_comment() {
    let formData = new FormData();    
    formData.append("islandId_give", islandId);

    fetch('/api/comment',{ method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        let rows = data['result']
        $("#comment-list").empty();
        rows.forEach((a) => {
            let _id = a['_id']
            let name = a['commentName']
           // let id = a['commentId']
            let date = a['commentDate']
            let content = a['commentContent']
            let passwd = a['commentPassword']

            let temp_html = `<div class="card" id="card">
                                <div class="card-body">
                                    <p id="commentName_">${name}</p>
                                    <p id="commentContent_">${content}</p>
                                    <span id="commentDate_"class="blockquote-footer">${date}</span>
                                </div>
            
                                <div class="card-button">
                                    <button class="button_ud" id="button_ud">수정</button>
                                    <button class="button_del" id="button_del" onclick="delete_comment('${_id}','${passwd}')">삭제</button>
                                    
                                </div>

                                <form class="edit-form" style="display: none;">
                                    <div class="card-button1">
                                        <input type="text" name="name" placeholder="유저 이름" value="${name}" required>
                                        <textarea name="message" placeholder="내용" required>${content}</textarea>
                                    </div>
                                    <div class="card-button2">
                                        <button class="submit-btn" data-id="${_id}" data-passwd="${passwd}" >저장</button>
                                        <button class="cancel-btn">취소</button>
                                    </div>
                                </form>
                            </div>`

            $("#comment-list").append(temp_html);
        })
    })
}

// 댓글 저장
function save_comment() {
    let pw = $("#commentPassword").val();
    let name = $("#commentName").val();
    let content = $("#commentContent").val();

    let formData = new FormData();
    formData.append("commentPassword_give", pw);
    formData.append("commentName_give", name);
    formData.append("commentContent_give", content);
    formData.append("islandId_give", islandId);

    fetch("/api/comment-save", { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
        // alert창 커스텀
        swal({
            title: "방명록 등록 완료",
            icon: "success",
            closeOnClickOutside: false
        }).then(function () {
            window.location.reload();
        });
    })
}

// 댓글 삭제
function delete_comment(id,passwd) {
    //비밀번호 입력 받는 코드
    // let insertPasswd = prompt("비밀번호를 입력해주세요");

    swal("비밀번호를 입력하세요", {
        content: "input",
    }).then((value) => {
         //비밀번호 일치여부 확인
        if(passwd==value){
            let formData = new FormData();
            formData.append("_id_give", String(id));
            formData.append("islandId_give", islandId);
        
            fetch("/api/delete-comment", { method: "POST", body: formData, }).then((res) => res.json()).then((data) => {
                swal({
                    title: "방명록 삭제 완료",
                    icon: "success",
                    closeOnClickOutside: false
                }).then(function () {
                    window.location.reload();
                });
            })
        } else { //비밀번호가 틀릴 경우
            swal({
                title: "비밀번호가 틀립니다",
                icon: "error",
                closeOnClickOutside: false
            }).then(function () {
                window.location.reload();
            });
        }
    }); //swal
};