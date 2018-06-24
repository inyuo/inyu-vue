<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="联系人" width="100">
            </el-table-column>
            <el-table-column prop="industry" label="公司" width="200">
            </el-table-column>
            <el-table-column prop="telephone" label="手机" min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="landlineTelephone" label="办公电话" width="125">
            </el-table-column>
            <el-table-column prop="fax" label="传真" width="125">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="170">
            </el-table-column>
            <el-table-column prop="origin" label="来源" width="120" sortable>
            </el-table-column>
            <el-table-column prop="address" label="地址" width="180" >
            </el-table-column>
            <el-table-column prop="zipCode" label="邮编" width="100" sortable>
            </el-table-column>
            <el-table-column prop="annualRevenue" label="注册资本" width="120">
            </el-table-column>
            <el-table-column prop="licencNo" label="执照号" width="120">
            </el-table-column>
            <el-table-column prop="updateTime" label="最后编辑" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="block">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 50, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="花名">
                    <el-input v-model="editForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="editForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthday"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="editForm.address"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.password="addForm.password" ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="花名">
                    <el-input v-model="addForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" auto-complete="on" ></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model.telephone="addForm.telephone" type="number" ></el-input>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthday"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="addForm.address"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import {getCustomersByPage, delCustomer, batchRemoveUser,  addUser,getIpHost} from '../../../api/api';

    export default {
        data() {
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入电话号码！'));
                } else if (!util.isvalidPhone(value)) {
                    callback(new Error('请输入正确的11位手机号码'));
                } else {
                    callback()
                }
            };
            var checkEMail = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入邮箱地址！'));
                } else if (!util.isvalidEmail(value)) {
                    callback(new Error('请输入正确邮箱地址'));
                } else {
                    callback()
                }
            };
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                setTimeout(() => {
                    if (value.length < 3 || value.length > 13) {
                        callback(new Error('用户名长度3-12'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            var checkPass = (rule, value, callback) => {
                console.log(value);
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (value.length>2&&value.length<12){
                        callback();
                    }else {
                        callback(new Error('请输入密码3-12位！'));
                    }
                }
            };

            return {
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                pageSize: 20,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {validator: checkName,required: true, trigger: 'blur'},

                    ],
                    telephone: [
                        {validator: checkPhone, required: true, trigger: 'blur'}
                    ],
                    email:[
                        {validator: checkEMail, required: true, trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    name: '',
                    sex: -1,
                    nickname: '',
                    email: '',
                    birthday: '',
                    address: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {validator: checkName, required: true, trigger: 'blur'},
                    ],
                    password: [
                        {validator: checkPass, required: true, trigger: 'blur'}
                    ],
                    telephone: [
                        {validator: checkPhone,  trigger: 'blur'}
                    ],
                    email:[
                        {validator: checkEMail,  trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    password: '1',
                    nickname: '花花',
                    sex: -1,
                    email: 'default@qq.com',
                    birthday: '',
                    address: 'default address'
                }
            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            formatStatus: function (row, column) {
                return row.status == 1 ? '已激活' : row.status == 0 ? '未验证' : '未知';

            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    queryObj: this.filters.name == null || this.filters.name ? null : '',
                    currentPage: this.page,
                    pageSize: this.pageSize
                };
                getIpHost(null).then((res)=>{
                    console.log(res);
                });
                this.listLoading = true;
                getCustomersByPage(para).then((res) => {
                    if (res.status === 0) {
                        this.total = res.data.totalNum;
                        this.users = res.data.itemList;
                        this.listLoading = false;
                        this.$message({
                            message: '加载成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '加载失败',
                            type: 'error'
                        });
                    }
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    debugger;
                    var customerId = {
                        "customerId": row.customerId
                    };
                    delCustomer(customerId).then((res) => {
                        this.listLoading = false;
                        if(res.status==0){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }else {
                            this.$message({
                                message: '删除失败',
                                type: 'warning'
                            });
                        }
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    birthday: '',
                    address: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                           /* editUser(para).then((res) => {
                                this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });*/
                        });
                    }
                });
            },
            // 用户新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            para.birthday = (!para.birthday || para.birthday == '') ? '' : util.formatDate.format(new Date(para.birthday), 'yyyy-MM-dd');

                            addUser(para).then((res) => {
                                this.addLoading = false;
                                if (res.status==0){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                }else {
                                    this.$message({
                                        message: '提交失败',
                                        type: 'error'
                                    });
                                }
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getUsers();
        }
    }

</script>

<style scoped>

</style>
