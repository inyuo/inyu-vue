<template>
    <div class="login-wrap">
        <div class="ms-title">INYU管理平台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username"
                              placeholder="username">

                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password"
                              placeholder="password"
                              v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')">

                    </el-input>
                </el-form-item>

                <el-form-item prop="captcha">
                    <div id="captcha">
                        <div id="wait" class="show">
                            正在加载验证码......
                        </div>
                    </div>
                </el-form-item>

                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:45%;"
                               id="btn"
                               @click.native.prevent="handleSubmit"
                               :loading="logining">
                        登录
                    </el-button>
                    <el-button style="width:45%;"
                               @click.native.prevent="handleReset">
                        注册
                    </el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    import {requestLogin, getBingPic, getIpHost} from '../../api/api';
    import gt from "../../assets/geetest/gt";
    import $ from 'jquery'

    var handler = function (captchaObj) {
        captchaObj.appendTo('#captcha');
        captchaObj.onReady(function () {
            $("#wait").hide();
        });
        $('#btn').click(function () {
            var result = captchaObj.getValidate();
            if (!result) {
                return alert('请完成验证');
            }
            $.ajax({
                //这里的地址是根据你的后台接口的地址，我这里是这样的
                url: 'http://localhost:8080/gt/validate',
                type: 'POST',
                dataType: 'json',
                data: {
                    geetest_challenge: result.geetest_challenge,
                    geetest_validate: result.geetest_validate,
                    geetest_seccode: result.geetest_seccode
                },
                success: function (data) {
                    if (data.status === 'success') {
                        alert('登录成功');
                    } else if (data.status === 'fail') {
                        alert('登录失败，请完成验证');
                        captchaObj.reset();
                    }
                }
            });
        })
    };


    export default {
        data: function () {
            return {
                logining: false,
                gtValidate:false,
                ruleForm: {
                    username: 'admin',
                    password: '1',
                    captcha:''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                checked: true,
                msg: ''
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
            geeTestInit() {
                //这个地址也是需要根据自己的后台接口地址来改动
                $.ajax({
                    url: "http://localhost:8080/gt/register?t=" + (new Date()).getTime(), // 加随机数防止缓存
                    type: "get",
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        // 调用 initGeetest 进行初始化
                        // 参数1：配置参数
                        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口

                        initGeetest({
                            // 以下 4 个配置参数为必须，不能缺少
                            gt: data.gt,
                            challenge: data.challenge,
                            // 表示用户后台检测极验服务器是否宕机
                            offline: !data.success,
                            // 用于宕机时表示是新验证码的宕机
                            new_captcha: data.new_captcha,

                            // 产品形式，包括：float，popup
                            product: "float",
                            width: "300px"
                            // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
                        }, handler);
                    }
                });

            },
            handleSubmit(e) {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        debugger;
                       var cap =  $('#captcha');
                       var cpa1 = this.captcha;

                        this.logining = true;
                        let para = Object.assign({}, this.ruleForm);
                        debugger;
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
                            }
                        });
                    } else {
                        this.gtValidate = false;
                        return false;
                    }
                });
            }
        }, mounted() {
            this.geeTestInit();
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
