<template>
  <el-header style="display: flex;align-items:center;border-bottom: 1px solid #eee;">

    <span style="margin-right: 30px;">TEMPO MEMO</span>
    <el-radio-group v-model="tabPosition" size="small" style="margin-right: 30px" @input="changeMode">
      <el-radio-button label="edit"><i class="el-icon-edit"></i></el-radio-button>
      <el-radio-button label="editview"><i class="el-icon-edit"></i><i class="el-icon-view"></i></el-radio-button>
      <el-radio-button label="view"><i class="el-icon-view"></i></el-radio-button>
    </el-radio-group>
    <div class="subMenu">
      <el-button type="warning" round size="medium" icon="el-icon-plus" @click="addMemo" :disabled="Object.keys(memos).length > 9">新規作成</el-button>
      <el-button icon="el-icon-download" circle size="medium" style="margin-left: 30px" @click="textDownload" id="download" download="markdown.txt" href="#"></el-button>
      <span v-if="isLogin" style="margin-left: 30px;">{{user.displayName}}さん</span>
      <el-button type="text" size="medium" style="margin-left: 30px" @click="$emit('formVisible',true)" v-else>ログイン</el-button>

      <el-dropdown style="margin-left: 30px" @command="handleCommand">
        <i class="el-icon-setting"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout" v-if="isLogin">ログアウト</el-dropdown-item>
          <el-dropdown-item command="signup" v-else>Googleアカウントでログイン</el-dropdown-item>
          <el-dropdown-item><nuxt-link to="/help">ヘルプ</nuxt-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

  </el-header>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'edit',
      };
    },
    props: ["viewMode","dialogFormVisible","isLogin"],
    computed: {
      user() {
        return this.$store.getters.user;
      },
      memos() {
        return this.$store.getters.memos;
      }
    },
    methods:{
      //編集モードを切り替えた時、親の関数viewChangeに渡す
      changeMode: function(type){
    　　  this.$emit('viewChange',type);
       localStorage.setItem('tempoMemo_style', type);
    　 },
      //新規作成ボタンを押した時
      addMemo: function () {
        let memo = {
           title: "未設定",
           content: "",
           userId: this.user.uid,
           updateDate: new Date()
        }
        this.$store.dispatch('addMemo',memo)
      },
      //elementのdropdown(ログイン、ログアウトを押した時)、commandで判断して処理を分ける
      handleCommand(command) {
        if(command == "signup"){
          this.$store.dispatch('userCheck',true);
        }else if(command == "logout"){
          this.$store.dispatch('userCheck',false);
        }
      },
      //jsonダウンロード押した時
      textDownload: function () {
        var csv = this.$store.getters.memos;
        let blob = new Blob([JSON.stringify(csv, null, '  ')], { type: 'application/json' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'markdown.json'
        link.click()
      }
    },
    created: function () {
      //ログイン中か否か確認のためVuexのonAuth
      this.$store.dispatch('onAuth');
      //編集モードをlocalStorageから取得
      if(localStorage.getItem('tempoMemo_style')){
        this.tabPosition = localStorage.getItem('tempoMemo_style');
        this.$emit('viewChange',this.tabPosition);
      }else{
        this.tabPosition = this.viewMode;
      }
    }
  };
</script>

<style scoped>
i[class^=el-icon] {
    font-size: 18px;
}
.subMenu {
  flex-grow:1;
  text-align: right;
}
.subMenu i {
  font-size: 20px;
}
.el-dropdown {
  vertical-align: middle;
}
.subMenu .el-button.el-button--medium {
  font-size: 14px;
}
.subMenu .el-button.el-button--medium i {
  font-size: 14px;
}
.el-dropdown-menu__item a {
  display: block;
  text-decoration: none;
  color: inherit;
}
</style>
