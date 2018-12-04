import Vuex from 'vuex'
import firebase from '@/plugins/firebase'

const store = () => {
  return new Vuex.Store({
    state: {
      memos:[],
      user:[]
    },
    mutations: {
      //stateにメモ情報をセット
      setMemo(state, memo){
        state.memos = memo
      },
      //メモを追加した時
      addMemo(state, memo){
        state.memos.push(memo)
      },
      //メモ編集した時
      editMemo(state,editedMemo){
        //keyが同じメモのindexを取得
        const memoIndex = state.memos.findIndex(
          memo => memo.key === editedMemo.key
        );
        //stateのメモに上書き
        state.memos[memoIndex] = editedMemo
      },
      //メモの削除
      deleteMemo(state,memo){
        state.memos.splice(memo,1)
      },
      //ユーザー情報が変更された時
      onAuthStateChanged(state, user) {
        state.user = user;
      }
    },
    actions: {
      init(vuexContext) { // initialize
        //ユーザーがログインしてるか否かでfirebaseとlocalstorageを切り替える
        if(Object.keys(vuexContext.state.user).length){
          //firebaseから全情報を取得し、keyを追加してsetMemoに投げる
          return this.$axios.$get('/posts.json')
          .then(data => {
            const postArray = []
            for(const key in data){
              postArray.push({
                ...data[key],key: key
              })
            }
            vuexContext.commit('setMemo', postArray)
          })
          .catch(e => console.log(e))
        }else{
          //localstorageにあればそれをsetMemoに投げる
          let memoList = JSON.parse(localStorage.getItem('tempoMemo') || '[]');
          vuexContext.commit('setMemo', memoList)
        }
      },
      addMemo(vuexContext, memo) { //メモを追加
        let addMemo = [];
        //ユーザーがログインしてるか否かでfirebaseとlocalstorageを切り替える
        if(Object.keys(vuexContext.state.user).length){
          //firebaseにメモ情報をpostし、addMemoにも投げる
          return this.$axios.$post('/posts.json',memo)
          .then(data => {
            vuexContext.commit('addMemo',{...memo})
          })
          .catch(e => console.log(e));
        }else{
          //localstorageにメモを追加する、addMemoにも投げる
          addMemo = vuexContext.state.memos;
          addMemo.push({
              ...memo,
              key: "key" + Date.now()
          });
          localStorage.setItem('tempoMemo', JSON.stringify(addMemo));
          vuexContext.commit('setMemo',addMemo)
        }


      },
      //メモの編集
      editMemo(vuexContext, editedMemo) {
        editedMemo.updateDate = new Date()
        //ユーザーがログインしてるか否かでfirebaseとlocalstorageを切り替える
        if(Object.keys(vuexContext.state.user).length){
          //firebaseにメモ情報をput,keyを渡すとピンポイントで変更できる、そしてeditMemoにも投げる
          return this.$axios.$put('/posts/'+ editedMemo.key + '.json',
          editedMemo)
          .then(result => {
            vuexContext.commit('editMemo',editedMemo)
          })
          .catch(e => console.log(e))
        }else{
          //localstorageにメモを保存、editMemoにも投げる
          let memoIndex = vuexContext.state.memos.findIndex(
            memo => memo.key === editedMemo.key
          );
          vuexContext.state.memos[memoIndex] = editedMemo
          localStorage.setItem('tempoMemo', JSON.stringify(vuexContext.state.memos));
          vuexContext.commit('editMemo',editedMemo)
        }
      },
      //メモをセット
      setMemo(vuexContext, memos){
        vuexContext.commit('setMemo',memos)
      },
      //メモの削除
      deleteMemo(vuexContext,{key,index}){
        //ユーザーがログインしてるか否かでfirebaseとlocalstorageを切り替える
        if(Object.keys(vuexContext.state.user).length){
          //delete,keyをすると削除できる、deleteMemoへindexを投げる
          index = vuexContext.state.memos.findIndex(
            memo => memo.key === key
          );
          return this.$axios.delete('/posts/' + key + '.json' )
          .then((res) => {
            vuexContext.commit('deleteMemo',index)
          })
        }else{
          //localstorageから削除、同じくdeleteMemoへindexを投げる
          let memos = vuexContext.state.memos;
          memos.splice(index,1);
          localStorage.setItem('tempoMemo', JSON.stringify(memos));
          vuexContext.commit('deleteMemo',index)
        }


      },
      //ログインログアウトの処理
      userCheck(vuexContext,data){
        if(data){
          //Googleによるログイン
          firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
        }else{
          //ログアウト処理
          firebase.auth().signOut();
        }

      },
      //ログイン状態の切り替え
      onAuth(vuexContext) {
        firebase.auth().onAuthStateChanged(user => {
          user = user ? user : {};
          vuexContext.commit("onAuthStateChanged", user);
          //ローカルとfirebase切り替えのため一旦リセット
          vuexContext.dispatch('init');
        });
      }

    },
    getters: {
      memos(state){
        //ユーザーのidが同じものだけ取得する
        return state.memos.filter(item => {
          return item.userId == state.user.uid
        })
      },
      user(state) {
        return state.user
      }
    }
  })
}

export default store
