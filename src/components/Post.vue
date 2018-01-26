<template>
<div>
 <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="80%"
    height="80%"
    :fullscreen="true"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <el-carousel trigger="click" height="700px">
        <el-carousel-item  v-for="image in album" :key="image.key">
            <img :src="'http://i.imgur.com/'+image.id+'.png'"  width="80%" class="image" >
        </el-carousel-item>
    </el-carousel>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      {{$route.params.albumId}}
    </span>
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";
import config from "../config";

export default {
  name: "Post",
  created() {
    this.fetchImages();
  },
  data() {
    return {
      dialogVisible: true,
      album: []
    };
  },
  methods: {
    fetchImages: function() {
      axios
        .get(
          config.IMGUR_API + "/album/" + this.$route.params.albumId + "/images",
          {
            headers: config.IMGUR_HEADER
          }
        )
        .then(response => {
          console.log(response.data.data);
          this.album = response.data.data;
        });
    },
    handleClose(done) {
      done();
      this.$router.push({ path: "/" });
    }
  }
};
</script>
