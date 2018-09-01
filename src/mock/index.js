import Mock from 'mockjs'

const req = context => context.keys().map(context)
req(require.context('./api',true,/\.js$/))

Mock.setup({
  timeout: '300-600'
})
