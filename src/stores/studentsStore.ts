import { defineStore } from 'pinia'

interface Student {
  id: number
  name: string
  age: number
  grade: string
}

const getIntialStudentList = (): Student[] => {
  const savedList = localStorage.getItem('students')
  return savedList
    ? JSON.parse(savedList)
    : [
        {
          id: 1,
          name: 'John Doe',
          age: 20,
          grade: 'A',
        },
        {
          id: 2,
          name: 'Jane Smith',
          age: 22,
          grade: 'B',
        },
      ]
}

export const useStudentsStore = defineStore('students', {
  state: () => {
    return {
      students: getIntialStudentList(),
      lastId: getIntialStudentList().length
        ? getIntialStudentList()[getIntialStudentList().length - 1].id
        : 1,
    }
  },
  actions: {
    addStudent(student: Student) {
      student.id = ++this.lastId
      this.students.push(student)
    },
    updateStudent(updatedStudent: Student) {
      const index = this.students.findIndex((student) => student.id === updatedStudent.id)
      if (index !== -1) {
        this.students[index] = updatedStudent
      }
    },
    removeStudent(studentId: number) {
      this.students = this.students.filter((student) => student.id !== studentId)
    },
    getStudentById(id: number) {
      return this.students.find((student) => student.id === id)
    },
  },
})
