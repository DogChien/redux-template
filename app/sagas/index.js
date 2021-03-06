import { fork } from 'redux-saga/effects';
import mockAPI from '../services/MockAPI';
import productAPI from '../services/API';
import settings from '../config/EnvSettings';

// Non API Relation
import { watchStartup } from './StartupSaga';
import { watchLoginAttempt } from './AuthSaga';

// API Service Relation
import getReposService from './ReposSaga';


// Create our API at this level and feed it into
// the sagas that are expected to make API calls
// so there's only 1 copy app-wide!
// const api = API.create()
const api = settings.useMockAPI ? mockAPI : productAPI.create();

// start the daemons
export default function* root() {
  yield fork(watchStartup);
  yield fork(watchLoginAttempt);

  yield fork(getReposService(api).watcher);
}
