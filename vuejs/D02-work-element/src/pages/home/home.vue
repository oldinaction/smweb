<template>
<div id="page-container">
    <el-row>
        <el-col :md="12">
        <el-button
          size="small"
          @click="dialogFormVisible = true">新建</el-button>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :md="14">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="date" label="日期" width="120">
                </el-table-column>
                <el-table-column prop="name" label="童鞋" width="100">
                </el-table-column>
                <el-table-column prop="address" label="任务描述">
                </el-table-column>
                <el-table-column label="操作" width="140">
                    <template scope="scope">
                          <el-button
                            size="small"
                            @click="dialogFormVisible = true">编辑</el-button>
                          <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">完成</el-button>
                    </template>
                  </el-table-column>
              </el-table>
            </el-col>
            <el-col :md="10">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="date" label="日期" width="120">
                    </el-table-column>
                    <el-table-column prop="name" label="童鞋" width="100">
                    </el-table-column>
                    <el-table-column prop="address" label="任务描述">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!--弹框-->
        <div>
            <el-dialog title="任务信息" v-model="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="日期" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="form.date"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="童鞋" :label-width="formLabelWidth">
                  <el-select v-model="form.name" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="任务描述" :label-width="formLabelWidth">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="desc">
                    </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 表格
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            // 弹框
            dialogFormVisible: false,
            form: {
              date: '',
              name: '',
              desc: '',
            },
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
            formLabelWidth: '120px',
        }
    }
}
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
</style>
