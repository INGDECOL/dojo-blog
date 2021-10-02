import { ref } from 'vue'
const getToken = (len = 100) =>{
    const token = ref([])
    const alphaNumerique = ref("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ0123456789?,!@")
     const loadToken = () =>{
         for (let i = 0; i < len; i++) {
             const index = Math.floor(Math.random() * alphaNumerique.value.length);
             token.value.push (alphaNumerique.value.charAt(index))

         }
    token.value = token.value.join("")

    }
    loadToken()
    return {token}
}
export default getToken
