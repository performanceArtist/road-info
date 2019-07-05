import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import {
  take,
  call,
  put,
  fork,
  race,
  cancelled,
  delay
} from 'redux-saga/effects';

import { MEASUREMENT } from './actions';
const { SERVER } = MEASUREMENT;

const socketServerURL = 'http://localhost:5000';

let socket;

const connect = () => {
  socket = io(socketServerURL);

  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const disconnect = () => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

const reconnect = () => {
  socket = io(socketServerURL);
  return new Promise(resolve => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

const createSocketChannel = socket =>
  eventChannel(emit => {
    const handler = data => {
      emit(data);
    };
    socket.on('newMeasurement', handler);
    return () => {
      socket.off('newMeasurement', handler);
    };
  });

// connection monitoring sagas
const listenDisconnectSaga = function*() {
  while (true) {
    yield call(disconnect);
    yield put({ type: SERVER.SERVER_OFF });
  }
};

const listenConnectSaga = function*() {
  while (true) {
    yield call(reconnect);
    yield put({ type: SERVER.SERVER_ON });
  }
};

export const startChannel = () => ({ type: SERVER.START_CHANNEL });
export const stopChannel = () => ({ type: SERVER.STOP_CHANNEL });

// Saga to switch on channel.
const listenServerSaga = function*() {
  try {
    yield put({ type: SERVER.CHANNEL_ON });
    const { timeout } = yield race({
      connected: call(connect),
      timeout: delay(2000)
    });
    if (timeout) {
      yield put({ type: SERVER.SERVER_OFF });
    }
    const socket = yield call(connect);
    const socketChannel = yield call(createSocketChannel, socket);
    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);
    yield put({ type: SERVER.SERVER_ON });

    while (true) {
      const payload = yield take(socketChannel);
      yield put({ type: SERVER.ADD_MEASUREMENT, payload });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({ type: SERVER.CHANNEL_OFF });
    }
  }
};

// saga listens for start and stop actions
const startStopChannel = function*() {
  while (true) {
    yield take(SERVER.START_CHANNEL);
    yield race({
      task: call(listenServerSaga),
      cancel: take(SERVER.STOP_CHANNEL)
    });
  }
};

export default startStopChannel;
