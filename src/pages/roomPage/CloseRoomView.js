import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert } from 'rsuite';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../utils/mapStateToProps';
import { closeRoom } from '../../actions/roomActions';


function CloseRoomView({ roomData, socketData, closeRoom }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const socket = socketData.socket;
  const [state, setState] = useState({
    closeRoomClicked: false,
    actionDone: false,
  });
  const { closeRoomClicked, actionDone } = state;
  

  //Close Room...
  useEffect(() => {
    if (closeRoomClicked) {
      closeRoom(socket);
      setState({ ...state, closeRoomClicked: false, actionDone: true });
    }
  }, [closeRoomClicked, closeRoom, socket, state]);

  useEffect(() => {
    if (actionDone && roomData.error !== null && !roomData.loading) {
      Alert.error(roomData.error);
      setState({ ...state, actionDone: false });
    }
  }, [
    roomData.type,
    roomData.error,
    roomData.loading,
    state,
    actionDone,
  ]);

  return (
    <div className='close-room-view'>
      <Button
        onClick={() => setShowPrompt(true)}
        appearance='primary'
        color='red'
        size='sm'
      >
        Close Room
      </Button>
      <Modal
        backdrop
        show={showPrompt}
        onHide={() => setShowPrompt(false)}
        size='xs'
      >
        <Modal.Header>
          <Modal.Title>Close Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this room..</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setState({ ...state, closeRoomClicked: true })}
            appearance='primary'
          >
            Ok
          </Button>
          <Button onClick={() => setShowPrompt(false)} appearance='subtle'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default connect(mapStateToProps, { closeRoom })(CloseRoomView);
