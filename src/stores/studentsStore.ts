
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Student {
  id: number
  name: string
  username: string
  email: string
}

export const useStudentsStore = defineStore('students', {
  state: () => {
    return {
      students: [] as Student[],
      isLoading: false,
      error: '',
      dataPresent: false,
    }
  },
  actions: {

    async fetchStudents(){
      if (this.dataPresent) return;
      this.isLoading = true;
      try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.students = data
        this.dataPresent = true;
      }catch(error : any){
        this.error = error.message;
      }finally{
        this.isLoading = false;
      }
    },
      
    // }
    async addStudent(student: Student) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(student),
        });
        console.log(response);
        if(response.ok){
          const newStudent = await response.json();
          this.students.push(newStudent);
          this.dataPresent = this.students.length > 0;
          alert('Student added successfully.');
        }else{
          alert('Failed to add student.');
        }
      } catch (error : any) {
        this.error = error.message;
        alert(error.message);
      }
    },
    async updateStudent(updatedStudent: Student) {
      try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedStudent.id}`, {
          method: 'PUT',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedStudent)
        });
        if(response.ok){
          const data = await response.json();
          console.log(data);
          const index = this.students.findIndex((student) => student.id === updatedStudent.id)
          if (index !== -1) {
            this.students[index] = data;
          }
          alert('Student updated successfully.');
        }else{
          alert('Failed to update the student.');
        }
      }catch(error:  any){
        alert(error.message);
      }
      const index = this.students.findIndex((student) => student.id === updatedStudent.id)
      if (index !== -1) {
        this.students[index] = updatedStudent
      }
    },
    removeStudent(studentId: number) {
      return fetch(`https://jsonplaceholder.typicode.com/users/${studentId}`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          alert('Student deleted successfully.');
          this.students = this.students.filter((student) => student.id !== studentId)
          this.dataPresent = this.students.length > 0;
        } else {
          alert('Failed to delete the student.');
        }
      }).catch((error) => {
        this.error = error.message;
        alert(error.message);
      });
    },
    getStudentById(id: number) {
      return this.students.find((student) => student.id === id)
    },
  },
})
