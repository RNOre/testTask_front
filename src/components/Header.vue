<script>
import Sidebar from 'primevue/sidebar';
import SplitButton from 'primevue/splitbutton';
import Toast from "primevue/toast";
import Menu from 'primevue/menu';
import Auth from "../../services/auth.js";
import MegaMenu from 'primevue/megamenu';


export default {
  name: 'Header',
  components: {
    Sidebar,
    SplitButton,
    MegaMenu
  },
  data() {
    return {
      visible: false,
      menuItems:[
        {
          label:'Мои комментарии',
          icon:'pi pi-fw pi-comment',
          command:()=>{
            this.$router.push('/my-comments')
          }
        }  ,
        {
          label:'Все комментарии',
          icon:'pi pi-fw pi-comments',
          command:()=>{
            this.$router.push('/all-comments')
          }
        }
      ],
      items: [
        {separator: true},
        {
          label: 'Личный кабинет',
          icon: 'pi pi-fw pi-user'
        },
        {
          label: 'Выйти',
          icon: 'pi pi-sign-out',
          badge: 2,
          command: () => {
            Auth.logout();
            this.$router.push('/login')
          }
        },
        {separator: true}
      ]
    }
  },
  methods: {
  }
}
</script>
<template>
  <div class="header" >
    <Toast/>
    <MegaMenu :model="menuItems" orientation="horizontal">
      <template #end>
        <SplitButton label="Save" icon="pi pi-plus" @click="save" :model="items">
          <Button @click="save" class="profileDropdown">
            <img alt="logo"
                 src="https://yt3.googleusercontent.com/k_LC5oQii8OpIXcQNvOtvWHN9CnBD5V9XdGDIouHuavMj8m-sEkwtMzvm8V8GC8InE5Uwdz6RK4=s900-c-k-c0x00ffffff-no-rj"
                 style="width: 1rem"/>
            <span class="ml-2 flex align-items-center font-bold username">admin</span>
          </Button>
        </SplitButton>
      </template>
    </MegaMenu>
  </div>
</template>
<style scoped>
.header {
  padding-top: 10px;
}

/*.navItems {*/
/*  display: flex;*/
/*  align-items: center;*/
/*  padding: 0 100px;*/
/*  justify-content: space-between;*/
/*}*/

/*.linkItems h2 {*/
/*  margin-bottom: 20px;*/
/*  color: #4B5563*/
/*}*/

/*.linkItems h2:hover {*/
/*  margin-bottom: 20px;*/
/*  color: #6366F1*/
/*}*/

/*a {*/
/*  text-decoration: none;*/
/*}*/

/*.username {*/
/*  margin-left: 10px*/
/*}*/

/*.profileDropdown {*/
/*  width: 150px;*/
/*  height: 50px*/
/*}*/
</style>
