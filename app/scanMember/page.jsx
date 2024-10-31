"use client";

import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';

function ScanMember() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    let scanner;
    if (isScanning) {
      scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      scanner.render(success, error);

      function success(result) {
        setScanResult(result);
        setIsScanning(false); // Stop further scanning
        scanner.clear();
      }

      function error(err) {
        console.warn(err);
      }
    }

    // Cleanup function to stop the scanner and release the camera
    return () => {
      if (scanner) {
        scanner.clear();
        Html5Qrcode.getCameras().then(devices => {
          if (devices && devices.length) {
            const html5QrCode = new Html5Qrcode("reader");
            html5QrCode.stop().then(() => {
              html5QrCode.clear();
            }).catch(err => {
              console.error("Failed to stop the camera", err);
            });
          }
        }).catch(err => {
          console.error("Failed to get cameras", err);
        });
      }
    };
  }, [isScanning]);

  const handleScanAgain = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  return (
    <div className="App">
      <h1>QR Scanning Code</h1>
      {scanResult ? (
        <div>
          <h2>Scanned QR Code Text</h2>
          <p className="scanned-text">{scanResult}</p>
          <button onClick={handleScanAgain}>Scan Again</button>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default ScanMember;