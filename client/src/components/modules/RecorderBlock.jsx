// import Recorder from "recorder-js";
// import React, { useState } from "react";
// import "./RecorderBlock.css";

// const RecorderBlock = () => {
//   const [audioContext, setAudioContext] = useState(null);
//   const [recorder, setRecorder] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [blobs, setBlobs] = useState([]);
//   const [finalBlob, setFinalBlob] = useState(null);

//   const initializeRecorder = () => {
//     const context = new window.AudioContext();
//     setAudioContext(context);

//     navigator.mediaDevices
//       .getDisplayMedia({ video: true, audio: true })
//       .then((stream) => {
//         console.log("Stream tracks:", stream.getAudioTracks());
//         if (stream.getAudioTracks().length === 0) {
//           throw new Error("No audio tracks available in the MediaStream.");
//         }

//         const audioStream = new MediaStream(stream.getAudioTracks());
//         const newRecorder = new Recorder(audioContext, { onAnalysed: (data) => console.log(data) });
//         newRecorder.init(audioStream);
//         setRecorder(newRecorder);
//         console.log("Recorder initialized with audio stream!");
//       })
//       .catch((err) => console.error("Error initializing recorder:", err));
//   };

//   const startRecording = () => {
//     if (!recorder) {
//       console.error("Recorder is not initialized!");
//       return;
//     }

//     if (!isPaused) {
//       recorder.start().then(() => {
//         setIsRecording(true);
//         setIsPaused(false);
//       });
//     } else {
//       setIsPaused(false);
//     }
//   };

//   const pauseRecording = () => {
//     recorder.stop().then(({ blob }) => {
//       setBlobs((prevBlobs) => [...prevBlobs, blob]); // Save the current recording
//       setIsRecording(false);
//       setIsPaused(true); // Mark as paused
//     });
//   };

//   const stopRecording = () => {
//     recorder.stop().then(({ blob }) => {
//       const allBlobs = [...blobs, blob]; // Combine all recorded blobs
//       setFinalBlob(new Blob(allBlobs, { type: "audio/wav" }));
//       setBlobs([]); // Clear temp blobs
//       setIsRecording(false);
//       setIsPaused(false);
//     });
//   };

//   const resetRecording = () => {
//     setBlobs([]);
//     setFinalBlob(null);
//     setIsRecording(false);
//     setIsPaused(false);
//   };

//   const download = () => {
//     if (finalBlob) {
//       Recorder.download(finalBlob, "recording");
//     }
//   };

//   return (
//     <div className="recorder-container">
//       {!recorder && <button onClick={initializeRecorder}>Initialize Recorder</button>}
//       <button onClick={startRecording} disabled={!recorder || isRecording}>
//         Start Recording
//       </button>
//       <button onClick={pauseRecording} disabled={!recorder || !isRecording}>
//         Pause
//       </button>
//       <button onClick={stopRecording} disabled={!recorder || !isRecording}>
//         Stop
//       </button>
//       <button onClick={resetRecording} disabled={!recorder}>
//         Reset
//       </button>
//       <button onClick={download} disabled={!finalBlob}>
//         Download!
//       </button>
//     </div>
//   );
// };

// export default RecorderBlock;
