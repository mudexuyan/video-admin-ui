<template>
  
    


  <div>
    


    <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button> -->
    <el-button @click="clearFilter">清除所有过滤器</el-button>

    <el-table ref="filterTable" :data="tableData.filter(data => !search || data.title.includes(search) || data.uploader.name.includes(search)
      || data.category.includes(search))" style="width: 94%" :key="Math.random()"> 
      <el-table-column prop="updated_at" label="日期" sortable width="220" column-key="datetime" :filters=filterDate
        :filter-method="filterHandler">
      </el-table-column>

      <el-table-column label="标题" width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>简介: {{ scope.row.intro }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="封面" width="140">
        <template slot-scope="scope">
          <el-image style="width: 45px; height: 40px" :src="scope.row.cover" fit="fit"></el-image>
        </template>
      </el-table-column>

      <el-table-column label="链接" width="140">
        <template slot-scope="scope">
          <el-link :href="scope.row.link">在线播放</el-link>

        </template>
      </el-table-column>

      <el-table-column label="用户" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>简介: {{ scope.row.uploader.intro }}</p>
            <p>关注数: {{ scope.row.uploader.followingCount }}</p>
            <p>粉丝数: {{ scope.row.uploader.followersCount }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.uploader.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>


      <el-table-column label="标签" width="180" :filters=filterCategory :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.category === '正常' ? 'success' : 'danger'" disable-transitions>{{
            scope.row.category
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="输入标题、用户、分类搜索" />
        </template>
        <template slot-scope="scope">
          <el-popover placement="left" width="370" :ref="`popover-${scope.row.id}`">
            <div>
              <el-form ref="form" label-width="80px">
                <el-form-item label="分类" style="height: 26px; margin-top: 10px;">
                  <el-cascader :options="categoryData" v-model="editForm.category_id"
                    :props="{ checkStrictly: true, label: 'name', value: 'id', emitPath: false }" clearable filterable
                    placeholder="修正当前类别"></el-cascader>
                </el-form-item>

                <el-form-item class="button">
                  <el-button @click="onEditCancel(scope.$index, scope.row)">取消</el-button>
                  <el-button type="primary" @click="onEdit(scope.$index, scope.row)">保存分类信息</el-button>
                </el-form-item>
              </el-form>
            </div>

            <el-button slot="reference" type="primary" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
          </el-popover>


        </template>
      </el-table-column>

    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2"
      :page-sizes="[5, 10, 20, 50]" :page-size="100" layout="sizes, prev, pager, next" :total="count">
    </el-pagination>
  </div>
</template>

<script>
import { getAllVideos, getOneVideo, editVideo } from '@/api/video.js'
import { getList } from '@/api/category.js'
import { getToken } from '@/utils/auth' // get token from cookie
const token = getToken()
export default {
  data() {
    return {
      tableData: [],
      categoryData: [],
      filterCategory: [],
      filterDate: [],
      count: 0,
      search: '',
      value: true,
      editForm: {
        category_id: '',
      },
    }
  },
  //页面加载调用
  created() {
    this.getData(token)
    this.getCategories(token)
  },

  methods: {

    getData(token) {
      getAllVideos(token).then(res => {
        this.tableData = res.items
        this.count = res.total_count
        for (var i in this.tableData) {
          // this.tableData[i].updated_at=new Date(paraseInt(this.tableData[i].updated_at)).toLocaleString().split(' ')[0].replace('/','-').replace('/','-')
          this.filterDate.push({
            text: this.tableData[i].updated_at,
            value: this.tableData[i].updated_at
          })
        }
      })
    },

    getCategories(token) {
      getList(token).then(res => {
        this.categoryData = res
        for (var i in this.categoryData) {
          this.filterCategory.push({
            text: this.categoryData[i].name,
            value: this.categoryData[i].name
          })
        }
      })
    },

    onEdit(index, row) {
      editVideo(row.id, this.editForm, token).then((res) => {
        console.log(row)
        console.log(this.editForm)
        if (res.id) {
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
      this.$refs["popover-" + row.id].showPopper = false
      this.editForm = {}

    },

    onEditCancel(index, row) {
      this.$refs["popover-" + row.id].showPopper = false
    },

    handleEdit(index, row) {
      // this.editForm = row
    },

    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },

    //表格条件筛选
    filterTag(value, row) {
      return row.category === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }

  },
}
</script>