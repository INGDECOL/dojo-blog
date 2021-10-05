import { ref } from "vue";
import { db } from '../firebase/config'
import {  getDocs, collection, query, orderBy, onSnapshot } from 'firebase/firestore'
const getPosts = () =>{

    const posts = ref ([ ])
    const error = ref(null)
    const load = async () =>{
        try {
            //local fetching data with local json-server
            // let res = await fetch('http://localhost:3000/posts')
            // if(!res.ok) {
            //     throw Error("No Data available")
            // }
            // posts.value = await res.json()

            //using firebase
            // All Docs
            // const docRef =  collection(db, 'posts') // docs to fetch in firebase
            // const res = await getDocs( docRef)
            // posts.value = res.docs.map(doc =>{
            //     return {...doc.data(), id : doc.id}
            // })
            //With orderBy
            // const docRef =  collection(db, 'posts') // docs to fetch in firebase
            // const q = query( docRef, orderBy("createdAt", "desc"))
            // const res = await getDocs(q)
            // posts.value = res.docs.map(doc =>{
            //     return {...doc.data(), id : doc.id}
            // })
            //with snapShot
            const docRef =  collection(db, 'posts') // docs to fetch in firebase
            const q = query( docRef, orderBy("createdAt", "desc"))
            const res = onSnapshot(q, ( snap ) =>{
                posts.value = snap.docs.map(doc =>{
                return {...doc.data(), id : doc.id}
            })
            })

        }

        catch (err) {
        error.value = err.message
        console.log(err);
        }

    }
    return {posts, error, load}
}
export default getPosts
