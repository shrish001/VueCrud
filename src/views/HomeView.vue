<script setup lang="ts">
// src/views/HomeView.vue
import { onMounted, reactive, ref } from 'vue'
import { useStudentsStore } from '../stores/studentsStore'
import DeleteModal from '../Modal/DeleteModal.vue'
import UpdateModal from '@/Modal/UpdateModal.vue';
import { useToast } from 'vue-toastification';

const isDeleteModalOpen = ref(false)
const isUpdateModalOpen = ref(false)

const studentStore = useStudentsStore()
const selectedStudent = reactive<{ id: number | null }>({
  id: null,
});

onMounted(() => {
  studentStore.fetchStudents()
  console.log(studentStore.students)
})

const handleResponseDeletion = (response: 'confirm' | 'cancel') => {
  if (response === 'confirm') {
    console.log('Student deleted successfully.');
  } else {
    useToast().info('Deletion cancelled.');
  }
  selectedStudent.id = null; // Close the modal
  isDeleteModalOpen.value = false;
};

const handleResponseUpdate = (response: 'confirm' | 'cancel') => {
  if (response === 'confirm') {
    console.log('Student updated successfully.');
  } else {
    useToast().info('Update cancelled.');
  }
  selectedStudent.id = null; // Close the modal
  isUpdateModalOpen.value = false;
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-center text-indigo-700">Welcome to Student CRUD</h1>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 rounded-lg shadow">
        <thead v-show="true" class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-3 border-b text-left">Name</th>
            <th class="px-6 py-3 border-b text-left">username</th>
            <th class="px-6 py-3 border-b text-left">email</th>
            <th class="px-6 py-3 border-b text-center" colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-800">
          <tr v-for="student in studentStore.students" :key="student.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 border-b">{{ student.name }}</td>
            <td class="px-6 py-4 border-b">{{ student.username }}</td>
            <td class="px-6 py-4 border-b">{{ student.email }}</td>
            <td class="px-4 py-4 border-b text-center">
              <button  class="text-blue-600 hover:underline" @click="selectedStudent.id = student.id ; isUpdateModalOpen = true;">
                Edit
              </button>
            </td>
            <td class="px-4 py-4 border-b text-center">
              <button class="text-red-600 hover:underline" @click='selectedStudent.id = student.id ; isDeleteModalOpen = true;'>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Delete Modal Component -->
      <DeleteModal
        v-if="selectedStudent.id !== null && isDeleteModalOpen"
        :studentId="selectedStudent.id"
        @response="handleResponseDeletion"
      />
      <UpdateModal
        v-if="selectedStudent.id !== null && isUpdateModalOpen"
        :studentId="selectedStudent.id"
        @response="handleResponseUpdate"
      />
    </div>
  </div>
</template>
