<template>
  <div style="display: flex;flex-direction: column; width: 100%;">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="(item) in memos"
      :key="item.key"
      :index="item.key">
        <el-popover
        class="popOver"
        placement="top-start"
        width="240"
        trigger="click">
          <div class="el-popover__content">
            <span>Title:</span><input type="text" v-model="item.title" @blur="editMemo('')">
          </div>
          <span slot="reference">{{item.title}}</span>
        </el-popover>
        <span class="menu-text">{{item.title}}</span>
        <i class="el-icon-close" @click="dialogVisible = true"></i>
      </el-menu-item>
    </el-menu>
    <Edit :viewMode="viewMode" :editText="memoContent" @editMemo="editMemo" v-if="Object.keys(memos).length"/>
    <el-dialog
      title="削除"
      :visible.sync="dialogVisible"
      width="30%">
      <span>本当に削除しますか？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="deleteMemo(false)">削除</el-button>
      </span>
    </el-dialog>
    <el-dialog title="ログイン(まだ未実装)" :visible.sync="dialogFormVisible" @close="$emit('formVisible',false)">
      <el-form :model="form">
        <el-form-item label="E-mail" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.passward" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('formVisible',false)">キャンセル</el-button>
        <el-button type="primary" @click="$emit('formVisible',false)">送信</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Edit from '@/components/edit'
export default {
  components : {
    Edit
  },
  props:['viewMode','dialogFormVisible'],
  data() {
    return {
      activeIndex: '',
      memoIndex: '',
      dialogVisible: false,
      popVisible: false,
      formLabelWidth: '120px',
      form: {
          email: '',
          password: '',
      },
      user: ""
    };
  },
  computed: {
    //Vuexからメモ情報をゲッターで取得
    memos: function () {
      return this.$store.getters.memos
    },
    //本文をedit.vueに渡すために抽出
    memoContent: function () {
      if(this.memos[this.memoIndex]){
          return this.memos[this.memoIndex].content
      }
    }

  },
  methods: {
    //メモの選択した時
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      this.memoIndex = this.memos.findIndex(
          memo => memo.key === this.activeIndex
      );
    },
    //タイトルを変更するためのツールチップを表示
    popOver(key){
      if(key == this.activeIndex){
        this.popVisible = true;
      }
    },
    //メモを編集した時
    editMemo(memo){
      if(memo){ //本文修正の時だけ代入
        this.memos[this.memoIndex].content = memo
      }
      this.$store.dispatch('editMemo',this.memos[this.memoIndex]);
    },
    //メモを削除した時
    deleteMemo(display){
      this.dialogVisible = display;
      this.$store.dispatch('deleteMemo',{ key: this.activeIndex, index: this.memoIndex });
      this.activeIndex = "";
    },

  },
  created: function(){
    this.user = this.$store.getters.user;

  }
}
</script>

<style scoped>
.el-menu--horizontal>.el-menu-item {
  height: 48px;
  line-height: 48px;
  transition: color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);
}
.el-menu--horizontal>.el-menu-item * {
  vertical-align: initial;
}
.el-menu-item .popOver {
  display: none;
}
.el-menu-item .popOver span{
    line-height: 48px;
    display: inline-block;
}
.el-menu-item.is-active .popOver {
  display: inline-block;
}
.el-menu-item.is-active .menu-text {
  display: none;
}
.el-menu-item [class^=el-icon-].el-icon-close {
  font-size: 12px;
  width: 0;
  overflow: hidden;
  border-radius: 50%;
  text-align: center;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  position: relative;
  top: 2px;
}
.el-menu-item.is-active:hover {
  padding: 0 10px;
}
.el-menu-item.is-active:hover [class^=el-icon-].el-icon-close {
  width: 12px;
  margin-left: 8px;
}
[class^=el-icon-].el-icon-close:hover {
  color: #409EFF;
}
.el-popover__content {
  display: flex;
}
.el-popover__content input {
  flex-grow: 1;
  padding: 2px;
}
</style>
