from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.y7qib6f.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

import requests
from bs4 import BeautifulSoup

from datetime import datetime

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/guestbook", methods=["POST"])
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
    
    db.guestbook.insert_one(doc)
    return jsonify({'msg':'아일랜드 합류 완료!'})

@app.route("/guestbook", methods=["GET"])
def member_get():
    all_comments = list(db.guestbook.find({},{'_id':False}))
    return jsonify({'result':all_comments})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)