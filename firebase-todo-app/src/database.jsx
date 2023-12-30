import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import './styles/database.css';
import { LoggedIn } from './components/context';
import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,  // for getting APIKEY from .env.local file so it won't show up in gitlab
    authDomain: "todo-74015.firebaseapp.com",
    projectId: "todo-74015",
    storageBucket: "todo-74015.appspot.com",
    messagingSenderId: "717596927787",
    appId: "1:717596927787:web:186b4419c64456229c876e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// authentication
export const auth = getAuth(app);



export function ToDoFormAndList() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [itemText, setItemText] = useState("");


    // add items
    const handleSubmit = async (event) => {
        event.preventDefault();
        let newItem = { text: itemText };
        const docRef = await addDoc(collection(db, "todos"), newItem);
        newItem.id = docRef.id;
        setItems([...items, newItem]);
        setItemText('')
    }

    // remove items
    const removeItem = (item) => {
        deleteDoc(doc(db, "todos", item.id));
        let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id)
        setItems(filteredArray)
    }


    // load todo list items
    useEffect(() => {
        const fetchData = async () => {
            const todosCol = collection(db, 'todos');
            const todoSnapshot = await getDocs(todosCol);
            const todos = todoSnapshot.docs.map(doc => {
                return {
                    text: doc.data().text,
                    id: doc.id
                };
            });

            console.log(todos);
            setItems(todos);
            setLoading(false);
        }

        console.log("fetch data...")
        fetchData();
    }, []);




    // sing out 
    const {loggedIn, setLoggedIn} = useContext(LoggedIn)
    const navigate = useNavigate();

    if (loggedIn === false){
        navigate("/")
    }
    const signOut = () =>
        auth.signOut().then(() => {
            console.log("sign out")
            setLoggedIn(false)
        }).catch((error) => {
            console.log(error)
        });

    return (
        <div className='items-container'>
            <div className='top'>
                {
                    auth.currentUser &&
                    <button className='button' onClick={signOut}>Sign out</button>
                }

            </div>
            <form onSubmit={handleSubmit}>
                <input className='input' type='text' value={itemText} onChange={event => setItemText(event.target.value)} placeholder="Write a new todo here" />
                <input className='button' type='submit' value='Add' />
            </form>
            <ul>
                {loading &&
                    <p>Loading...</p>
                }
                {items.map(item => (
                    <li key={item.id} className='items'>
                        {item.text + " "} <span onClick={() => removeItem(item)} className='deleteItem'> x </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

