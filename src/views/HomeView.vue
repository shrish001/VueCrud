<script setup lang="ts">
// src/views/HomeView.vue
import { useStudentsStore } from '../stores/studentsStore'
const studentStore = useStudentsStore();
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-center text-indigo-700">
      Welcome to Student CRUD
    </h1>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 rounded-lg shadow">
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-6 py-3 border-b text-left">Name</th>
            <th class="px-6 py-3 border-b text-left">Major</th>
            <th class="px-6 py-3 border-b text-left">GPA</th>
            <th class="px-6 py-3 border-b text-center" colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white text-gray-800">
          <tr
            v-for="student in studentStore.students"
            :key="student.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 border-b">{{ student.name }}</td>
            <td class="px-6 py-4 border-b">{{ student.age }}</td>
            <td class="px-6 py-4 border-b">{{ student.grade }}</td>
            <td class="px-4 py-4 border-b text-center">
              <RouterLink :to="`/update/${student.id}`" class="text-blue-600 hover:underline">Edit</RouterLink>
            </td>
            <td class="px-4 py-4 border-b text-center">
              <button class="text-red-600 hover:underline" @click="studentStore.removeStudent(student.id)">Delete</button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>
