import React from "react";

const uploadFile = () => {
  var fileTag = document.getElementById("file");
  if (fileTag.files.length > 0) {
    const formData = new FormData();
    formData.append("file", fileTag.files[0]);
    fetch("http://localhost:8080/api/csv/upload", {
      method: "POST",
      body: formData,
    })
      .then((e) => {
        if (e.status === 200) alert("File uploaded");
        else
          alert("Upload failed. Please upload a CSV file in the right format");
      })
      .catch(function (error) {
        console.log(error);
        alert("File upload failed");
      });
  } else {
    alert("No file choosen");
  }
};

function FileUploadPage() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <br />
          <input type="file" id="file" name="file" />
          <br />
          <button
            className="profile-logout-btn"
            name="btnLogoutUser"
            onClick={uploadFile}
            style={{ width: 70, height: 30 }}
          >
            submit
          </button>
        </div>
      </header>
    </div>
  );
}

export default FileUploadPage;
