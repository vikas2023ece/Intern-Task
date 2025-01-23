import React, { useState } from "react";
import VideoUploader from "./components/VideoUploader";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [videoUrl, setVideoUrl] = useState(null);

  const handleVideoUpload = (file) => {
    const videoURL = URL.createObjectURL(file);
    setVideoUrl(videoURL);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Video</h1>
      <VideoUploader onUpload={handleVideoUpload} />
      {videoUrl && <VideoPlayer videoUrl={videoUrl} />}
    </div>
  );
}

export default App;
