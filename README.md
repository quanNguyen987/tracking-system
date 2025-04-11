# Hệ thống Phát Hiện Đối Tượng Tình Nghi

Dự án phát hiện và cảnh báo đối tượng tình nghi bằng Raspberry Pi 4 và giao diện web real-time.

## Tổng quan
- **Phần cứng**: Raspberry Pi 4 với camera.
- **Nhận diện**: MediaPipe Face Mesh để phát hiện khuôn mặt.
- **Web**: Preact + Firebase Authentication + Flask để stream video real-time.

## Cài đặt
### Web
1. `npm install` - Cài dependencies.
2. `npm run dev` - Chạy server phát triển tại `http://localhost:5173`.

### Raspberry Pi
1. Cài Python, OpenCV, MediaPipe, Flask:
   ```bash
   pip3 install opencv-python mediapipe flask flask-cors