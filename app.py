from flask import Flask, render_template, request, jsonify, redirect
from datetime import datetime
from bson.objectid import ObjectId
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca=certifi.where()

# 상의성: mongodb+srv://sparta:test@cluster0.fzjk15v.mongodb.net/?retryWrites=true&w=majority
client = MongoClient('mongodb+srv://sparta:test@cluster0.fzjk15v.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.guestbook

@app.route('/')
def home():
    return render_template('detail.html')

@app.route("/api/comment", methods=["POST"])
def comment_post():
    commentName_receive = request.form['commentName_give']
    commentContent_receive = request.form['commentContent_give']
    date = str(datetime.now()) 
    #print(commentName_receive,commentContent_receive,date)

    doc = {
        'commentName':commentName_receive,
        'commentDate': date,
        'commentContent':commentContent_receive}
    
    db.guestbook.insert_one(doc)
    return jsonify({'msg':'아일랜드에 발자취를 남겼다!'})

#방명록 내용 수정
@app.route("/api/update-comment", methods=["POST"])
def comment_update():
    receive_id = str(request.form['_id_give'])
    receive_target_name = request.form['targetname_give']
    receive_target_content = request.form['targetcontent_give']
    #print(receive_id,receive_target_name,receive_target_content)

    # string에서 ObjectId로 변경
    comment_id = ObjectId(receive_id)
    db.guestbook.update_one({'_id': comment_id}, {'$set': {'commentName': receive_target_name, 'commentContent': receive_target_content}})
    return jsonify({'msg':'나의 발자취를 고쳤다!'})

#방명록 내용 출력
@app.route("/api/comment", methods=["GET"])
def comments_get():
    ## 부분 별로 True, false 가능!!
    #list(db.guestbook.find({},{'_id':True, 'commentName':True, 'commentDate':True, 'commentContent':True}))    
    all_comments = list(db.guestbook.find({}))
    for comment in all_comments:
        comment['_id'] = str(comment['_id'])
    #print(all_comments)
    return jsonify({'result': all_comments})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5003, debug=True)