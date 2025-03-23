from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow requests from React

# Load the ML model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)
with open("fertilizer.pkl", "rb") as file:
    fertilizer_model = pickle.load(file)
@app.route("/", methods=["GET"])  # Home route for testing
def home():
    return "Flask server is running!"

# Define a mapping of predicted numbers to crop names
CROP_MAPPING = {
    0: "rice", 1: "maize", 2: "chickpea", 3: "kidney beans",
    4: "pigeon peas", 5: "moth beans", 6: "mung bean", 7: "black gram",
    8: "lentil", 9: "pomegranate", 10: "banana", 11: "mango",
    12: "grapes", 13: "watermelon", 14: "muskmelon", 15: "apple",
    16: "orange", 17: "papaya", 18: "coconut", 19: "cotton",
    20: "jute", 21: "coffee"
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        data = request.get_json()

        # Convert input into a format the model expects
        input_features = np.array([[data["N"], data["P"], data["K"],
                                    data["temperature"], data["humidity"],
                                    data["ph"], data["rainfall"]]])
        
        # Make prediction
        prediction = model.predict(input_features)[0]  # Model returns a number

        # Convert number to crop name
        crop_name = CROP_MAPPING.get(int(prediction), "Unknown crop")

        return jsonify({"crop": crop_name})
    
    except Exception as e:
        return jsonify({"error": str(e)})
@app.route('/recommend_fertilizer', methods=['POST'])
def recommend_fertilizer():
    try:
        data = request.get_json()
        features = np.array([[data["temperature"], data["humidity"], data["moisture"], data["soil_type"], data["crop_type"], data["nitrogen"], data["potassium"], data["phosphorous"]]])
        prediction = fertilizer_model.predict(features)
        return jsonify({"fertilizer": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
