export default(url,data={},method='GET')=>{
  return new Promise((resolve,reject)=>{
      wx.request({
          url: url,
          data,
          method:method,
          success:res=>{
              resolve(res)
          },
        })
  })
}