const AccelerometerVisualization = () => {
    const [size, setSize] = React.useState(100);
    const [acceleration, setAcceleration] = React.useState({ x: 0, y: 0, z: 0 });
  
    React.useEffect(() => {
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
  
    React.useEffect(() => {
      const magnitude = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
      );
      const newSize = 100 + magnitude * 50; // Adjust this multiplier to change sensitivity
      setSize(Math.min(Math.max(newSize, 50), 300)); // Limit size between 50 and 300
    }, [acceleration]);
  
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0'}}>
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: '#3498db',
            borderRadius: '50%',
            transition: 'all 0.2s ease-in-out'
          }}
        ></div>
        <p style={{marginTop: '20px', fontSize: '18px'}}>
          Move your device to see the circle change!
        </p>
      </div>
    );
  };