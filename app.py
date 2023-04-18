'''
    A simple flask server
'''
from flask import Flask, send_from_directory, request, jsonify
from content_analysis import analyze_article

app = Flask(__name__)


@app.route("/analyze", methods=["POST"])
def analyze():
    payload = request.get_json()

    article_text = payload.get('text')

    return jsonify(analyze_article(article_text)), 200


@app.route('/<path:path>', methods=['GET'])
def send_report(path):
    return send_from_directory('static', path)
