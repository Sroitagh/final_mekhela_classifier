from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for your app

# Load your TensorFlow model
model_path = 'C:/Users/asus/Desktop/sroitaproject/imageclassifier_3_100.h5'  # Replace this with your actual model path
model = load_model(model_path)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Function to preprocess the image
def preprocess_image(image):
    img = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_COLOR)
    resized_img = cv2.resize(img, (256, 256))
    normalized_img = resized_img / 255.0
    return normalized_img

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        processed_img = preprocess_image(file)
        input_image = np.expand_dims(processed_img, axis=0)
        prediction = model.predict(input_image)
        
        # Modify this logic based on your model's output
        predicted_label = "Powerloom" if prediction[0][0] > 0.5 else "Handloom"

        confidence = float(prediction[0][0]) if prediction[0][0] > 0.5 else float(1 - prediction[0][0])
        confidence = round(confidence, 2)


        output = {'predicted_label': predicted_label, 'confidence': confidence}
        return jsonify(output)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=False)
