<template>
  <el-table
    :data="tableData.filter(data => !search || data.phone.includes(search) || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 94%">
    <el-table-column label="Id">
      <template slot-scope="scope " style="margin-left: 20;">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="Name">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>简介: {{ scope.row.intro }}</p>
          <p>关注数: {{ scope.row.followingCount }}</p>
          <p>粉丝数: {{ scope.row.followersCount }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="Avatar" prop="avatar">
      <template slot-scope="scope">
        <el-image style="width: 40px; height: 40px" :src="scope.row.avatar" fit="fit"></el-image>
      </template>
    </el-table-column>
    <el-table-column label="Phone" prop="phone">
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入姓名或手机号搜索" />
      </template>
      <template slot-scope="scope">
        <el-switch style="display: block" v-model="value" active-color="#13ce66" inactive-color="#ff4949"
          active-text="正常" inactive-text="停用">
        </el-switch>
        <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" style="margin-left: 10px;">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>



  
<script>
import { getList, getOne } from '@/api/user.js'
import { getToken } from '@/utils/auth' // get token from cookie
const token = getToken()
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      search: '',
      value: true,

    }
  },
  //页面加载调用
  created() {
    this.getData(token)
  },

  methods: {

    getData(token) {
      getList(token).then(res => {
        console.log(res)

        this.tableData = res.items
        this.count = res.total_count
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }

  },
}
</script>

