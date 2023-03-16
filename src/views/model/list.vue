<template>
  <div>
    <el-row style="margin-top: 40px;">
      <el-col :span="10" :push="1">
        <el-upload class="upload-demo" drag :action="path" accept=".txt" :on-success="handleSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->

        </el-upload>
        <!-- <el-button style="margin-left: 120px;" size="mid" type="success" @click="submitUpload">上传到服务器</el-button> -->

      </el-col>

      <el-col :span="10">
        <el-card class="box-card">
          <div>
            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" :key="Math.random()">
              <el-table-column prop="topK" label="Top-K" width="180">
              </el-table-column>
              <el-table-column prop="category" label="类别" width="180">
              </el-table-column>
              <el-table-column prop="prob" label="概率">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="20">
        <video id="myVideo" :src="url" @timeupdate="timeUpdate" @error="videoErrorCallback" 
          enable-danmu danmu-btn controls></video>
      </el-col>
    </el-row> -->


  </div>
</template>


<script>

import { getToken } from '@/utils/auth' // get token from cookie
const token = getToken()
export default {
  data() {
    return {
      // headersObj: { "content-type": "multipart/form-data" },
      // param:{
      //   token:token
      // },
      path: "/admin/videos/model?token=" + token,
      dialogOfUpload: true,
      fileList: [],
      url: "",
      tableData: [
      ],

    }
  },

  created() {
  },

  methods: {

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'warning-row';
      } else if (rowIndex === 1) {
        return 'success-row';
      }
      return '';
    },

    handleSuccess(response, file, fileList) { //文件数量改变
      console.log(response)
      this.tableData = response.list
      this.url = response.url
      console.log("成功")
      console.log(this.tableData)
      console.log(this.url)

    },

    // handleChange(file, fileList) { //文件数量改变

    //   console.log("噶便")
    // },

  },
}
</script>




<style>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>