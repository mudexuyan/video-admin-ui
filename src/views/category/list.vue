<template>
  <div>
    <el-card class="addCard" style="width: 95%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item class="type" label="分类名称" :rules="[
          { required: true, message: '名称不能为空' }
        ]">
          <el-input v-model="form.name" style="width: 204px" placeholder="请输入分类名称" clearable></el-input>
        </el-form-item>

        <el-form-item class="parent" label="父级分类">
          <el-cascader :options="tableData" v-model="form.parent_id"
            :props="{ checkStrictly: true, label: 'name', value: 'id', emitPath: false }" clearable filterable
            placeholder="不选时为根分类"></el-cascader>
        </el-form-item>

        <el-form-item class="button">
          <el-button type="primary" @click="onSave">新建分类信息</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
      
    </el-card>

    <el-table class="list" :data="tableData" style="width: 100%" :max-height="500" row-key="id" default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column label="分类">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-popover placement="left" width="370" :ref="`popover-${scope.row.id}`">
          <div>
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item class="type" label="分类名称" :rules="[
                  { required: true, message: '名称不能为空' }
                ]">
                  <el-input v-model="editForm.name" style="width: 204px" placeholder="请输入分类名称" clearable></el-input>
                </el-form-item>

                <el-form-item class="parent" label="父级分类">
                  <el-cascader :options="tableData" v-model="editForm.parent_id"
                    :props="{ checkStrictly: true, label: 'name', value: 'id', emitPath: false }" clearable filterable
                    placeholder="不选时为根分类"></el-cascader>
                </el-form-item>

                <el-form-item class="button">
                  <el-button @click="onEditCancel(scope.$index, scope.row)">取消</el-button>
                  <el-button type="primary" @click="onEdit(scope.$index, scope.row)">保存分类信息</el-button>
                </el-form-item>
              </el-form>
            </div>

          <el-button slot="reference" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </el-popover>

      

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
            style="margin-left: 4px;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

  
<script>
import { getList, add, getOne, edit, del } from '@/api/category.js'
import { getToken } from '@/utils/auth' // get token from cookie
const token = getToken()
export default {
  data() {
    return {
      tableData: [],
      form: {
        name: '',
        parent_id: '',
      },
      editForm: {
        name: '',
        parent_id: '',
      },

    }
  },
  //页面加载调用
  created() {
    this.getData(token)
  },

  methods: {

    getData(token) {
      getList(token).then(res => {
        this.tableData = res
      })
    },

    handleEdit(index, row) {
      this.editForm = row
    },

    handleDelete(index, row) {
      if (row.children !== undefined && row.children.length > 0) {
        this.$alert('该分类存在子分类，不能删除', {
          confirmButtonText: '确定',
        });
      } else {

        del(row.id, token).then((res) => {
          //刷新表格
          this.getData(token)
        })
      }
    },

    onSave() {
      add(this.form, token).then((res) => {
        console.log(res.name)
        if (res.name) {
          this.$message({
            message: '信息保存成功',
            type: 'success'
          });
          //清空表单
          this.form = {}
          //刷新表格
          this.getData(token)

        } else {
          this.$message.error('信息保存失败');
        }
      })
    },

    onEdit(index, row) {
      edit(row.id, this.editForm, token).then((res) => {
        if (res.name) {
          this.$message({
            message: '信息保存成功',
            type: 'success'
          });

          //刷新表格
          this.getData(token)

        } else {
          this.$message.error('信息保存失败');
        }
      })
      this.$refs["popover-"+row.id].showPopper = false

    },
    onCancel() {
      this.form = {}
    },
    onEditCancel(index,row) {
      this.editForm = {},

      this.$refs["popover-"+row.id].showPopper = false
    },

  },
}
</script>

<style>
.addCard {
  width: 300px;
}

.list {
  margin-top: 16px;

}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>