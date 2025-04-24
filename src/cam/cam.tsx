import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { jsPDF } from "jspdf";

function Cam() {
  const webcamRef = useRef<Webcam>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = () => {
    setCameraOn(true);
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhoto(imageSrc);
    }
  };

  const generatePDF = () => {
    if (photo) {
      const pdf = new jsPDF();
      pdf.addImage(photo, "JPEG", 10, 10, 180, 135);
      pdf.save("photo.pdf");
    }
  };

  const retake = () => {
    setPhoto(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>

      {!cameraOn && (
        <button onClick={startCamera}>Open Camera</button>
      )}

      {cameraOn && !photo && (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
            videoConstraints={{ facingMode: "environment" }}
            style={{ border: "1px solid #ccc", marginTop: "1rem" }}
            mirrored={true}
          />
          <br />
          <button onClick={capture} style={{ marginTop: "1rem", marginRight: "1rem" }}>
            Capture
          </button>
          <button onClick={() => {setCameraOn(false); setPhoto(null);}}>Back</button>
        </>
      )}

      {cameraOn && photo && (
        <>
          <img src={photo} alt="Captured" style={{ width: 640, height: 480, marginTop: "1rem" }} />
          <div style={{ marginTop: "1rem" }}>
            <button onClick={generatePDF}>Download PDF</button>
            <button onClick={retake} style={{ marginLeft: "1rem" }}>
              Retake
            </button>
            <button onClick={() => {setCameraOn(false); setPhoto(null);}} style={{ marginLeft: "1rem" }}>Back</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cam;
