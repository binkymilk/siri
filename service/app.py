from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from sklearn.externals import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

classifier = joblib.load("classifier.joblib")


@app.route("/prediction", methods=['POST'])
@cross_origin()
def predict_iris():
    response = make_response()
    try:
        formData = request.json
        data = [val for val in formData.values()]
        prediction = classifier.predict(np.array(data).reshape(1, -1))
        types = {0: "Iris Setosa", 1: "Iris Versicolour", 2: "Iris Virginica"}
        response = jsonify({
            "statusCode": 200,
            "status": "Prediction made",
            "result": types[prediction[0]]
        })
        return response
    except Exception as error:
        return jsonify({
            "statusCode": 500,
            "status": "Could not make prediction",
            "error": str(error)
        })
