<template>
    <section>
        <!--工具条-->

        <el-row>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="getUsers">查询</el-button>
                    </el-form-item>
                    <!--<el-form-item>
                        <el-button type="primary" @click.native="handleAdd">新增</el-button>
                    </el-form-item>-->
                </el-form>
            </el-col>
        </el-row>

        <el-row>
            <el-tabs type="border-card">
                <el-tab-pane label="客户全景">
                    <span slot="label"><i class="el-icon-date"></i> 客户全景</span>
                    <!--列表-->
                    <el-row>
                        <!--资料-->
                        <el-col :span="12">
                            <!--基本资料-->
                            <el-col :span="24">
                                <el-card class="box-card" shadow="hover ">
                                    <div slot="header" class="clearfix">
                                        <span>基本资料</span>
                                        <i style="float: right; padding: 3px 0" class="el-icon-edit"></i>
                                    </div>
                                    <!--<div v-for="o in 4" :key="o" class="text item">
                                        {{'列表内容 ' + o }}
                                    </div>-->
                                    <div class="text item">
                                        <el-col :span="4">
                                            <div class="text item">客户类型：</div>
                                            <div class="text item">上级客户：</div>
                                            <div class="text item">手机：</div>
                                        </el-col>
                                        <el-col :span="20" style="float: left">
                                            <div class="text item">意向客户{{ index }}</div>
                                            <div class="text item">XXX{{ index }}</div>
                                            <div class="text item">13133333333{{ index }}</div>
                                        </el-col>
                                    </div>
                                </el-card>
                            </el-col>
                            <!--联系人-->
                            <el-col :span="24">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>联系人</span>
                                        <i style="float: right; padding: 3px 0" class="el-icon-plus"></i>
                                    </div>
                                    <!--<div v-for="o in 4" :key="o" class="text item">
                                        {{'列表内容 ' + o }}
                                    </div>-->
                                    <div class="text item">
                                        <el-col :span="4">
                                            <div class="text item">部门：</div>
                                            <div class="text item">职务：</div>
                                            <div class="text item">电话：</div>
                                            <div class="text item">手机：</div>
                                            <div class="text item">邮箱：</div>
                                        </el-col>
                                        <el-col :span="20" style="float: left">
                                            <div class="text item"> 客服2部{{ index }}</div>
                                            <div class="text item">客户经理{{ index }}</div>
                                            <div class="text item">0571-34567890{{ index }}</div>
                                            <div class="text item">13234567890{{ index }}</div>
                                            <div class="text item">qwer@163.com{{ index }}</div>
                                        </el-col>
                                    </div>
                                </el-card>
                            </el-col>
                            <!--商机-->
                            <el-col :span="24">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>商机(2)</span>
                                        <i style="float: right; padding: 3px 0" class="el-icon-plus"></i>
                                    </div>
                                    <div class="text item">
                                        <el-col :span="6">
                                            <div class="text item">跟进记录报表：</div>
                                            <div class="text item">客户公海：</div>

                                        </el-col>
                                        <el-col :span="9" style="float: left">
                                            <div class="text item"> $3.00{{ index }}</div>
                                            <div class="text item"> $1.00{{ index }}</div>
                                        </el-col>
                                        <el-col :span="9" style="float: left">
                                            <div class="text item"> 谈判/合同{{ index }}</div>
                                            <div class="text item">赢单{{ index }}</div>
                                        </el-col>
                                    </div>
                                </el-card>
                            </el-col>
                            <!--合同-->
                            <el-col :span="24">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>合同(1)</span>
                                        <i style="float: right; padding: 3px 0" class="el-icon-plus"></i>
                                    </div>
                                    <div class="text item">
                                        <el-col :span="6">
                                            <div class="text item">客户公海：</div>

                                        </el-col>
                                        <el-col :span="9" style="float: left">
                                            <div class="text item"> $1.00{{ index }}</div>
                                        </el-col>
                                        <el-col :span="9" style="float: left">
                                            <div class="text item">未开始{{ index }}</div>
                                        </el-col>
                                    </div>
                                </el-card>
                            </el-col>
                            <!--交易数据-->
                            <el-col :span="24">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>合同(1)</span>
                                        <i style="float: right; padding: 3px 0" class="el-icon-plus"></i>
                                    </div>
                                    <div class="text item">
                                        <el-col :span="6">
                                            <div class="text item">$3.00{{ index }}</div>
                                            <div class="text item">已成交</div>

                                        </el-col>
                                        <el-col :span="9" style="float: left">
                                            <div class="text item"> $12.00{{ index }}</div>
                                            <div class="text item"> 已回款{{ index }}</div>
                                        </el-col>
                                        <el-col :span="9" style="float: left">
                                            <div class="text item">$3299.00{{ index }}</div>
                                            <div class="text item">潜在交易{{ index }}</div>
                                        </el-col>
                                    </div>
                                </el-card>
                            </el-col>

                        </el-col>

                        <!--销售动态-->
                        <el-col :span="10">
                            <!--销售动态 header -->
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>销售动态</span>
                                    <div style="float: right">
                                        <el-checkbox label="只看跟进" name="type"></el-checkbox>
                                        <el-button type="primary" icon="el-icon-plus" size="mini" round
                                                   @click="handleAdd">写跟进
                                        </el-button>
                                    </div>
                                </div>

                                <el-col :span="24">
                                    <el-card class="box-card">
                                        <div slot="header" class="text item">
                                            <el-col :span="2">
                                                <img height="20" width="20" src="../../../assets/avatar.jpg"/>
                                            </el-col>
                                            <el-col :span="22">
                                                <el-row>
                                                    <div>徐超</div>
                                                    <div style="float: right">
                                                        <span>2018-05-71 18:40</span>
                                                    </div>
                                                </el-row>
                                                <el-row>
                                                    <div>
                                                        跟进状态由 "意向" 变为 "成交"
                                                    </div>
                                                </el-row>
                                                <el-row>
                                                    <div>
                                                        来自客户：上海自来水科技有限公司
                                                    </div>
                                                </el-row>
                                            </el-col>
                                        </div>
                                    </el-card>
                                    <el-card class="box-card">
                                        <div slot="header" class="text item">
                                            <el-col :span="2">
                                                <img height="20" width="20" src="../../../assets/avatar.jpg"/>
                                            </el-col>
                                            <el-col :span="22">
                                                <el-row>
                                                    <div>徐超<i class="el-icon-phone">电话</i></div>
                                                    <div style="float: right">
                                                        <span>2018-05-71 18:40</span>
                                                    </div>
                                                </el-row>
                                                <el-row>
                                                    <div>
                                                        <p>
                                                            客户:“我这次订的货数量可是不少啊，在价格上能不能降点呢?”<br/>
                                                            销售员:“真对不起，我已经是按照底价给您了，我不可能赔钱卖给您啊，不能再降了。”<br/><br/>
                                                            　　(1)客户:“我订的数量这么多，你在价格上也不能降点吗?”<br/>
                                                            　　(2)客户:“看在我购买这么多的份上，还是再给我优惠些吧。”<br/>
                                                            　　(3)客户:“我订了这么多的货，怎么说也算是你们的大客户了，无论如何都得再给我降降价啊!”<br/><br/>

                                                            　　针对上面客户提出的几个问题，如果稍不注意而采取了下面的几种应答的话，就会产生很坏的影响。<br/>
                                                            　　(1)“就这样子了，不能再降价了，再降价，我们做的就是赔本的生意了。”<br/>
                                                            　　(2)“那……好吧，我给你打个折扣吧。”<br/>
                                                            　　(3)“您真会开玩笑，您这还算大客户呀?我们店的大客户一次要订上百件产品呢!”<br/><br/>
                                                            　　对于那些以“大客户”自居的客户，导购员心里明白他们通常称不上“大客户”，其实客户也明白这一点，只不过是想找一个降价的最好借口，<br/>
                                                            而且很多时候，客户也不是很在乎你给他降了多少，只是在寻找一种心理平衡。认清了这一点，导购员就要采取有效的措施来应对客户的降价要求。
                                                        </p>
                                                    </div>
                                                </el-row>
                                                <el-row>
                                                    <div>
                                                        <br/> 来自客户：上海自来水科技有限公司
                                                    </div>
                                                </el-row>
                                            </el-col>
                                        </div>
                                    </el-card>


                                </el-col>

                            </el-card>
                        </el-col>
                    </el-row>

                </el-tab-pane>
                <el-tab-pane label="客户资料">客户资料</el-tab-pane>
                <el-tab-pane label="下级客户">下级客户</el-tab-pane>
                <el-tab-pane label="联系人">联系人</el-tab-pane>
                <el-tab-pane label="商机">商机</el-tab-pane>
                <el-tab-pane label="合同">合同</el-tab-pane>
                <el-tab-pane label="费用">费用</el-tab-pane>
                <el-tab-pane label="任务">任务</el-tab-pane>
                <el-tab-pane label="附件">附件</el-tab-pane>
                <el-tab-pane label="通话记录">通话记录</el-tab-pane>
                <el-tab-pane label="操作日志">操作日志</el-tab-pane>
            </el-tabs>
        </el-row>


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
            <el-table-column prop="address" label="地址" width="180">
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
        <el-row>
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
        </el-row>

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

        <!--新增跟进记录界面-->
        <el-dialog title="新增" :visible.sync="addFllowVisible" :close-on-click-modal="false" width="80%">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">

                <el-col :span="12">
                    <el-form-item label="类别" required="true">
                        <el-select v-model="addForm.type" placeholder="请选择类别">
                            <el-option label="电话" value="phone"></el-option>
                            <el-option label="钉钉" value="dingding"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="当前时间" prop="time">
                        <el-date-picker
                            v-model="addForm.time"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="content">
                        <div class="container">
                            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                        </div>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                    <el-form-item label="客户"  required="true">
                        <el-select v-model="addForm.type" placeholder="请选择类别">
                            <el-option label="电话" value="phone"></el-option>
                            <el-option label="钉钉" value="dingding"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="跟进状态"  required="true">
                        <el-date-picker
                            v-model="addForm.time"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人"  required="true">
                        <el-input size="mini" v-model="addForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="下次跟进"  required="true">
                        <el-date-picker
                            v-model="addForm.nextContact"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00">

                        </el-date-picker>
                    </el-form-item>
                </el-col>

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
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {quillEditor} from 'vue-quill-editor';
    import {getCustomersByPage, delCustomer, batchRemoveUser, addUser, getIpHost} from '../../../api/api';

    export default {
        name: 'editor',
        components: {
            quillEditor
        },
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
                    if (value.length > 2 && value.length < 12) {
                        callback();
                    } else {
                        callback(new Error('请输入密码3-12位！'));
                    }
                }
            };

            return {
                /* editor */
                content: '',

                editorOption: {
                    placeholder: 'Hello World'
                }, components: {
                    quillEditor
                },

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
                        {validator: checkName, required: true, trigger: 'blur'},

                    ],
                    telephone: [
                        {validator: checkPhone, required: true, trigger: 'blur'}
                    ],
                    email: [
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

                addFllowVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {validator: checkName, required: true, trigger: 'blur'},
                    ],
                    password: [
                        {validator: checkPass, required: true, trigger: 'blur'}
                    ],
                    telephone: [
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    email: [
                        {validator: checkEMail, trigger: 'blur'}
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
            // editor
            onEditorChange({editor, html, text}) {
                this.content = html;
            },
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
                getIpHost(null).then((res) => {
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
                    let customerId = {
                        "customerId": row.customerId
                    };
                    delCustomer(customerId).then((res) => {
                        this.listLoading = false;
                        if (res.status == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        } else {
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
                this.addFllowVisible = true;
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
            addFollow: function () {


            },
            // 新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            para.birthday = (!para.birthday || para.birthday == '') ? '' : util.formatDate.format(new Date(para.birthday), 'yyyy-MM-dd');

                            addUser(para).then((res) => {
                                this.addLoading = false;
                                if (res.status == 0) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    this.addFllowVisible = false;
                                } else {
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
    .text {
        font-size: 12px;
    }

    .item {
        margin-bottom: 12px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>
