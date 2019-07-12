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

class Socket {
  url: string;
  socket: any;

  constructor(url: string) {
    this.url = url;

    this.listenConnectSaga = this.listenConnectSaga.bind(this);
    this.listenDisconnectSaga = this.listenDisconnectSaga.bind(this);
    this.listenServerSaga = this.listenServerSaga.bind(this);
    this.startStopChannel = this.startStopChannel.bind(this);
  }

  private connect = () => {
    this.socket = io(this.url);
    return new Promise(resolve => {
      this.socket.on('connect', () => {
        resolve(this.socket);
      });
    });
  };

  private disconnect = () => {
    this.socket = io(this.url);
    return new Promise(resolve => {
      this.socket.on('disconnect', () => {
        resolve(this.socket);
      });
    });
  };

  private reconnect = () => {
    this.socket = io(this.url);
    return new Promise(resolve => {
      this.socket.on('reconnect', () => {
        resolve(this.socket);
      });
    });
  };

  private createChannel = () =>
    eventChannel(emit => {
      const handler = (data: any) => {
        emit(data);
      };
      this.socket.on('newMeasurement', handler);
      return () => {
        this.socket.off('newMeasurement', handler);
      };
    });

  private *listenDisconnectSaga() {
    while (true) {
      yield call(this.disconnect);
      yield put({ type: SERVER.SERVER_OFF });
    }
  }

  private *listenConnectSaga() {
    while (true) {
      yield call(this.reconnect);
      yield put({ type: SERVER.SERVER_ON });
    }
  }

  *listenServerSaga() {
    try {
      yield put({ type: SERVER.CHANNEL_ON });
      const { timeout } = yield race({
        connected: call(this.connect),
        timeout: delay(2000)
      });
      if (timeout) {
        yield put({ type: SERVER.SERVER_OFF });
      }

      this.socket = yield call(this.connect);
      const socketChannel = yield call(this.createChannel);
      yield fork(this.listenDisconnectSaga);
      yield fork(this.listenConnectSaga);
      yield put({ type: SERVER.SERVER_ON });

      while (true) {
        const payload = yield take(socketChannel);
        yield put({ type: SERVER.ADD_MEASUREMENT, payload });
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (yield cancelled()) {
        this.socket.disconnect(true);
        yield put({ type: SERVER.CHANNEL_OFF });
      }
    }
  }

  startChannel = () => ({ type: SERVER.START_CHANNEL });
  stopChannel = () => ({ type: SERVER.STOP_CHANNEL });

  *startStopChannel() {
    while (true) {
      yield take(SERVER.START_CHANNEL);
      yield race({
        task: call(this.listenServerSaga),
        cancel: take(SERVER.STOP_CHANNEL)
      });
    }
  }
}

export default new Socket('http://localhost:5000');
