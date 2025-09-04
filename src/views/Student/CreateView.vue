<template>
 <form @submit.prevent="createStudent" class="max-w-md mx-auto p-6 bg-gray-50 border border-gray-300 rounded-md">
    <div class="mb-4 text-black-500 bg-grey-500 text-5xl text-center">
        ADD Student
    </div>
    <div class="mb-4">
    <label for="name" class="block mb-1 font-semibold text-gray-700">Name:</label>
    <input type="text" id="name" v-model="student.name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
  </div>
  <div class="mb-4">
    <label for="age" class="block mb-1 font-semibold text-gray-700">username:</label>
    <input type="text" id="age" v-model="student.username" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
  </div>
  <div class="mb-6">
    <label for="grade" class="block mb-1 font-semibold text-gray-700">email:</label>
    <input type="text" id="grade" v-model="student.email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
  </div>
  <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-md transition-colors">ADD Student</button>
</form>

</template>

<script setup>
        import { ref } from 'vue';
        import { useStudentsStore } from '@/stores/studentsStore'

        const student = ref({
            id: null,
            name: '',
            username: '',
            email: ''
        });

        const studentStore = useStudentsStore();
        const createStudent = () => {
          studentStore.addStudent(student.value);
          student.value = { id: null, name: '', username: '', email: '' }; 
        };

</script>