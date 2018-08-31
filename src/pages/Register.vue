<template>
    <div>
      <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      ></van-nav-bar>

      <div class="register-panel">

        <van-field
          v-model="username"
          label="用户名"
          icon="clear"
          :error-message="usernameErr"
          placeholder="请输入用户名"
          required
          @click-icon="username=''"
        >
        </van-field>

        <van-field
          v-model="password"
          label="密码"
          :error-message="passwordErr"
          placeholder="请输入密码"
          required
          type="password"
        >
        </van-field>

        <div class="register-button">
          <van-button type="primary" :loading="loading" @click="registerAction" size="large">马上注册</van-button>
        </div>

      </div>


    </div>
</template>

<script>
  import axios from 'axios'
  import URL from '@/serviceAPI.config'
  import { Toast } from 'vant'
  export default {
    name: "Register",
    data() {
      return {
        username: '',
        password: '',
        usernameErr: '',
        passwordErr: '',
        loading: false
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      registerAction() {
        this.checkForm() && this.register()
      },
      register() {
        this.loading = true
        axios({
          url: URL.registerUser,
          method: 'POST',
          data: {
            username: this.username,
            password: this.password
          }
        }).then(response => {
          if (response.data.resultCode === 200) {
            Toast.success('注册成功')
            localStorage.setItem('userInfo', JSON.stringify({username: this.username, password: this.password}))
            this.$router.push('/')
          } else {
            Toast.fail('注册失败')
            this.loading = false
          }
          console.log(response.data)
        }).catch(err => {
          Toast.fail('注册失败')
          this.loading = false
        })
      },
      checkForm() {
        let isOk = true
        if (this.username.length < 5) {
          this.usernameErr = '用户名不能少于5个字符'
          isOk = false
        } else {
          this.usernameErr = ''
        }
        if (this.password.length < 6) {
          this.passwordErr = '密码不能少于6个字符'
          isOk = false
        } else {
          this.passwordErr = ''
        }
        return isOk
      }
    }
  }
</script>

<style scoped>
  .register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
  }
  .register-button {
    padding-top: 10px;
  }
</style>
