import { useState, useEffect } from 'react';
import './App.css';
import { storage, db } from './Firebase/firebase';
function App() {
  const [fileUrl, setFileurl] = useState(null)
  const [username, setUsername] = useState('')
  const [users, setUsers] = useState([])

  const uploadimage = async(e) =>{
    const image = e.target.files[0]
    const storageRef =  storage.ref();
    const fileRef = storageRef.child(`images/${image.name}`);
    await fileRef.put(image).on('state_changed', alert('success'), alert)
    setFileurl(await fileRef.getDownloadURL())
    console.log(fileUrl);
  }

  const upload = async (e) => {
    e.preventDefault();
    try {
      if ( !username) {
        return
      }
      
      db.collection('users').add({
        name: username,
        avatar: fileUrl
      })  
    } catch (error) {
      console.log(error);
    }
    

  }
  async function deleteRecord(id){
    await db.collection('users').doc(id).delete()

  }
  // const download = async () =>{
  //   const sceneRef = storage.ref(`images/scene.jfif`)
  //   try {
  //     const url = sceneRef.getDownloadURL();

  //   } catch (error) {

  //   }
  // }

  useEffect( () => {
    async function listUser(){
      const usersCollection = await db.collection('users').get();
      //console.log(usersCollection);
      setUsers(usersCollection.docs.map((doc) => (
        {id : doc.id, data : doc.data()}
      )))}
    console.log(users);
    listUser();
  }, [])

  return (
    <div className="App">
      <form onSubmit={upload}>
        <input type="file" onChange={uploadimage} />
        <input type="text" placeholder="User Name" onChange={(e) => setUsername(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <img width='100' height='100' src={user.data.avatar} alt={user.data.name} /> 
              <span><button onClick={() =>deleteRecord(user.id)}>❌</button></span>
              <p>{user.data.name}</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
