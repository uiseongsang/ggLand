from urllib import parse
from bson.objectid import ObjectId
from flask import Flask, render_template, request, jsonify, redirect
from datetime import datetime
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca=certifi.where()

#본인 mongoDB URL로 바꿔주세요
#client = MongoClient('mongodb+srv://sparta:test@cluster0.y7qib6f.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
client = MongoClient('mongodb+srv://sparta:test@limchaeyoung.boi4rwj.mongodb.net/?retryWrites=true&w=majority')
#본인 DataBase 명으로 바꿔주세요
db = client.dbsparta

@app.route('/')
def home():
    return render_template('detail.html')

#방명록 데이터 DB에 저장
@app.route("/api/comment-save/cy", methods=["POST"])
def comment_post():
    #commentId_receive = request.form['commentId_give']
    commentName_receive = request.form['commentName_give']
    commentContent_receive = request.form['commentContent_give']
    date = str(datetime.now()) 
    print(commentName_receive,commentContent_receive,date)

    doc = {
        #'commentId':commentId_receive,
        'commentName':commentName_receive,
        'commentDate': date,
        'commentContent':commentContent_receive}
    #본인 table명으로 변경해주세요
    db.cy_post.insert_one(doc)
    return jsonify({'msg':'아일랜드에 발자취를 남겼다!'})


#방명록 삭제 
@app.route("/api/delete-comment/cy", methods=["POST"])
def delete_post():
    receive_id = str(request.form['_id_give']) # request.form
    #본인 table명으로 변경해주세요
    db.cy_post.delete_one({'_id' : ObjectId(receive_id)})
    return redirect("/api/comment/cy")


#방명록 내용 출력
@app.route("/api/comment/cy", methods=["GET"])
def comments_get():    
    #본인 table명으로 변경해주세요
    all_comments = list(db.cy_post.find({},{'_id':True, 'commentId':True, 'commentName':True, 'commentDate':True, 'commentContent':True}))
    
    for comment in all_comments:
        comment['_id'] = str(comment['_id'])
    #print(all_comments)
    return jsonify({'result': all_comments})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5003, debug=True)