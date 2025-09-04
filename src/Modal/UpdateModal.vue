<template>

<!-- Main modal -->
<div id="crud-modal" tabindex="-1" aria-hidden="true" class= "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
                    Edit New Student
                </h3>
                <button type="button"
                    @click="handleClose"
                     class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-1">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" v-model="student.name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type name">
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                        <input type="text" name="username" id="username" 
                        :value="student.username"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         placeholder="Type username">
                    </div>
                    <div class="w-full sm:col-span-1">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email"  name="email" id="email"
                        :value="student.email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         placeholder="Type email">
                    </div>
                </div>
                <button data-modal-hide="popup-modal" type="button" 
                            @click="handleSubmit"
                        class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Yes, I'm sure {{ props.studentId }}
                        </button>
                <button data-modal-hide="popup-modal" 
                    @click="handleClose"
                    type="button" 
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200
                        hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800
                        dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    No, cancel
                </button>
            </form>
        </div>
    </div>
</div> 

</template>

<script setup lang="ts">
import { useStudentsStore } from "@/stores/studentsStore";
import { defineProps , defineEmits , reactive, watch} from "vue";

const props = defineProps<{
  studentId: number | null;
}>();

const emit = defineEmits<{
  (e: 'response', payload: 'confirm' | 'cancel'): void
}>()

watch(() => props.studentId, (newId) => {
  if (newId !== null) {
    const selectedStudent = StudentStore.getStudentById(newId);
    if (selectedStudent) {
      student.name = selectedStudent.name;
      student.username = selectedStudent.username;
      student.email = selectedStudent.email;
    }
  }
});

const handleClose = () => {
  emit("response","cancel");
};

const student = reactive({
  name: '',
  username: '',
  email: ''
});

const handleSubmit = () => {
  if (props.studentId !== null) {
    StudentStore.updateStudent({
      id: props.studentId,
      name: student.name,
      username: student.username,
      email: student.email
    });
    emit("response", "confirm");
  }
};
const StudentStore = useStudentsStore();
watch(() => props.studentId, (newId) => {
  if (newId !== null) {
    const selectedStudent = StudentStore.getStudentById(newId);
    if (selectedStudent) {
      student.name = selectedStudent.name;
      student.username = selectedStudent.username;
      student.email = selectedStudent.email;
    }
  } else {
    student.name = '';
    student.username = '';
    student.email = '';
  }
}, { immediate: true });


</script>


<style scoped>
/* Add any component-specific styles here */
    .blur{
        background-color:#0006;
    }
</style>