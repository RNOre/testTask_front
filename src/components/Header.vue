<script>
import Sidebar from 'primevue/sidebar';
import SplitButton from 'primevue/splitbutton';
import Toast from "primevue/toast";
import Menu from 'primevue/menu';


export default {
  name: 'Header',
  components: {
    Sidebar,
    SplitButton,
  },
  data() {
    return {
      visible: false,
      items: [
        {separator: true},
        {
          label: 'Личный кабинет',
          icon: 'pi pi-fw pi-user'
        },
        {
          label: 'Выйти',
          icon: 'pi pi-sign-out',
          badge: 2
        },
        {separator: true}
      ]
    }
  },
  methods: {}
}
</script>
<template>
  <div class="header">
    <Toast/>
    <div class="card flex justify-content-center">
      <Sidebar v-model:visible="visible">

        <div class="linkItems">
          <router-link to="/all-comments" @click="visible = false">
            <h2>All comments</h2>
          </router-link>
          <router-link to="/my-comments" @click="visible = false">
            <h2>My comments</h2>
          </router-link>


        </div>
      </Sidebar>
    </div>
    <div class="navItems">
      <Button icon="pi pi-align-justify" @click="visible = true"/>


      <SplitButton label="Save" icon="pi pi-plus" @click="save" :model="items">
        <Button @click="save" class="profileDropdown">
            <img alt="logo"
                 src="https://yt3.googleusercontent.com/k_LC5oQii8OpIXcQNvOtvWHN9CnBD5V9XdGDIouHuavMj8m-sEkwtMzvm8V8GC8InE5Uwdz6RK4=s900-c-k-c0x00ffffff-no-rj"
                 style="width: 1rem"/>
            <span class="ml-2 flex align-items-center font-bold username">admin</span>
        </Button>
      </SplitButton>
    </div>
  </div>
</template>
<style scoped>
.header {
  height: 70px;
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-top: 10px;
}

.navItems {
  display: flex;
  align-items: center;
  padding: 0 100px;
  justify-content: space-between;
}

.linkItems h2 {
  margin-bottom: 20px;
  color: #4B5563
}

.linkItems h2:hover {
  margin-bottom: 20px;
  color: #6366F1
}

a {
  text-decoration: none;
}
.username{
  margin-left:10px
}
.profileDropdown{
  width:150px;
  height: 50px
}
</style>
