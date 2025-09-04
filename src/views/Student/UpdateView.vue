<template>
 <form @submit.prevent="updateStudent" class="max-w-md mx-auto p-6 bg-gray-50 border border-gray-300 rounded-md">
    <div class="mb-4 text-black-500 bg-grey-500 text-5xl text-center">
        Update Student
    </div>
    <div class="mb-4">
    <label for="name" class="block mb-1 font-semibold text-gray-700">Name:</label>
    <input type="text" id="name" v-model="student.name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
  </div>
  <div class="mb-4">
    <label for="age" class="block mb-1 font-semibold text-gray-700">Age:</label>
    <input type="number" id="age" v-model="student.age" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
  </div>
  <div class="mb-6">
    <label for="grade" class="block mb-1 font-semibold text-gray-700">Grade:</label>
    <input type="text" id="grade" v-model="student.grade" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
  </div>
  <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-md transition-colors">Update Student</button>
</form>

</template>

<script setup>
        import { ref, onMounted } from 'vue';
        import { useRoute } from 'vue-router';
        import { useStudentsStore } from '@/stores/studentsStore'

        const { id } = useRoute().params;
        const student = ref({
            id: null,
            name: '',
            age: null,
            grade: ''
        });

        const studentStore = useStudentsStore();

        onMounted(async () => {
          student.value = await studentStore.getStudentById(Number(id));
          console.log(student.value);
        });

        const updateStudent = () => {
          studentStore.updateStudent(student.value);
          alert('Student updated successfully!');
        };

</script>