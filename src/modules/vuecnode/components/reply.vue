<template>
  <section class="reply">
    <textarea id="content" rows="8" class="text"
      :class="{'err': hasErr}"
      v-model="content"
      placeholder="回复支持Markdown语法,请注意标记代码">
    </textarea>
    <a @click="addReply" class="button">确定</a>
  </section>
</template>

<script>
  let markdown = require('markdown').markdown

  export default {
    replace: true,
    props: ['topic', 'replyId', 'topicId', 'replyTo', 'show'],
    data () {
      return {
        hasErr: false,
        content: '',
        userId: localStorage.userId || '',
        authorTxt: '<br/><br/><a class="form" href="https://github.com/shinygang/Vue-cnodejs">I‘m webapp-cnodejs-vue</a>'
      }
    },

    ready () {
      if (this.replyTo) {
        this.content = '@' + this.replyTo + ' '
      }
    },

    methods: {
      addReply () {
        if (!this.content) {
          this.hasErr = true
        } else {
          let time = new Date()
          let linkUsers = Utils.linkUsers(this.content)
          let htmlText = markdown.toHTML(linkUsers) + this.authorTxt
          let replyContent = '<div class="markdown-text">' + htmlText + '</div>'
          let postData = {
            accesstoken: localStorage.token,
            content: this.content + this.authorTxt
          }

          if (this.replyId) {
            postData.reply_id = this.replyId
          }

          this.$http.post('api/v1/topic/' + this.topicId + '/replies', postData)
            .then(res => {
              if (res.success) {
                this.topic.replies.push({
                  id: res.reply_id,
                  author: {
                    loginname: this.userId,
                    avatar_url: localStorage.avatar_url
                  },
                  content: replyContent,
                  ups: [],
                  create_at: time
                })
              }

              this.content = ''
              if (this.show) {
                this.show = ''
              }
            }, res => {
              let error = JSON.parse(res.responseText)
              this.alert.txt = error.error_msg
              this.alert.show = true
              this.alert.hideFn()
              return false
            })
        }
      }
    }
  }
</script>
