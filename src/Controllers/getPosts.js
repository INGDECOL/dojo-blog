import { ref } from "vue";
const getPosts = () =>{

    const posts = ref ([ ])
    const error = ref(null)
    const load = async () =>{
        try {
        let res = await fetch('http://localhost:3000/posts')
        if(!res.ok) {
            throw Error("No Data available")
        }
        posts.value = await res.json()
        }
        catch (err) {
        error.value = err.message
        }
    }
    return {posts, error, load}
}
export default getPosts
