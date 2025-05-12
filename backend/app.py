from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import predict_bp




app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
@app.route('/')
def index():
    print("Server is running on port 5000")
app.register_blueprint(predict_bp)



if __name__ == '__main__':
    app.run(debug=True)


