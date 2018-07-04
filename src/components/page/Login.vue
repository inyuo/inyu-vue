<template>
    <div class="login-wrap">
        <div class="ms-title">INYU管理平台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <div id="captcha">
                        <div id="wait" class="show">正在加载验证码......</div>
                    </div>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:45%;" @click.native.prevent="handleSubmit"
                               :loading="logining">登录
                    </el-button>
                    <el-button style="width:45%;" @click.native.prevent="handleReset">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {requestLogin, getBingPic, getIpHost} from '../../api/api';
    import gt from "../../assets/geetest/gt";
    import slid from "../../assets/geetest/slider";

    export default {
        data: function () {
            return {
                logining: false,
                ruleForm: {
                    username: 'admin',
                    password: '1'
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                checked: true
            }
        },
        methods: {
            handleReset() {
                this.$refs.ruleForm.resetFields();
            },
            getBackgroupPic() {
                getBingPic(null).then(res => {
                    console.log(res)
                    this.logining = false;
                    if (res.status == 1) {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(res.data));
                        this.$router.push({path: '/table'});
                    }
                });

            },

            handleSubmit(e) {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        let para = Object.assign({}, this.ruleForm);
                        requestLogin(para).then(res => {
                            this.logining = false;
                            if (res.status == 1) {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            } else {
                                localStorage.setItem('ms_username', this.ruleForm.username);
                                sessionStorage.setItem('user', JSON.stringify(res.data));
                                this.$router.push('/');
                                // this.$router.push({path: '/table'});
                            }
                        });
                    } else {
                        console.log('check your username or password!!');
                        return false;
                    }
                });
            }
        }, mounted() {
            // this.getBackgroupPic();
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
