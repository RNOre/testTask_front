<script>
import Sidebar from 'primevue/sidebar';
import SplitButton from 'primevue/splitbutton';
import Toast from "primevue/toast";
import Menu from 'primevue/menu';
import Auth from "../../services/auth.js";
import MegaMenu from 'primevue/megamenu';
import {mapState} from "vuex";


export default {
  name: 'Header',
  components: {
    Sidebar,
    SplitButton,
    MegaMenu
  },
  computed: {
    ...mapState({
      commentsData: state => state.user,
      authStatus: state => state.user.auth
    })
  },
  created() {
    this.$store.dispatch('setHeader')
  },
  data() {
    return {
      visible: false,
      menuItems: [
        {
          label: 'Мои комментарии',
          icon: 'pi pi-fw pi-comment',
          command: () => {
            this.$router.push('/my-comments')
          }
        },
        {
          label: 'Все комментарии',
          icon: 'pi pi-fw pi-comments',
          command: () => {
            this.$router.push('/all-comments')
          }
        }
      ],
      items: [
        {separator: true},
        {
          label: 'Личный кабинет',
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.$router.push('/personal-cabinet')
          }
        },
        {
          label: 'Выйти',
          icon: 'pi pi-sign-out',
          badge: 2,
          command: () => {
            Auth.logout();
            this.$router.push('/login');
            this.$store.dispatch('logout');
          }
        },
        {separator: true}
      ]
    }
  },
  methods: {
    personalCabinet() {
      this.$router.push('/personal-cabinet')
    }
  }
}
</script>
<template>
  <div class="header" v-if="authStatus">
    <Toast/>
    <MegaMenu :model="menuItems" orientation="horizontal">
      <template #end>
        <SplitButton label="Save" icon="pi pi-plus" @click="personalCabinet" :model="items" raised text
                     severity="secondary">
          <Button @click="save" class="profileDropdown">
            <img alt="logo"
                 :src="commentsData.avatar"
                 style="width: 1rem"/>
            <span class="ml-2 flex align-items-center font-bold username">{{ commentsData.username }}</span>
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
</style>
