<script>
import axios from "axios";

export default {
  name: 'FileGroup',
  components: {},
  props: {
    fileData: {
      type: Array,
      default: () => {
      }
    },
    fileLink: String,
    fileName: String,
    fileSize: Number,
    fileType: String,
  },
  data() {
    return {
      name: '',
      link: '',
      size: '',
      type: '',
    }
  },
  created() {
    try {
      this.name = this.fileData[0].name;
      this.link = this.fileData[0].link;
      this.size = this.fileData[0].size;
      this.type = this.fileData[0].type;
    } catch (e) {
      console.log(e);
      this.name = '';
      this.link = '';
      this.size = '';
      this.type = '';
    }
  },
  methods: {
    async removeFile(fileId){
      const payload={
        fileId: fileId,
        userId: localStorage.getItem('userId')
      }
      await axios.delete(`http://localhost:20080/file/delete/${fileId}`)
          .then(await axios.post(`http://localhost:20080/test/delete`, payload));
    },
    test(a) {
      alert(a)
    }
  }
}
</script>
<template>
  <div v-if="name" class="card">
    <h4>Прикрепленные файлы:</h4>
    <div class="fileItems">
      <div class="file" v-for="file in fileData" :key="file.id">
        <a :href="file.link">{{ file.name }}</a>
        <p>Размер: {{ file.size }}Kb</p>
        <p>Тип файла: {{ file.type }}</p>
        <i class="pi pi-trash" style="font-size: 1rem" @click="removeFile(file.id)"></i>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  background-color: #9ea0f3;
  color:white;
  margin-top: 40px;
  padding:10px;
  border-radius:10px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
.card a{
  color:black
}
.file{
  padding: 0 20px;
  display:flex;
  justify-content: space-between;
  gap:10px;
  margin-top:20px;
}
</style>