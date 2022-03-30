from flask import Flask, send_file, jsonify
from flask_cors import CORS
from datetime import date

"""
To run:

pip3 install flask
python app.py
"""

APP = Flask(__name__)
CORS(APP)
BASE_URL = "/api/v1"
SAMPLE_FILE_PATH = "sample_template.xlsx"
TEMPLATES = [
    {
        "templateId": 1,
        "templateName": "template_1",
        "dateCreated": date.today().strftime("%d/%m/%Y")
    },
    {
        "templateId": 2,
        "templateName": "template_2",
        "dateCreated": date.today().strftime("%d/%m/%Y")
    },
    {
        "templateId": 3,
        "templateName": "template_3",
        "dateCreated": date.today().strftime("%d/%m/%Y")
    }
]

@APP.route(BASE_URL + "/hello", methods=["GET"])
def greet():
    return "Hello World!"

@APP.route(BASE_URL + "/getTemplates", methods=["GET"])
def getTemplates():
    return jsonify(TEMPLATES)

@APP.route(BASE_URL + "/uploadTemplate", methods=["POST", "OPTIONS"])
def uploadTemplate():
    global TEMPLATES
    newId = max(map(lambda template: template["templateId"], TEMPLATES)) + 1
    TEMPLATES.append({
        "templateId": newId,
        "templateName": f"template_{newId}",
        "dateCreated": date.today().strftime("%d/%m/%Y")
    })
    return {"templateId": newId}

@APP.route(BASE_URL + "/deleteTemplate/<id>", methods=["DELETE"])
def deleteTemplate(id):
    global TEMPLATES
    toRemove = next((template for template in TEMPLATES if template["templateId"] > 3), None)
    if (toRemove):
        TEMPLATES.remove(toRemove)
    return {"templateId": id}

@APP.route(BASE_URL + "/downloadSampleTemplate", methods=["GET"])
def downloadSampleTemplate():
    return send_file(SAMPLE_FILE_PATH, as_attachment = True)

@APP.route(BASE_URL + "/downloadTemplate", methods=["POST"])
def downloadTemplate():
    return send_file(SAMPLE_FILE_PATH, as_attachment = True)

@APP.route(BASE_URL + "/generateData", methods=["POST"])
def generateData():
    return send_file(SAMPLE_FILE_PATH, as_attachment = True)

# driver code
if __name__ == "__main__":
    APP.run(host = "localhost", port = 8080)
