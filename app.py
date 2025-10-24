from flask import Flask, request, jsonify
import subprocess
import json
import random
from flask_cors import CORS

app = Flask(__name__) 
CORS(app)              

@app.route('/api/para', methods=['GET'])
def get_para():
    para = [
        "It was difficult to explain to them how the diagnosis of certain death had actually given him life. While everyone around him was in tears and upset, he actually felt more at ease. The doctor said it would be less than a year. That gave him a year to live, something he failed to do with his daily drudgery of a routine that had passed as life until then.",
        "Technology has transformed the way we live and work. Communication happens instantly across vast distances. Information flows freely through digital networks. The future holds endless possibilities for innovation and growth.something he failed to do with his daily drudgery of a routine that had passed as life until then.",
        "Mountains rise majestically against the clear blue sky. Rivers carve their paths through ancient valleys. Forests whisper secrets in the gentle breeze. Nature's beauty surrounds us in countless forms, waiting to be discovered. The future holds endless possibilities for innovation and growth.",
         "Throughout history, civilizations have risen and fallen like waves upon the shore. Each left behind fragments of their existence: crumbling monuments, forgotten languages, and stories passed down through generations. Archaeologists piece together these remnants, The future holds endless possibilities for innovation and growth. "      
    ]
    return jsonify({"paragraph": random.choice(para)})

@app.route("/")
def home():
    return "Server is working!"

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    typed = data['typed']
    original = data['original']
    time_ta = str(data['time'])
    
    result = subprocess.run(
        ["typing.exe", typed, original, time_ta],
        capture_output=True,
        text=True
    )
    
    output = result.stdout.strip()
    
    try:
        return jsonify(json.loads(output))
    except Exception as e:
        return jsonify({"error": "Failed to parse output", "raw": output, "exception": str(e)})
    
if __name__ == "__main__":
    app.run(debug=True)