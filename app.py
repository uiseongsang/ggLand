from datetime import datetime
from urllib import parse
from bson.objectid import ObjectId
from flask import Flask, render_template, request, jsonify, redirect
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient('mongodb+srv://sparta:test@cluster0.y7qib6f.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
client = MongoClient('mongodb+srv://sparta:test@limchaeyoung.boi4rwj.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('detail.html')

#방명록 내용 출력
@app.route("/api/comment/cy", methods=["GET"])
def member_get():
    all_comments = list(db.cy_post.find({}, {'_id':True, 'commentId':True, 'commentName':True, 'commentDate':True, 'commentContent':True}))
    # ObjectId 값을 String 형식으로 변환
    for comment in all_comments:
        comment['_id'] = str(comment['_id'])
    return jsonify({'result':all_comments})

#방명록 저장 
@app.route("/api/save-comment/cy", methods=["POST"])
def member_post():
    commentId_receive = request.form['commentId_give']
    commentName_receive = request.form['commentName_give']
    commentContent_receive = request.form['commentContent_give']
    commentDate_recieve = str(datetime.now().date()) 

    doc = {
        'commentId':commentId_receive,
        'commentName':commentName_receive,
        'commentDate': commentDate_recieve,
        'commentContent':commentContent_receive}
    
    db.cy_post.insert_one(doc)
    return jsonify({'msg':'아일랜드 합류 완료!'})


#방명록 삭제 
@app.route("/api/delete-comment/cy", methods=["POST"])
def delete_post():
    receive_id = str(request.form['_id_give']) # request.form
    db.cy_post.delete_one({'_id' : ObjectId(receive_id)})
    return redirect("/api/comment/cy")

if __name__ == '__main__':
    app.run('0.0.0.0', port=5003, debug=True)