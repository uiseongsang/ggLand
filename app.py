from flask import Flask, render_template, request, jsonify, redirect
from datetime import datetime
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca=certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.fzjk15v.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.guestbook

@app.route('/')
def home():
    return render_template('detail.html')

@app.route("/api/comment", methods=["POST"])
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
    
    db.guestbook.insert_one(doc)
    return jsonify({'msg':'아일랜드에 발자취를 남겼다!'})

#방명록 내용 출력
@app.route("/api/comment", methods=["GET"])
def comments_get():    
    all_comments = list(db.guestbook.find({},{'_id':True, 'commentId':True, 'commentName':True, 'commentDate':True, 'commentContent':True}))
    
    for comment in all_comments:
        comment['_id'] = str(comment['_id'])
    #print(all_comments)
    return jsonify({'result': all_comments})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5003, debug=True)