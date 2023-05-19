from urllib import parse
from datetime import datetime
from bson.objectid import ObjectId
from flask import Flask, render_template, request, jsonify, redirect
app = Flask(__name__)

from pymongo import MongoClient
import certifi
ca=certifi.where()

#본인 mongoDB URL로 바꿔주세요
#다른 분들 내 DB에 저장해야 함.
client = MongoClient('mongodb+srv://sparta:test@limchaeyoung.boi4rwj.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/playGround')
def show_playGround():
    return render_template('playGround.html')

@app.route('/detailUS')
def show_detailUS():
    return render_template('detailUS.html')

@app.route('/detailCY')
def show_detailCY():
    return render_template('detailCY.html')

@app.route('/detailSI')
def show_detailSI():
    return render_template('detailSI.html')

@app.route('/detailSY')
def show_detailSY():
    return render_template('detailSY.html')

@app.route('/detailHY')
def show_detailHY():
    return render_template('detailHY.html')

#좋아요 불러오기
@app.route("/api/island-get-liked", methods=["GET"])
def island_getlike():
    #islandId_receive에 맞는 cnt 값 가져오기
    all_likeCnts = list(db.island.find({},{'_id':False}))
    return jsonify({'result': all_likeCnts})


#좋아요 추가하기
@app.route("/api/island-add-liked", methods=["POST"])
def island_addlike():
    id_receive = request.form['id_give']
    cnt_receive = request.form['cnt_give']
    
    print(id_receive,cnt_receive)
    
    db.island.update_one({'islandId':id_receive},{'$set':{'islandLikeCnt':cnt_receive}})
    return jsonify({'msg':'complete'})
    

#방명록 데이터 DB에 저장
@app.route("/api/comment-save", methods=["POST"])
def comment_post():
    #commentId_receive = request.form['commentId_give']
    commentName_receive = request.form['commentName_give']
    commentContent_receive = request.form['commentContent_give']
    commentPassword_receive = request.form['commentPassword_give']
    islandId = request.form['islandId_give']

    date = str(datetime.now().strftime('%Y-%m-%d %H:%M'))
    
    doc = {
        #'commentId':commentId_receive,
        'commentName' : commentName_receive,
        'commentContent' : commentContent_receive,
        'commentPassword' : commentPassword_receive,
        'commentDate' : date}
    
    print(islandId)
    #본인 table명으로 변경해주세요
    tableStr = islandId + "_post"
    
    db.get_collection(tableStr).insert_one(doc)
    return jsonify({'msg':'아일랜드에 발자취를 남겼다!'})


#방명록 내용 출력
@app.route("/api/comment", methods=["POST"])
def comments_get():        
    islandId = request.form['islandId_give']
    tableStr = islandId + "_post"
    
    all_comments = list(db.get_collection(tableStr).find({},
    {'_id':True, 'commentId':True, 'commentName':True, 'commentDate':True, 'commentContent':True, 'commentPassword':True}))
    
    for comment in all_comments:
        comment['_id'] = str(comment['_id'])
    #print(all_comments)
    return jsonify({'result': all_comments})


#방명록 내용 수정
@app.route("/api/update-comment", methods=["POST"])
def comment_update():
    receive_id = str(request.form['_id_give'])
    receive_target_name = request.form['targetname_give']
    receive_target_content = request.form['targetcontent_give']
    islandId = request.form['islandId_give']
    
    # string에서 ObjectId로 변경
    comment_id = ObjectId(receive_id)
    
    tableStr = islandId + "_post"
    db.get_collection(tableStr).update_one({'_id': comment_id}, {'$set': {'commentName': receive_target_name, 'commentContent': receive_target_content}})
    return jsonify({'msg':'나의 발자취를 고쳤다!'})


#방명록 삭제 
@app.route("/api/delete-comment", methods=["POST"])
def delete_post():
    receive_id = str(request.form['_id_give']) # request.form
    islandId = request.form['islandId_give']
    
    tableStr = islandId + "_post"
    db.get_collection(tableStr).delete_one({'_id' : ObjectId(receive_id)})
    return jsonify({'msg':'나의 발자취를 지웠다!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5004, debug=True)