<template>

  <div>
    <Upload style="display: none" action="/api/saveImg" :on-progress='handleProgress' :on-success='handleSuccess' :on-error='handleError' >
        <Button class="saveImg" icon="ios-cloud-upload-outline"></Button>
    </Upload>
    <quill-editor
      :content="value"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>

  </div>
</template>

<script>
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"] // 链接、图片、视频
]

import { quillEditor } from "vue-quill-editor"
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { mapActions } from 'vuex'
export default {
  name: 'Editor',
  components: {
    quillEditor
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: this.content,
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "您想说点什么？",
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",

            handlers: {
              image: function(value) {
                console.log('123')
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.saveImg').click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'downLoadImg'
    ]),
    onEditorReady(editor) { // 准备编辑器

    },
    onEditorBlur(){}, // 失去焦点事件
    onEditorFocus(){}, // 获得焦点事件
    onEditorChange({ editor, html, text }){
      this.value = html
      this.$emit('input', this.value)
    }, // 内容改变事件
    handleProgress () {

    },
    handleSuccess (res) {
      let quill = this.$refs.myQuillEditor.quill;
      if (res.code === 200) {
        let length = quill.getSelection().index;
      // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.path);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
    },
    handleError () {
          this.$message.error("图片插入失败");
    },
    handlerImage () {
      var Imageinput = document.createElement('input');
      Imageinput.setAttribute('type', 'file');
      Imageinput.setAttribute('name', 'upload_file')
      Imageinput.setAttribute('accept','image/png, image/gif, image/jpeg');
      Imageinput.classList.add('ql-image');
      console.log(Imageinput)
    }
  },
  mounted() {

  }
}
</script>
