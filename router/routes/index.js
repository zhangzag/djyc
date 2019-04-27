const router = require('koa-router')()


//首页
router.get(['/', '/index.html', '/djxt'], async (ctx, next) => {
    // ctx.body = '这是首要'
    
  // await ctx.render('index.html', {
  //   // keywords: '',//页面关键字
  //   // description: '',//页面描述
  //   // title: '',//页面标题
  // })
  
  await ctx.render('index', {
    // user: 'John'
  });
})

//错误页面
router.get('/error_page', async (ctx)=>{
  await ctx.render('error', {});
})

//测试模拟点击遥控器页面
router.get('/test', async (ctx)=>{
  await ctx.render('test', {});
})

module.exports = router