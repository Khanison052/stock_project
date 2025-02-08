from flask import Flask, request, jsonify, send_file, render_template
import qrcode
import json
import io
from flask_cors import CORS

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)  # เปิดให้เว็บสามารถเรียก API ได้

@app.route("/")
def home():
    return render_template("index.html")  # โหลดไฟล์ index.html

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    try:
        product_data = request.json  
        product_json = json.dumps(product_data)

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4
        )
        qr.add_data(product_json)
        qr.make(fit=True)
        qr_img = qr.make_image(fill="black", back_color="white")

        img_io = io.BytesIO()
        qr_img.save(img_io, format="PNG")
        img_io.seek(0)

        return send_file(img_io, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
