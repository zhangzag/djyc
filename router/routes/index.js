const router = require('koa-router')()


//首页
router.get(['/', '/index.html'], async (ctx, next) => {
    // ctx.body = '这是首要'
    
  await ctx.render('index.html', {
    // keywords: '',//页面关键字
    // description: '',//页面描述
    // title: '',//页面标题
  })
})

module.exports = router