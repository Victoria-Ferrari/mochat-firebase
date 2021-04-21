
import './styles/main.scss';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDySzhdbydtEMIlR3zimIs0KR2dEyjA4Tg",
    authDomain: "mochat-web1a-vichi.firebaseapp.com",
    projectId: "mochat-web1a-vichi",
    storageBucket: "mochat-web1a-vichi.appspot.com",
    messagingSenderId: "539307325931",
    appId: "1:539307325931:web:c0103d967fe222e65b41ae"
  };

  

document.addEventListener('DOMContentLoaded', () => {
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //mi attacco al db con le credenziali sopra, attaccati a firestore e connettiti con la collezione chat.
    const db = firebase.firestore();
    const collection = db.collection('chat');
    //prendo la lista ul
    const ul = document.querySelector('ul');

    const form = document.querySelector('form');

    //onSnapshop aggiorna la lista di messaggi in tempo reale in modalità web socket. 
    collection.orderBy('ore').onSnapshot((snapshot) => {
        console.log(snapshot.docs);
        const json = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }   //sintassi spread, prende un oggetto e lo scompone nelle singole chiavi. prende il contenuto e crea n variabili che ci sono nei data. NB in questo caso lo inserisco nell'oggetto che sto creando. 
            
        });
        console.log(json);

        const elements = json.map(doc => `<li><b>${doc.user}:</b>${doc.text}</li>` )
        ul.innerHTML = elements.join('');
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const obj = {
            ore: new Date().toISOString(),
            user: document.querySelector('#username').value,
            text: event.target.new.value
            
        }

        //mandare i dati al db
        collection.doc().set(obj);

        event.target.reset();
    });
});
