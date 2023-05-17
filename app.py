from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@limchaeyoung.boi4rwj.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('detail.html')

@app.route("/member", methods=["POST"])
def member_post():
    sample_receive = request.form['sample_give']
    print(sample_receive)
    return jsonify({'msg':'POST 연결 완료!'})

#방명록 내용 출력
@app.route("/api/comment", methods=["GET"])
def member_get():    
    all_comment = list(db.cy_post.find({},{'_id':False}))
    return jsonify({'result': all_comment})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5003, debug=True)