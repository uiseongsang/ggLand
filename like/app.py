from flask import Flask, render_template, request, jsonify, redirect
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.5aneadm.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

counts = db["counts"]
count = 0

@app.route("/")
def index():
    global count
    count = counts.find_one()["count"] if counts.find_one() else 0
    return render_template("index.html", count=count)

@app.route("/", methods=["POST"])
def increase():
    global count
    count += 1
    counts.update_one({}, {"$set": {"count": count}}, upsert=True)
    return redirect("/")

if __name__ == "__main__":
    app.run('0.0.0.0', port=5000, debug=True)