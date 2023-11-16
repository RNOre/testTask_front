<script>
import Fieldset from "primevue/fieldset";
import Divider from "primevue/divider";
import Image from "primevue/image";
import Chart from 'primevue/chart';
import {mapState} from "vuex";
import InputText from "primevue/inputtext";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from "axios";

export default {
  name: 'UserProfile',
  components: {
    Fieldset,
    Divider,
    Image,
    InputText,
    Loading,
    Chart
  },
  computed: {
    ...mapState({
      userData: state => state.user,
      chartDataFromState: state => state.user.chartData
    })
  },
  data() {
    return {
      editMode: false,
      FIO: '',
      login: '',
      city: '',
      phone: '',
      dateOfBirth: '',
      firstname: '',
      lastname: '',
      patronymic: '',
      isLoading: false,
      admin: false,
      // published_comments: null,
      // hidden_comments: null,
      chartData: null,
      chartOptions: null
    }
  },
  created() {
    this.$store.dispatch('getUserData', localStorage.getItem("userId"));

    if (localStorage.getItem('role') == 'admin') {
      this.$store.dispatch('getChartData');
      console.log(this.chartDataFromState)
      this.admin = true;
      // this.getChartData();
    }
  },
  methods: {
    toggleBtn() {
      this.editMode = true;
      this.username = this.userData.username;
      this.FIO = this.userData.FIO;
      this.city = this.userData.city;
      this.phone = this.userData.phone;
    },
    saveChange() {
      this.isLoading = true;
      const payload = {
        id: localStorage.getItem('userId'),
        body: {
          username: this.username,
          city: this.city,
          phone: this.phone,
          firstname: this.firstname,
          lastname: this.lastname,
          patronymic: this.patronymic,
        }
      };
      this.$store.dispatch('saveChange', payload)
          .then(this.editMode = false)
          .then(setTimeout(() => {
            this.isLoading = false
          }, 1500));
    },
    async getChartData() {
      await axios.get('http://localhost:21080/test/index')
          .then(resp => resp.data)
          .then(data => [this.chartDataFromState.published_comments, this.chartDataFromState.hidden_comments] = [data.published_comments, data.hidden_comments])
          .then(this.chartData = this.setChartData())
          .then(this.chartOptions = this.setChartOptions())
    },

    async setChartData() {
      const documentStyle = getComputedStyle(document.body);
      console.log(this.published_comments);
      const data = await axios.get('http://localhost:21080/test/index')
          .then(resp => resp.data);
      console.log(data);
      return {
        labels: ['Опубликованные посты', 'Скрытые посты'],
        datasets: [
          {
            data: [data.published_comments, data.hidden_comments],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--gray-500'), documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--gray-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      return {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
    }
  },

}
</script>
<template>
  <loading v-model:active="isLoading"/>
  <div class="personalCabinet">
    <Fieldset legend="Личные данные пользователя" class="userData">
      <span class="p-float-label" v-if="editMode">
        <InputText id="login" v-model="username" type="text"/>
        <label for="login">Логин</label>
      </span>
      <p v-else className="m-0">Логин пользователя: {{ userData.username }}</p>
      <Divider/>
      <div v-if="editMode">
        <label for="FIO">ФИО</label>
        <br/>
        <InputText id="FIO" v-model="firstname" placeholder="Фамилия" type="text"/>
        <InputText v-model="lastname" placeholder="Имя" type="text"/>
        <InputText v-model="patronymic" placeholder="Отчество" type="text"/>

      </div>
      <p v-else className="m-0">ФИО: {{ userData.FIO }}</p>
      <Divider/>
      <span class="p-float-label" v-if="editMode">
        <InputText id="city" v-model="city" type="text"/>
        <label for="city">Город</label>
      </span>
      <p v-else className="m-0">Город: {{ userData.city }}</p>
      <Divider/>
      <span class="p-float-label" v-if="editMode">
        <InputText id="phone" v-model="phone" type="text"/>
        <label for="phone">Телефон</label>
      </span>
      <p v-else className="m-0">Телефон: {{ userData.phone }}</p>
      <Divider/>
    </Fieldset>
    <div class="avatar">
      <div class="img">
        <Image :src="userData.avatar"
               alt="https://static.tildacdn.com/tild6338-3666-4133-a633-643664333838/photo.jpg"
               width="250"
               preview
        />
      </div>
      <div v-if="editMode" class="btnGroup">
        <Button class="btn" label="Отмена" severity="danger" @click="editMode=false"/>
        <Button class="btn" severity="success" label="Сохранить" @click="saveChange"/>
      </div>
      <Button class="btn" label="Изменить данные" v-else @click="toggleBtn"/>
    </div>
    <div class="chart">
      <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem"
             @click="this.hidden_comments++"/>
    </div>
  </div>
</template>
<style scoped>
.personalCabinet {
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
  grid-template-areas: "userData avatar charts";
  gap: 50px
}

.avatar {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  grid-template-area: avatar;
}

.userData {
  display: flex;
  grid-template-area: userData;
}

.img {
  background-color: #E9ECEF;
  padding: 5px;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0.15rem #C7D2FE;
  width: 250px;
}

.chart {
  grid-template-area: charts;
}

.btnGroup {
  display: flex;
  gap: 10px
}
</style>