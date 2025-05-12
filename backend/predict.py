# backend/predict.py

from flask import Blueprint, request, jsonify
import joblib

# Create Blueprint
predict_bp = Blueprint('predict', __name__)

# Load model once when this module is imported
model = joblib.load('spam_model_logistic.joblib')

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data.get('message')

    if not message:
        return jsonify({'error': 'No message provided'}), 400

    prediction = model.predict([message])
    result = "Not Spam" if prediction[0] == 0 else "Spam"

    return jsonify({'prediction': result})
