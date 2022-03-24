import React, { useRef, useEffect } from 'react';

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
    <div className='background_secondary_color videoContainer'>
      <video className='videoElement' ref={localVideoRef} autoPlay muted />
    </div>
  );
};

export default LocalVideoView;
