from flask import Flask, request, jsonify, make_response
import requests
import os
import logging
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin
from sarvamai import SarvamAI
import json
load_dotenv()
import datetime
app = Flask(__name__)
CORS(app, support_credentials=True)
TAVUS_API_KEY = os.getenv("TAVUS_API_KEY")
TAVUS_API_URL = "https://tavusapi.com/v2/conversations"


sarvamClient = SarvamAI(
api_subscription_key=os.getenv("SARVAM_API_KEY")
)

logging.basicConfig(level=logging.INFO)


@app.route("/start-conversation", methods=["POST"])
def start_conversation():
    cdt = datetime.datetime.now().isoformat()
    payload = {
        "replica_id": os.getenv("TAVUS_REPLICA_ID"),
        "persona_id": os.getenv("TAVUS_PERSONA_ID"),
        "callback_url": os.getenv(
            "TAVUS_CALLBACK_URL", "https://your-real-domain.com/webhook"
        ),
        "conversation_name": request.json.get(
            "conversation_name", "A Meeting with a Potential Client"
        ),
        "conversational_context": request.json.get(
            "context",
            f"You are the company's AI video engagement agent, replacing traditional web forms. Your job is to warmly greet potential clients, ask them what services theyre looking for, and help assess whether their needs align with the companys offerings. If their request is not a fit, kindly suggest reaching out via email. Be helpful, trustworthy, and human-like. Current date and time is {cdt}.",
            
            # THIS IS WHERE WE WOULD ALSO NEED TO PASS THE CAL.COM NEXT 10 FREE SLOTS JSON TOO
        ),
        "custom_greeting": request.json.get("greeting", "Hey there!"),
        "properties": {
            "max_call_duration": 3600,
            "participant_left_timeout": 10,
            "participant_absent_timeout": 300,
            "enable_recording": True,
            "enable_closed_captions": True,
            "apply_greenscreen": False,
            "language": "english",
            "recording_s3_bucket_name": "conversation-recordings",
            "recording_s3_bucket_region": "us-east-1",
            "aws_assume_role_arn": "",
        },
    }

    headers = {"Content-Type": "application/json", "x-api-key": TAVUS_API_KEY}

    try:
        response = requests.post(TAVUS_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        if e.response is not None:
            print("Tavus Error Response:", e.response.status_code, e.response.text)
        else:
            print("Tavus Error:", str(e))
        return jsonify({"error": "Failed to start Tavus conversation"}), 500


@app.route("/")
def home():
    return "Tavus Conversation Starter is Running!"

@app.route("/end/<conversation_id>", methods=["POST"])
def end_conversation(conversation_id):
    url = f"https://tavusapi.com/v2/conversations/{conversation_id}/end"
    headers = {"x-api-key": TAVUS_API_KEY}
    try:
        response = requests.request("POST", url, headers=headers)
        response.raise_for_status()
        return jsonify({"message": "Conversation ended successfully"}), 200
    except requests.exceptions.RequestException as e:
        if e.response is not None:
            print("Tavus Error Response:", e.response.status_code, e.response.text)
        else:
            print("Tavus Error:", str(e))
        return jsonify({"error": "Failed to end conversation"}), 500

#fetch the conversation details from conversation id
@app.route("/conversation/<conversation_id>", methods=["GET", "OPTIONS"])
def get_conversation(conversation_id):
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        flask_response = make_response()
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        return flask_response
        
    headers = {"Content-Type": "application/json", "x-api-key": TAVUS_API_KEY}
    url = f"{TAVUS_API_URL}/{conversation_id}?verbose=true"
    try:
        tavus_response = requests.get(url, headers=headers)
        tavus_response.raise_for_status()
        finalResp = tavus_response.json()
        
        # Find transcript in events array
        transcript = None
        for i, event in enumerate(finalResp.get("events", [])):
            if "properties" in event and "transcript" in event["properties"]:
                transcript_data = event["properties"]["transcript"]
                # If transcript has more than 1 item, skip the first one (index 1:)
                # Otherwise, take from index 0
                if len(transcript_data) > 1:
                    transcript = transcript_data[1:]
                else:
                    # transcript = transcript_data[0:] if transcript_data else []
                    transcript = None
                break
                
        if transcript is None:
            flask_response = make_response(jsonify({"error": "No transcript found in conversation"}))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
            return flask_response, 404
            
        # stringify the transcript
        transcript_str = json.dumps(transcript)

        ai_response = sarvamClient.chat.completions(
            messages=[
                {
                "role": "system", "content": '''
                    You are a helpful assistant that summarizes the conversation transcript and provides the following details in JSON format:
                    {
                        "ai_summary": <string[max:1000]>,
                        "requirements": <string[max:1500]>,
                        "requirement_summary": <string[max:100]>,
                        "notes": <string[max:1000]>,
                        "suggestions": <string[max:1000]>,
                        "client_name": <string[max:100]>,
                        "client_email": <string[max:100]>,
                        "client_phone": <string[max:100]>,
                    }
                    Fill N/A for any missing fields.
                '''
                },
                {
                    "role": "user",
                    "content": f"Here is the conversation transcript:\n{transcript_str}\n\nPlease summarize the conversation and provide the required details in JSON format. Make sure to provide valid, parseable JSON without any explanation text."
                }
            ],
        )
        
        # Get the response content
        content_str = ai_response.choices[0].message.content
        print("Raw response content:", content_str)
        
        try:
            # Parse the content as JSON
            parsed_json = json.loads(content_str)
            print("Parsed JSON:", parsed_json)
            
            dUrl = os.environ.get("DASHBOARD_URL", "http://localhost:8000")
            dUrl = dUrl + "/api/moms/new"
            payload = {
                "client_name": parsed_json.get("client_name", "N/A"),
                "client_phone": parsed_json.get("client_phone", "N/A"),
                "client_email": parsed_json.get("client_email", "N/A"),
                "ai_summary": parsed_json.get("ai_summary", "N/A"),
                "requirements": parsed_json.get("requirements", "N/A"),
                "requirement_summary": parsed_json.get("requirement_summary", "N/A"),
                "notes": parsed_json.get("notes", "N/A"),
                "suggestions": parsed_json.get("suggestions", "N/A"),
            }
            dashboard_headers = {
                "Authorization": "Bearer " + os.getenv("DASHBOARD_API_KEY", ""),
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            dashboard_response = requests.request("POST", dUrl, json=payload, headers=dashboard_headers)
            dashboard_response.raise_for_status()
            
            # Create response with proper CORS headers
            flask_response = make_response(jsonify({
                "message": "Conversation details saved successfully",
                "data": parsed_json
            }))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
            return flask_response

        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            # Return the raw content if parsing fails
            flask_response = make_response(jsonify({"raw_content": content_str, "error": "Could not parse as JSON"}))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
            return flask_response

    except requests.exceptions.RequestException as e:
        if e.response is not None:
            print("Tavus Error Response:", e.response.status_code, e.response.text)
        else:
            print("Tavus Error:", str(e))
        flask_response = make_response(jsonify({"error": "Failed to fetch conversation details"}))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "GET, OPTIONS")
        return flask_response, 500


@app.route("/free-slots", methods=['GET', 'OPTIONS'])
def get_free_slots():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        flask_response = make_response()
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response
        
    url = "https://api.cal.com/v2/schedules"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + os.getenv("CAL_API_KEY", ""),
        "cal-api-version": "2024-06-11"
    }
    
    try:
        cal_response = requests.get(url, headers=headers)
        cal_response.raise_for_status()
        
        data = cal_response.json()
        
        # fetch existing bookings
        bookings_url = "https://api.cal.com/v2/bookings"
        bookings_response = requests.get(bookings_url, headers=headers)
        
        if bookings_response.status_code == 200:
            bookings_data = bookings_response.json()
            
            for booking in bookings_data['data']['bookings']:
                # append unavailable slots to the data
                start = booking['startTime']  # Fixed: use "start" instead of "startTime"
                end = booking['endTime']      # Fixed: use "end" instead of "endTime"
                if start and end:
                    # Append unavailable slots to the data
                    data["data"].append({
                        "start": start,
                        "end": end,
                        "type": "unavailable"
                    })
            # Create response with proper CORS headers
            flask_response = make_response(jsonify(data))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
            return flask_response
        else:
            flask_response = make_response(jsonify({
                "error": f"Failed to fetch bookings, status code: {bookings_response.status_code}"
            }))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
            return flask_response, bookings_response.status_code
            
    except requests.exceptions.RequestException as e:
        print(f"Cal.com API Error: {e}")
        flask_response = make_response(jsonify({
            "error": "Failed to fetch data from Cal.com API"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, 500
    except json.JSONDecodeError:
        flask_response = make_response(jsonify({
            "error": "Failed to parse response from Cal.com"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, 500
    
@app.route("/new-schedule", methods=['POST', 'OPTIONS'])
def create_new_schedule():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        flask_response = make_response()
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response
    
    # Check if request has JSON data
    if not request.is_json:
        flask_response = make_response(jsonify({
            "error": "Request must be JSON with Content-Type: application/json"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, 400
    
    # Check if JSON data exists
    if not request.json:
        flask_response = make_response(jsonify({
            "error": "No JSON data provided"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, 400
        
    # validate required fields
    required_fields = ["name", "email", "phone", "start"]
    for field in required_fields:
        if field not in request.json:
            flask_response = make_response(jsonify({
                "error": f"Missing required field: {field}"
            }))
            flask_response.headers.add("Access-Control-Allow-Origin", "*")
            flask_response.headers.add("Access-Control-Allow-Headers", "*")
            flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
            return flask_response, 400
    # Prepare the payload for booking
    url = "https://api.cal.com/v2/bookings"
    
    payload = {
        "start": request.json.get("start"),
        "attendee": {
            "name": request.json.get("name"),
            "email": request.json.get("email"),
            "phoneNumber": request.json.get("phone"),
            "language": "en",
            "timeZone": "Asia/Kolkata",  # Adjust timezone as needed
        },
        "eventTypeId": int(os.getenv("CAL_EVENT_ID", "2698509")),
    }
    
    headers = {
        "Content-Type": "application/json",
        "cal-api-version": "2024-08-13",
        "Authorization": "Bearer " + os.getenv("CAL_API_KEY", ""),
    }
    
    booking_response = requests.post(url, json=payload, headers=headers)
    if booking_response.status_code == 201:
        booking_data = booking_response.json()
        # Create response with proper CORS headers
        flask_response = make_response(jsonify(booking_data))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, 201
    else:
        print(f"Cal.com API Error: {booking_response.status_code} - {booking_response.text}")
        flask_response = make_response(jsonify({
            "error": f"Failed to create booking, status code: {booking_response.status_code}, message: {booking_response.text}"
        }))
        flask_response.headers.add("Access-Control-Allow-Origin", "*")
        flask_response.headers.add("Access-Control-Allow-Headers", "*")
        flask_response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return flask_response, booking_response.status_code
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)  # REMOVE debug=True IN PRODUCTION
