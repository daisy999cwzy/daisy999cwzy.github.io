Page({
  navigateToBazi() {
    wx.navigateTo({
      url: '/pages/input/input?type=bazi'
    })
  },
  navigateToZiwei() {
    wx.navigateTo({
      url: '/pages/input/input?type=ziwei'
    })
  }
})