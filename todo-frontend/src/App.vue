<template>
  <div id="app">
    <div class="container">
  
  
  <form @submit.prevent="addTask" class="mb-3 w-50">
    <h1 class="text-center mt-4">To-Do List</h1>
    <div class="mb-3">
      <input 
        v-model="newTask" 
        class="form-control" 
        placeholder="New task" 
      />
    </div>
    <button 
      type="submit" 
      class="btn btn-primary"
    >
      Add Task
    </button>
  </form>

  <ul class="list-group w-50">
    <li v-for="task in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
      <div class="form-check">
        <input 
          type="checkbox" 
          class="form-check-input" 
          v-model="task.completed" 
          @change="toggleComplete(task)"
          id="task-{{ task.id }}"
        />
        <label 
          class="form-check-label ms-2" 
          :for="'task-' + task.id"
          :class="{ 'text-decoration-line-through': task.completed }"
        >
          {{ task.title }}
        </label>
      </div>
      <button 
        @click="deleteTask(task.id)" 
        class="btn btn-danger btn-sm"
      >
        Delete
      </button>
    </li>
  </ul>
</div>

  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      newTask: ''
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    async getTasks() {
      const response = await axios.get('http://localhost:3000/tasks');
      this.tasks = response.data;
    },
    async addTask() {
      if (this.newTask.trim()) {
        const response = await axios.post('http://localhost:3000/tasks', {
          title: this.newTask
        });
        this.tasks.push(response.data);
        this.newTask = '';
      }
    },
    async toggleComplete(task) {
      await axios.put(`http://localhost:3000/tasks/${task.id}`, {
        completed: task.completed
      });
    },
    async deleteTask(id) {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
