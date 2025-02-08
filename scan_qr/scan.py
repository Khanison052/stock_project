import cv2
import time  # นำเข้า time สำหรับการหน่วงเวลา

# เปิดกล้อง
cap = cv2.VideoCapture(0)

# สร้างตัวแปล QRCodeDetector
detector = cv2.QRCodeDetector()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # แปลงภาพเป็นขาวดำ
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # ตรวจจับ QR code จากภาพขาวดำ
    value, pts, qr_code = detector.detectAndDecode(gray_frame)

    if value:
        print(f'QR Code Value: {value}')
        # วาดกรอบรอบๆ QR Code ที่ตรวจพบ
        pts = pts.astype(int)  # แปลงจุดเป็น integer
        frame = cv2.polylines(frame, [pts], isClosed=True, color=(0, 255, 0), thickness=5)
        
        # เพิ่มการหน่วงเวลา 5 วินาทีหลังจากการสแกนเสร็จ
        time.sleep(5)  # หน่วงเวลา 5 วินาที

    # แสดงผลภาพขาวดำพร้อมกรอบที่วาด
    gray_frame_with_border = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # แปลงภาพสีที่มีกรอบเป็นขาวดำ
    cv2.imshow("QR Code Scanner - Black and White with Border", gray_frame_with_border)

    # กด 'q' เพื่อออกจากการสแกน
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# ปิดกล้องและหน้าต่าง
cap.release()
cv2.destroyAllWindows()
