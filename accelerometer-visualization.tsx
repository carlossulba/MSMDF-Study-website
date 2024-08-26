import React, { useState, useEffect } from 'react';

const AccelerometerVisualization = () => {
  const [size, setSize] = useState(100);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let accelerometer = null;

    const startAccelerometer = async () => {
      try {
        if ('Accelerometer' in window) {
          accelerometer = new Accelerometer({ frequency: 60 });
          accelerometer.addEventListener('reading', () => {
            setAcceleration({
              x: accelerometer.x,
              y: accelerometer.y,
              z: accelerometer.z
            });
          });
          accelerometer.start();
        } else {
          console.log('Accelerometer not supported');
        }
      } catch (error) {
        console.error('Error starting accelerometer:', error);
      }
    };

    startAccelerometer();

    return () => {
      if (accelerometer) {
        accelerometer.stop();
      }
    };
  }, []);

  useEffect(() => {
    const magnitude = Math.sqrt(
      acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
    );
    const newSize = 100 + magnitude * 50; // Adjust this multiplier to change sensitivity
    setSize(Math.min(Math.max(newSize, 50), 300)); // Limit size between 50 and 300
  }, [acceleration]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className="bg-blue-500 rounded-full transition-all duration-200 ease-in-out"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></div>
      <p className="mt-4 text-lg">
        Move your device to see the circle change!
      </p>
    </div>
  );
};

export default AccelerometerVisualization;
