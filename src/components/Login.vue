<script>
import axios from "axios";
import Auth from "../../services/auth.js";
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import setting from "../setting.js";

export default {
  name: 'Login',
  components: {
    InputText,
    Button
  },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {

    setToken(token) {
      Auth.login(token);
      this.$router.push('/all-comments');
    },

    async inputValue() {
      const data = {
        login: this.login,
        password: this.password,
      }

      try {
        const response = await axios.post(
                `${setting.remoteHost}auth/login`, data);

        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        const id = response.data.user.id;
        localStorage.setItem('userId', id.toString());
        Auth.login(token, refreshToken);
        this.$store.dispatch('login');
        console.log(data.login);
        if (data.login == 'admin') {
          localStorage.setItem('role', 'admin');
        }
        this.$router.push('/all-comments');

      } catch (e) {
        console.log(e);
      }

    }
  },
}
</script>
<template>
  <div class="authItem">
    <div class="inputGroup">
      <p>Вход в систему</p>
      <span class="p-float-label">
        <InputText id="login" v-model="login"/>
        <label for="login">Логин</label>
      </span>
      <span class="p-float-label">
        <InputText id="password" v-model="password" type="password"/>
        <label for="password">Пароль</label>
      </span>
      <div class="links">
        <Button icon="pi pi-google" rounded outlined aria-label="Filter"/>
      </div>
      <Button class="enterBtn" @click="inputValue()" label="Войти"/>
      <router-link to="/register">Зарегестрироваться</router-link>
      <div data-formid="form_w0H6Gtsgo6l1Tmly7rr554OY0eCi2eWB"></div>
      <div data-formid="form_xZpo7Lu1wSIonDe0uENz4wwtf7uvqaMr"></div>
    </div>
  </div>
</template>

<style scoped>
.authItem {
  display: flex;
  align-items: center;
  justify-content: center
}

.inputGroup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  gap: 50px;
}

.links {
  display: flex;
  gap: 20px;
}
</style>
