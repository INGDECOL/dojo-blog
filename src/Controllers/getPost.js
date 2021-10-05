import { ref } from "vue"
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
const getPost = (id) =>{

    const post = ref (null)
    const error = ref(null)
    const load = async () =>{
        try {
            // local fetching data
            // let res = await fetch('http://localhost:3000/posts/' + id)
            //
            // post.value = await res.json()
            //using firebase
            const docRef = doc( db, 'posts', id)
            const res = await getDoc(docRef)
            post.value = {...res.data(), id: id}

            if(!res.exists()) {
                throw Error("That post doesn't exist")
            }

        }
        catch (err) {
        error.value = err.message
        }
    }
    return {post, error, load}
}
export default getPost
