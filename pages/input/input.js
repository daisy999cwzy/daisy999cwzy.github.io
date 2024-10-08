Page({
  data: {
    pageTitle: '',
    date: '2023-01-01',
    time: '12:00',
    gender: 'male',
    type: ''
  },
  onLoad(options) {
    const type = options.type
    this.setData({
      type: type,
      pageTitle: type === 'bazi' ? '八字测算' : '紫微斗数测算'
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  radioChange(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  submitForm() {
    const { date, time, gender, type } = this.data
    // 这里我们将在后续实现计算逻辑
    console.log('提交的数据:', { date, time, gender, type })
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    })
  }
})