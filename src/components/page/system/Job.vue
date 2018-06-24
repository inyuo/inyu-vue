<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="任务名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="loadData">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="handleAdd" disable=true>新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="tableData" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="55" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="name" label="任务名称" width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="group" label="任务组" width="100">
            </el-table-column>
            <el-table-column prop="quartzClass" label="任务类名" width="250">
            </el-table-column>
            <el-table-column prop="cron" label="表达式" width="110">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="105"
                             :filters="[{ text: '运行', value: 0 }, { text: '暂停', value: 1 }]"
                             :filter-method="filterTag"
                             :formatter="formatStatus"
                             sortable>
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status === '0' ? 'primary' : 'success'"
                            disable-transitions>
                        {{scope.row.status}}</el-tag>
                </template>
               <!-- <template scope="scope" >
                <el-button size="small" type="info" :formatter="formatStatus">
                    {{scope.row.status}}'</el-button>
                </template>-->
            </el-table-column>
            <el-table-column prop="msg" label="消息" width="205" sortable>
            </el-table-column>

            <el-table-column label="操作" width="300">
                <template scope="scope">
                    <el-button size="small" type="warning" :disabled="scope.row.status === 1 "
                               @click="handlePause(scope.$index, scope.row)">暂停
                    </el-button>

                    <el-button size="small" type="info"  :disabled="scope.row.status === 0 "
                               @click="handleResume(scope.$index, scope.row)">恢复
                    </el-button>

                    <el-button size="small" type="success"
                               @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="ID" prop="id" label-width="120px"   style="width:100%">
                    <el-input v-model="editForm.id" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="表达式" prop="cron" label-width="120px" style="width:100%"
                >
                    <el-input v-model="editForm.cron" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="附加消息" prop="msg" label-width="120px" style="width:100%">
                    <el-input type="textarea" v-model="editForm.msg" auto-complete="off"></el-input>
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
                <el-form-item label="任务名称" prop="name" label-width="120px" style="width:55%">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务分组" label-width="120px" style="width:55%">
                    <el-input v-model="addForm.group" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="表达式" label-width="120px" style="width:55%">
                    <el-input v-model="addForm.cron" auto-complete="off"></el-input>
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
    import {getJobListPage, editJob,pauseJob,resumeJob} from '../../../api/api';

    export default {
        data() {
            var checkName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入cron'));
                } else {
                    callback();
                }
            };
            return {
                filters: {
                    name: ''
                },
                tableData: [],
                total: 0,
                page: 1,
                pageSize: 20,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    cron: [
                        {validator: checkName, trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: '',
                    cron: '',
                    msg: '',
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {validator: checkName, trigger: 'blur'}
                    ],
                    group: [
                        {validator: checkName, trigger: 'blur'}
                    ],
                    cron: [
                        {validator: checkName, trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    group: '',
                    cron: '',
                }
            }
        },
        methods: {
            formatStatus: function (row, column) {
                return row.status == 0 ? '运行' : '暂停';
            },
            //从服务器读取数据
            loadData: function () {
                let para = {
                    queryObj: '',
                    currentPage: this.page,
                    pageSize: this.pageSize
                };
                this.listLoading = true;
                getJobListPage(para).then((res) => {
                    if (res.status === 0) {
                        this.total = res.data.length;
                        this.tableData = res.data;
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
                    this.listLoading = false;
                });
            },
            //单行删除
            handleDelete: function (index, row) {
                this.$http.post('job/deletejob', {
                    "jobClassName": row.name,
                    "jobGroupName": row.group
                }, {emulateJSON: true}).then(function (res) {
                    this.loadData();
                }, function () {
                    console.log('failed');
                });
            },

            //暂停任务
            handlePause: function (index, row) {
                console.log(row.status);
                if (row.status === 1){
                    this.$message({
                        message: '该任务已处于暂停状态',
                        type: 'warning'
                    });
                    return;
                }
                let param = {
                    id:row.id,
                };
                pauseJob(param).then((res) => {
                    this.editLoading = false;
                    if (res.status == 0) {
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.editFormVisible = false;

                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loadData();
                });
            },

            //恢复任务
            handleResume: function (index, row) {
                if (row.status === 0){
                    this.$message({
                        message: '该任务已处于激活状态！',
                        type: 'warning'
                    });
                    return;
                }
                let param = {
                    id:row.id,
                };
                resumeJob(param).then((res) => {
                    this.editLoading = false;
                    if (res.status == 0) {
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.editFormVisible = false;

                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this.loadData();
                });
            },

            //搜索
            search: function () {
                this.loadData();
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
                    group: '',
                    cron: '',
                };
            },

            //弹出对话框
            handleAddJob: function () {
                this.dialogFormVisible = true;
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //添加
            add: function () {
                this.$http.post('job/addjob', {
                    "jobClassName": this.form.jobName,
                    "jobGroupName": this.form.jobGroup,
                    "cronExpression": this.form.cronExpression
                }, {emulateJSON: true}).then(function (res) {
                    this.loadData();
                    this.dialogFormVisible = false;
                }, function () {
                    console.log('failed');
                });
            },

            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = {
                                id: this.editForm.id,
                                cron: this.editForm.cron,
                                msg: this.editForm.msg
                            };
                            editJob(para).then((res) => {
                                this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.loadData();
                            });
                        });
                    }
                });
            },

            //更新任务
            update: function () {
                this.$http.post
                ('job/reschedulejob',
                    {
                        "jobClassName": this.updateform.name,
                        "jobGroupName": this.updateform.group,
                        "cronExpression": this.updateform.cron
                    }, {emulateJSON: true}
                ).then(function (res) {
                    this.loadData();
                    this.updateFormVisible = false;
                }, function () {
                    console.log('failed');
                });

            },

            //每页显示数据量变更
            handleSizeChange: function (val) {
                this.pageSize = val;
                this.loadData();
            },

            //页码变更
            handleCurrentChange: function (val) {
                this.currentPage = val;
                this.loadData();
            },
        },
        mounted() {
            this.loadData();
        }
    }
</script>

<style scoped>

</style>
