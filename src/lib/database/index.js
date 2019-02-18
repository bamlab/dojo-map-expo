import * as firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBPgQ8Eb8psEIG81fqL9Ow0DN3UJUOSpOM',
  authDomain: 'dojo-map-bc7f2.firebaseapp.com',
  projectId: 'dojo-map-bc7f2',
};
firebase.initializeApp(config);

export default firebase.firestore();
