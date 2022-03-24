import React from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera } from 'react-icons/md';
import ConversationButton from './ConversationButton';
import { switchForScreenSharingStream, hangUp } from '../../../utils/webRTC/webRTCHandler';

const ConversationButtons = (props) => {
  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive,
    groupCall
  } = props;

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div className='buttonContainer'>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? <MdMic className='icon' /> : <MdMicOff className='icon' />}
      </ConversationButton>
      {!groupCall && <ConversationButton onClickHandler={handleHangUpButtonPressed}>
        <MdCallEnd className='icon' />
      </ConversationButton>}
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? <MdVideocam className='icon' /> : <MdVideocamOff className='icon' />}
      </ConversationButton>
      {!groupCall && <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ? <MdCamera className='icon' /> : <MdVideoLabel className='icon' />}
      </ConversationButton>}
    </div>
  );
};

export default ConversationButtons;
