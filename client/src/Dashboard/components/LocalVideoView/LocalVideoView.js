import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '130px',
    height: '130px',
    borderRadius: '8px',
    position: 'absolute',
    top: '15%',
    right: '26%',
  },
  videoElement: {
    background:'#000',
    backgroundColor: '#000',
    width: '100%',
    height: '100%'
  }
};

const LocalVideoView = props => {
  const { localStream } = props;
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <div style={styles.videoContainer} className='background_secondary_color'>
      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
    </div>
  );
};

export default LocalVideoView;
