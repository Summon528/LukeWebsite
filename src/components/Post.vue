<template>
<div>
 <el-dialog
    :title="albumInformation.title"
    :visible.sync="dialogVisible"
    custom-class="post"
    top="0px"
    :before-close="handleClose">
    <el-carousel trigger="click" height="700px">
        <el-carousel-item  v-for="image in album" :key="image.key">
            <img :src="'http://i.imgur.com/'+image.id+'.png'"  width="80%" class="image" >
        </el-carousel-item>
    </el-carousel>
    </el-dialog>
</div>
</template>

<style>
.post {
  width: 80%;
  height: 100%;
  margin-top: 0;
  margin-bottom: 0;
  height: 100%;
  overflow: auto;
  overflow-x: auto;
  overflow-y: auto;
}
.el-dialog__title {
  font-size: xx-large;
}
</style>


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
      albumInformation: [],
      album: []
    };
  },
  methods: {
    fetchImages: function() {
      axios
        .get(config.IMGUR_API + "/album/" + this.$route.params.albumId, {
          headers: config.IMGUR_HEADER
        })
        .then(response => {
          console.log(response.data.data);
          this.albumInformation = response.data.data;
        });
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
