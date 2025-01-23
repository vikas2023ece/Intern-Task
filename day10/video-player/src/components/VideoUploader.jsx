import React from "react";

const VideoUploader = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ padding: "10px", fontSize: "16px" }}
      />
    </div>
  );
};

export default VideoUploader;
