import "./App.css";
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const MEME_MAP = {
  "Bình thường": "https://media.tenor.com/WK1cs2WmrLwAAAAM/bruh-meme.gif",
  "Ngạc nhiên": "https://media.tenor.com/_zWYqfZdneIAAAAM/shocked-face-shocked-meme.gif",
};

function App() {
  const [emotion, setEmotion] = useState("");
  const webcamRef = useRef(null);
  useEffect(() => {
    const faceMesh = new window.FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      selfieMode: true,
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];

        const topLipY = landmarks[13].y;
        const bottomLipY = landmarks[14].y;

        const mouthOpen = bottomLipY - topLipY;

        if (mouthOpen > 0.05) {
          setEmotion("Ngạc nhiên");
        } else {
          setEmotion("Bình thường");
        }
      }
    });

    if (webcamRef.current && webcamRef.current.video) {
      const camera = new window.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center">
      <div className="flex-1 flex">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-[100%] scale-x-[-1]"
        />
      </div>
      <div className="flex-1 flex items-center justify-center flex-col">
        <h1 className="text-white">{`Cảm xúc: ${emotion}`}</h1>
        <img src={MEME_MAP[emotion]} alt="emotion" className="w-[80%]"/>
      </div>
    </div>
  );
}

export default App;
