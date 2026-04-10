import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

declare global {
  interface Window {
    FaceMesh: any;
    Hands: any;
    Camera: any;
  }
}

const Tracker = ({ setEmotion }: any) => {
  const webcamRef = useRef<Webcam>(null);
  let camera: any = null;
  let isMounted = true;
  useEffect(() => {
    
    const faceMesh = new window.FaceMesh({
      locateFile: (file: any) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      selfieMode: true,
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const hands = new window.Hands({
      locateFile: (file: any) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results: any) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];

        // --- Logic Miệng ---
        const topLipY = landmarks[13].y;
        const bottomLipY = landmarks[14].y;
        const mouthOpen = bottomLipY - topLipY;

        // --- Logic Chân mày ---
        // Tính khoảng cách dọc giữa chân mày và mắt cho cả 2 bên
        const leftEyebrowDistance = landmarks[159].y - landmarks[52].y;
        const rightEyebrowDistance = landmarks[386].y - landmarks[282].y;

        // Trung bình cộng độ nhướn mày của 2 bên
        const eyebrowRaise = (leftEyebrowDistance + rightEyebrowDistance) / 2;

        // --- Kết hợp nhận diện cảm xúc ---
        let currentEmotion = "Bình thường";
        // console.log(`eyebrow: ${eyebrowRaise}`);

        if (mouthOpen > 0.05 && eyebrowRaise > 0.04) {
          currentEmotion = "Ngạc nhiên";
        } else if (mouthOpen > 0.05) {
          currentEmotion = "Hả";
        } else if (
          Math.abs(leftEyebrowDistance - rightEyebrowDistance) > 0.02
        ) {
          currentEmotion = "Sigma";
        } else if (eyebrowRaise > 0.045) {
          currentEmotion = "wtf?";
        } else if (eyebrowRaise < 0.03) {
          currentEmotion = "Tức giận";
        }
        setEmotion(currentEmotion);
      }
    });

    hands.onResults((results: any) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const handLandmarks = results.multiHandLandmarks[0];

        // Các chỉ số đầu ngón tay (Tip): Ngón trỏ(8), Giữa(12), Áp út(16), Út(20)
        // Các chỉ số khớp gốc (PIP): Ngón trỏ(6), Giữa(10), Áp út(14), Út(18)
        const tips = [8, 12, 16, 20];
        const pips = [6, 10, 14, 18];

        let fingersUp = 0;
        for (let i = 0; i < tips.length; i++) {
          // Nếu Y của đầu ngón nhỏ hơn Y của khớp (nghĩa là cao hơn trên màn hình)
          if (handLandmarks[tips[i]].y < handLandmarks[pips[i]].y) {
            fingersUp++;
          }
        }

        // Riêng ngón cái (trục X): So sánh X đầu ngón với X khớp tùy theo tay trái/phải
        // Để đơn giản, nếu fingersUp === 4 và thêm ngón cái nữa thì là xòe cả bàn tay
        if (fingersUp >= 4) {
          setEmotion("Dừng");
        } else if (handLandmarks[12].y < handLandmarks[10].y) {
          setEmotion("Fuck");
        }
      }
    });

    if (webcamRef.current && webcamRef.current.video) {
      camera = new window.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current?.video });
          await hands.send({ image: webcamRef.current?.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => {
      isMounted = false;
      if (camera) camera.stop();
      faceMesh.close();
      hands.close();
    };
  }, []);

  return (
    <div className="flex-1 flex justify-center">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-[80%] scale-x-[-1] border-2 border-amber-50"
      />
    </div>
  );
};

export default Tracker;
