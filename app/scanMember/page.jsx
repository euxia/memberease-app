"use client";

import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { usePathname } from 'next/navigation';

function ScanMember() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [memberDetails, setMemberDetails] = useState(null);
  const pathname = usePathname();

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
        fetchMemberDetails(result);
        stopCamera();
      }

      function error(err) {
        console.warn(err);
      }
    }

    const stopCamera = () => {
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
    };

    const handleRouteChange = () => {
      if (scanner) {
        scanner.clear().catch(err => {
          console.error("Failed to clear the scanner", err);
        });
        stopCamera();
      }
    };

    // Cleanup function to stop the scanner and release the camera
    return () => {
      handleRouteChange();
    };
  }, [isScanning, pathname]);

  const fetchMemberDetails = async (qrID) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
        cache: "no-store",
      });
      const { members } = await response.json();
      const member = members.find(m => m.qrID === qrID);
      setMemberDetails(member || 'Member not found');
    } catch (error) {
      console.error('Failed to fetch members', error);
      setMemberDetails('Failed to fetch members');
    }
  };

  const handleScanAgain = () => {
    setScanResult(null);
    setMemberDetails(null);
    setIsScanning(true);
  };

  return (
    <div className="App">
      <h1>QR Scanning Code</h1>
      {scanResult ? (
        <div>
          <h2>Scanned QR Code Text</h2>
          {memberDetails && (
            <div>
              {typeof memberDetails === 'string' ? (
                <p>{memberDetails}</p>
              ) : (
                <div>
                  <p><strong>Name:</strong> {memberDetails.member}</p>
                  <p><strong>Description:</strong> {memberDetails.description}</p>
                  <p><strong>QR ID:</strong> {memberDetails.qrID}</p>
                </div>
              )}
            </div>
          )}
          <button onClick={handleScanAgain}>Scan Again</button>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default ScanMember;