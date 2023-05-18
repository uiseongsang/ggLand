$(document).ready(function() {
    show_Comment();

    $(document).on("click", ".update-btn", function() {
        var entry = $(this).closest(".comment1");
        var content = entry.find(".comments");
        var editForm = entry.find(".edit-form");
        var editBtn = entry.find(".update-btn");
        var deleteBtn = entry.find(".delete-btn");

        var name = content.find("p:first-child").text();
        var msg = content.find("p:last-child").text();

        editForm.find("input[name='name']").val(name);
        editForm.find("textarea[name='message']").val(msg);

        deleteBtn.hide();
        editBtn.hide();
        content.hide();
        editForm.show();
    });

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

    $(document).on("click", ".submit-btn", function(e) {
        e.preventDefault();
        var entry = $(this).closest(".comment1");
        var editForm = entry.find(".edit-form");
        var name = editForm.find("input[name='name']").val();
        var msg = editForm.find("textarea[name='message']").val();
        var id = entry.find(".submit-btn").data("id");
        console.log(name, msg)
        console.log("hi")
        console.log(id)

        let formData = new FormData();
        formData.append("_id_give", id);
        formData.append("targetname_give", name);
        formData.append("targetcontent_give", msg);

        fetch('/api/update-comment', { method: "POST", body: formData})
            .then((res) => res.json())
            .then((data) => {
                alert(data["msg"]);
                window.location.reload();
            });
    });
});

function posting() {
    let commentName = $('#commentName').val();
    let commentContent = $('#commentContent').val();

    let formData = new FormData();
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
    fetch("/api/comment")
        .then((res) => res.json())
        .then((data) => {
            let rows = data['result'];

            $('#comments').empty();
            rows.forEach((a) => {
                let _id = a['_id'];
                let name = a['commentName'];
                let date = a['commentDate'];
                let content = a['commentContent'];
                // console.log("ID is ")
                // console.log(_id)
                let temp_html = `
                    <div class="comment1">
                        <div class="comments">
                            <p>${name}</p>
                            <p>${content}</p>
                            ${date}&nbsp;  
                        </div>
                        <div class="btn-area">
                            <button class="update-btn">수정</button>
                            <button class="delete-btn" onclick="">삭제</button>
                            <form class="edit-form" style="display: none;">
                                <input type="text" name="name" placeholder="유저 이름" value="${name}" required>
                                <textarea name="message" placeholder="내용" required>${content}</textarea>
                                <button class="submit-btn" data-id="${_id}" >저장</button>
                                <button class="cancel-btn">취소</button>
                            </form>
                        </div>
                    </div>
                `;
                $('#comments').append(temp_html);
            });
        });
}
