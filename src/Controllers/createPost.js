import { ref } from "vue";
import { useRouter } from 'vue-router'
import { db } from "../firebase/config"
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
const createPost = () =>{
    const error = ref(null)
    const router = useRouter()
    const create = async (post) =>{
        try {
            // local ading post in json local server
        // let res = await fetch('http://localhost:3000/posts/' , {
        //     method: 'POST',
        //     headers: {'content-Type' : 'application/json'},
        //     body : JSON.stringify(post)
        // })
        // using firebase
        const docRef = collection( db, 'posts')
        const res = await addDoc(docRef, post)

        if(!res.id) {
            throw Error("There is an error on submitting data to the server")
            return
        }
            router.push({name : "Home"})
        }
        catch (err) {
        error.value = err.message
        }
    }
    const update = async (post) =>{
        try {
        const docRef = doc( db, 'posts', post.id)
        const res = await updateDoc(docRef, post)
        // console.log( " update res : ", res)
        // if(!res.id) {
        //     throw Error("There is an error on submitting data to the server")
        //     return
        // }
            router.push({name : "Home"})
        }
        catch (err) {
        error.value = err.message
        }
    }


    const destroy = async ( id ) =>{
        await deleteDoc(doc(db, 'posts', id))
        router.push({ name: "Home"})
    }
    return { error, create, destroy, update}
}
export default createPost
