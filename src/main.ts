import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useStudentsStore } from './stores/studentsStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const studentStore = useStudentsStore()
studentStore.$subscribe(()=>{
    localStorage.setItem('students', JSON.stringify(studentStore.students))
})
app.mount('#app')
