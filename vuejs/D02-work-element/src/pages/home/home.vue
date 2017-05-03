<template>
    <div id="page-container">
        <el-row>
            <el-col :md="12">
                <el-button
                  size="small"
                  @click="userDialogFormVisible = true">用户管理</el-button>
                <el-button
                  size="small"
                  @click="showEditWorkDialog()">新建任务</el-button>
                <router-link to="/home/children">显示子组件</router-link>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :md="14">
                <el-table :data="workings" stripe style="width: 100%">
                    <el-table-column prop="startDate" label="日期" width="120">
                    </el-table-column>
                    <el-table-column prop="name" label="童鞋" width="140">
                    </el-table-column>
                    <el-table-column prop="desc" label="任务描述">
                    </el-table-column>
                    <el-table-column label="操作" width="140">
                    <template scope="scope">
                          <el-button
                            size="small"
                            @click="showEditWorkDialog(scope.row)">编辑</el-button>
                          <el-button
                            size="small"
                            type="danger"
                            @click="editWork(true, scope.row.key)">完成</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :md="10">
                <el-table :data="workHistory" stripe style="width: 100%">
                    <el-table-column prop="endDate" label="完成日期" width="120">
                    </el-table-column>
                    <el-table-column prop="name" label="童鞋" width="140">
                    </el-table-column>
                    <el-table-column prop="desc" label="任务描述">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!--思考：弹框页面和主页面分离-->
        <!--任务编辑弹框-->
        <div>
            <el-dialog title="任务信息" v-model="dialogFormVisible">
              <el-form :model="form">
                <input type="hidden" name="workId" :value="workId" />
                <el-form-item label="日期" :label-width="formLabelWidth">
                    <el-date-picker type="date" placeholder="选择日期"
                    v-model="form.startDate"
                    :picker-options="pickerOptions"
                    @change="formatDate(form.startDate)">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="童鞋" :label-width="formLabelWidth">
                  <el-select v-model="form.name" placeholder="请选择任务人">
                    <el-option v-for="user in users" :label="user.name" :value="user.name" :key="user.name"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="任务描述" :label-width="formLabelWidth">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="form.desc">
                    </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editWork(false, form.key)">确 定</el-button>
              </div>
            </el-dialog>
        </div>

        <!--用户编辑弹框-->
        <div>
            <el-dialog title="用户信息" v-model="userDialogFormVisible">
              <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="userDialogFormVisible = false">取 消</el-button>
                <el-button type="warning" @click="editUser(false)">移 除</el-button>
                <el-button type="primary" @click="editUser(true)">创 建</el-button>
              </div>
            </el-dialog>
        </div>

        <!--子组件路由出口-->
        <router-view></router-view>
    </div>
</template>

<script>
import Firebase from 'firebase'
import Moment from 'moment'
import dbConfig from '../../config/db.json'

let dbRoot = dbConfig.root
let db = Firebase.database()
let dbWorks = db.ref(dbRoot + '/works')

