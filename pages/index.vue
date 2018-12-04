<template>
  <el-container class="is-vertical" style="height: 100vh;">
    <Header
    @viewChange="viewChange"
    :viewMode="viewMode"
    @formVisible="dialogFormChange"
    :dialogFormVisible="dialogFormVisible"
    :isLogin="isLogin" />
    <el-main >
      <Content
      :viewMode="viewMode"
      :dialogFormVisible="dialogFormVisible"
      @formVisible="dialogFormChange"
      />
    </el-main>
  </el-container>
</template>

<script>
import Header from '@/components/header'
import Content from '@/components/content'
import firebase from '@/plugins/firebase'
export default {
  components : {
    Header,Content
  },
  data() {
    return {
      viewMode : "edit",
      dialogFormVisible: false,
      isLogin: false,
      userData:null
    }
  },
  methods: {
    //編集モードの切り替え header.vueコンポーネントから受け取る用
    viewChange(type){
      this.viewMode = type;
    },
    dialogFormChange(check){
      this.dialogFormVisible = check;
    },
    //ログイン状態の確認 header.vueコンポーネントから受け取る用
    loginCheck(login){
      this.isLogin = login;
    }
  },
  mounted: function() {
  　　　　//firebaseのログインログアウトにより、userData,isLoginにそれぞれ情報を代入
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLogin = true;
        this.userData = user;
      } else {
        this.isLogin = false;
        this.userData = null;
      };
    });
  },
  created: function(){
  　　　//Vuexアクションのinitを走らせる
    this.$store.dispatch('init');
  }
}
</script>
