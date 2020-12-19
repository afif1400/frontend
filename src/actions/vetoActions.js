import {
  VETO_START_ADMIN,
  VETO_GET_ALL_USERS,
  VETO_START_SERVER,
  VETO_STOP_SERVER,
  VETO_QUESTIONS_LOADING,
  VETO_QUESTIONS_SUCCESS,
  VETO_QUESTIONS_FAIL,
  VETO_USER_VOTED,
  VETO_ADD_VOTE_QUESTION,
  VETO_REMOVE_VOTE_QUESTION,
  VETO_USER_VOTED_STATUS,
  VETO_FAIL,
  ACTION_RESET,
} from './types';
import qapiAxios from '../helpers/qapiAxios';
import { SERVER_DOWN } from '../utils/constants';

export const resetVetoAction = () => {
  return {
    type: ACTION_RESET,
  };
};

// Send to server to start the competition (Veto is first step in the competition)
export const veto = (socket) => (dispatch) => {
  dispatch({
    type: VETO_START_ADMIN,
  });
  socket.emit('START_COMPETITION', {}, (data) => {
    if (data.error !== undefined) {
      dispatch({
        type: VETO_FAIL,
        payload: data.error,
      });
    }
  });
};

// Get all the users currently in room
export const getAllVetoUsers = (teams) => (dispatch) => {
  /* 
    - This array contains all users (json object as one player) currently competing
    {
      userName: name of user
      team: team of user
    }  
  */
  let vetoUsers = [];
  for (let team in teams) {
    // Gives the array of players in a team
    let teamPlayers = teams[team];
    for (let i = 0; i < teamPlayers.length; i++) {
      vetoUsers.push({
        userName: teamPlayers[i],
        team,
      });
    }
  }
  dispatch({
    type: VETO_GET_ALL_USERS,
    payload: vetoUsers,
  });
};

// Listener to when server sends VETO_START
export const vetoStart = (socket, history) => (dispatch) => {
  socket.off('VETO_START').on('VETO_START', (data) => {
    dispatch({
      type: VETO_START_SERVER,
      payload: data,
    });

    // question ids to be sent to qapi
    const quesIds = {
      id: data,
    };

    dispatch({
      type: VETO_QUESTIONS_LOADING,
    });

    qapiAxios(history, quesIds)
      .post('/questions/getQById', quesIds)
      .then((response) => {
        dispatch({
          type: VETO_QUESTIONS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: VETO_QUESTIONS_FAIL,
          payload: error.response ? error.response.data : SERVER_DOWN,
        });
      });
  });
};

// Send to server the questions user voted for in veto
export const vetoVoting = (socket, votes) => (dispatch) => {
  socket.emit('VETO_VOTES', { votes }, (data) => {
    dispatch({
      type: VETO_USER_VOTED,
      payload: data,
    });
  });
};

// Add question to the voted questions array
export const addVetoVote = (questionID) => (dispatch) => {
  dispatch({
    type: VETO_ADD_VOTE_QUESTION,
    payload: questionID,
  });
};

// Remove question from the voted questions array
export const removeVetoVote = (questionID) => (dispatch) => {
  dispatch({
    type: VETO_REMOVE_VOTE_QUESTION,
    payload: questionID,
  });
};

// Listener to when server sends VETO_STOP
export const vetoStop = (socket) => (dispatch) => {
  socket.on('VETO_STOP', (data) => {
    dispatch({
      type: VETO_STOP_SERVER,
      payload: data,
    });
  });
};

// Listener to when server sends veto status (which user voted in veto)
export const getVetoStatus = (socket) => (dispatch) => {
  socket.on('USER_VOTED', (data) => {
    dispatch({
      type: VETO_USER_VOTED_STATUS,
      payload: data,
    });
  });
};
