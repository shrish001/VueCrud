<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header class="bg-gray-100 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex items-center justify-between h-16">
        <!-- Brand -->
        <RouterLink to="/" class="text-xl font-bold text-gray-800">Student CRUD</RouterLink>

        <!-- Hamburger button (mobile) -->
        <button
          @click="toggleMenu"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            v-if="!isOpen"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            class="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            v-if="isOpen"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Menu items (desktop) -->
        <ul class="hidden md:flex space-x-8">
          <li>
            <RouterLink to="/create" class="text-gray-900 font-medium hover:text-indigo-600" active-class="text-indigo-600" exact>Create</RouterLink>
          </li>
          
        </ul>
      </nav>
    </div>

    <!-- Mobile menu, toggle with isOpen -->
    <div v-if="isOpen" id="mobile-menu" class="md:hidden px-4 pb-4 space-y-1">
      <RouterLink to="/" class="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 bg-indigo-50">Home</RouterLink>
      <RouterLink to="/create" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">Create</RouterLink>    </div>
  </header>
   <RouterView />
</template>