export default {
    data() {
        return {
            // 表格
            workings: [],
            workHistory: [],
            // 任务弹框
            dialogFormVisible: false,
            workId: '', // 任务id (firebase的key)
            form: {
                startDate: '',
                name: '',
                desc: '',
            },
            users: [], // 用户姓名
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                      picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', date);
                    }
                }]
            },
            // 用户弹框
            userDialogFormVisible: false,
            user: {
                name: '',
            },
            formLabelWidth: '120px',
        }
    },
    watch: {
        // 弹框后查询用户信息，并监听用户变化
        dialogFormVisible: function(val) {
            let vm = this
            if(val && vm.users.length == 0) {
                let dbUsers = db.ref(dbRoot + '/users')
                dbUsers.orderByChild("valid").equalTo(true).on("child_added", function(data) {
                    vm.users.push(data.val())
                });
            }
        }
    },
    created: function() {
        this.findWorks()
    },
    methods: {
        // 监听任务变化:新增/完成（会默认查询一次）
        findWorks: function() {
            let vm = this
            // 进行中任务
            dbWorks.orderByChild('startDate').on("child_added", function(data) {
                let work = data.val()
                if(work.status != 'working') return true
                work.key = data.key
                vm.workings.unshift(work) // 按照创建时间排序(firebase默认升序)，利用js将数据往前添加达到降序
            });
            // 完成的任务
            dbWorks.orderByChild('endDate').on("child_added", function(data) {
                let work = data.val()
                if(work.status != 'complete') return true
                work.key = data.key
                vm.workHistory.unshift(work)
            });
            // 任务被完成
            dbWorks.on("child_changed", function(data) {
                let work = data.val()
                if(work.status != 'complete') return true

                let workings = []
                for(let item in vm.workings) {
                    if(vm.workings[item].key == data.key) continue
                    workings.unshift(vm.workings[item])
                }
                vm.workings = workings
                vm.workHistory.unshift(work)
            });
        },
        // 编辑任务
        editWork: function(complete, key) {
            let vm = this
            let work = {}
            vm.workId = key
            if(vm.workId == null && vm.workId != '') {
                // 新增任务
                work = vm.form
                let dbWorks = db.ref(dbRoot + '/works')
                work.startDate = Moment(vm.form.startDate).format("YYYY-MM-DD")
                work.status = 'working'
                dbWorks.push(work, function(error) {
                    if(!error) {
                        vm.$message.success('操作成功')
                        vm.dialogFormVisible = false
                    } else {
                        vm.$message.error(error)
                    }
                })
            } else {
                if(!complete) {
                    // 修改
                    work = vm.form
                    work.startDate = Moment(vm.form.startDate).format("YYYY-MM-DD")
                    vm.updateWork(work)
                } else {
                    // 完成
                    work = {
                        status: 'complete',
                        endDate:  Moment().format("YYYY-MM-DD")
                    }

                    this.$confirm('确定此任务已经完成了吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                        vm.updateWork(work)
                    }).catch(() => {});
                }
            }
        },
        // 执行修改或完成任务
        updateWork: function(work) {
            let vm = this
            db.ref(dbRoot + '/works/' + vm.workId).update(work).then(function() {
                vm.$message.success('操作成功')
                vm.dialogFormVisible = false
            }, function() {
                vm.$message.error('操作失败')
            })
        },
        // 编辑任务弹框
        showEditWorkDialog: function(row) {
            let vm = this
            // 思考：新建一条数据后，vm.$data中关于此form的字段如何还原成初始值
            vm.form = row != null ? row : {
                startDate: Moment().format("YYYY-MM-DD"),
                name: '',
                desc: '',
            }
            vm.dialogFormVisible = true
        },
        // 编辑用户
        editUser: function(isAdd) {
            let vm = this
            if (isAdd) {
                // 创建用户
                db.ref(dbRoot + '/users').push({
                    name: vm.user.name,
                    valid: true
                }, function(error) {
                    if(!error) {
                        vm.$message.success('操作成功')
                        vm.userDialogFormVisible = false
                        vm.user.name = ''
                    } else {
                        vm.$message.error(error)
                    }
                })
            } else {
                // 移除用户
                this.$confirm('确定要移除此用户吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    db.ref(dbRoot + '/users').orderByChild("name").equalTo(vm.user.name).once('value').then(function(snapshot) {
                        let updates = {}
                        snapshot.forEach(function(data) {
                            if(data.key == null) return true
                            updates[dbRoot + '/users/' + data.key] = {
                                name: vm.user.name,
                                valid: false
                            }
                        })

                        db.ref().update(updates).then(function() {
                            vm.$message.success('操作成功')
                            vm.userDialogFormVisible = false
                            vm.user.name = ''
                        }, function() {
                            vm.$message.error('操作失败')
                        })
                    });
                }).catch(() => {});
            }
        },
        formatDate: function(val) {
            this.form.startDate = Moment(val).format("YYYY-MM-DD")
        }
    }
}
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
</style>
