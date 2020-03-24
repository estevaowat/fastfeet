import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import api from '~/services/api';
import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'deliveryman-sessions', { id });
    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const data = {
      ...user,
      createdAt_formatted: format(parseISO(user.createdAt), 'dd/MM/yyyy'),
    };

    yield put(signInSuccess(token, data));
  } catch (error) {
    Alert.alert('Falha na autenticação', 'ID não encontrado');
    yield put(signInFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
