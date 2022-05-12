import React, {useEffect } from 'react'
import Quagga from '@ericblade/quagga2'
import "./index.css"

const Scanner = (props) => {
  const { onDetected } = props;

  useEffect(() => {
    // will mount
    startScanner();
  }, []);

  useEffect (() => {
    // Unmount
    return() => {
      stopScanner();
    }
  }, [])



  const _onDetected = res => {
    stopScanner();
    onDetected(res.codeResult.code);
  };

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#barcodeScan'),
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment' // or user
          }
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        frequency: 1,
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: 'large', // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false
            }
          }
        },
        decoder: {
          readers: [
            'code_128_reader',
            // 'ean_reader',
            // 'ean_8_reader',
            // 'code_39_reader',
            // 'code_39_vin_reader',
            // 'codabar_reader',
            // 'upc_reader',
            // 'upc_e_reader',
            // 'i2of5_reader',
            // 'i2of5_reader',
            // '2of5_reader',
            // 'code_93_reader'
          ]
        }
      },
      err => {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onProcessed(result => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;
        drawingCtx.font = "24px Arial";
        drawingCtx.fillStyle = 'green';

        if (result) {
            console.warn('* quagga onProcessed', result);
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
                result.boxes.filter((box) => box !== result.box).forEach((box) => {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'purple', lineWidth: 2 });
                });
            }
            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: 'blue', lineWidth: 2 });
            }
            if (result.codeResult && result.codeResult.code) {
                // const validated = barcodeValidator(result.codeResult.code);
                // const validated = validateBarcode(result.codeResult.code);
                // Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: validated ? 'green' : 'red', lineWidth: 3 });
                drawingCtx.font = "24px Arial";
                // drawingCtx.fillStyle = validated ? 'green' : 'red';
                // drawingCtx.fillText(`${result.codeResult.code} valid: ${validated}`, 10, 50);
                drawingCtx.fillText(result.codeResult.code, 10, 20);
                // if (validated) {
                //     onDetected(result);
                // }
            }
        }
    });
    Quagga.onDetected(_onDetected);
  };
  const stopScanner = () => {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
  };

  return ( 
      <div id="barcodeScan"></div>  

   );
}
 
export default Scanner;