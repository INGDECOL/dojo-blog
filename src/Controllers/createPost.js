import { ref } from "vue";
import {useRouter } from 'vue-router'
const createPost = () =>{

     const error = ref(null)
    const router = useRouter()
    const create = async (post) =>{
        try {
              await new Promise(resolve =>{
                setTimeout(resolve, 3000)
            })
        let res = await fetch('http://localhost:3000/posts/' , {
            method: 'POST',
            headers: {'content-Type' : 'application/json'},
            body : JSON.stringify(post)
        })
        
        if(!res.ok) {
            throw Error("There is an error on submitting data to the server")
            return
        }
            router.push({name : "Home"})
        }
        catch (err) {
        error.value = err.message
        }
    }
    return { error, create}
}
export default createPost
