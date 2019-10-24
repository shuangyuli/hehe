
import {Popup, Group, XTextarea, PopupPicker} from 'vux'

export default {
  name: 'customerService',
  components: {
    Popup,
    Group,
    XTextarea,
    PopupPicker
  },
  data () {
    return {
      userCont: '', // 输入域初始值
      counter: [], // 聊天区域数组
      tripFlag: false, // 出差申请弹窗是否展示
      ops: { // 页面初始化几个横向滑动滚动条，默认隐藏样式
        vuescroll: {},
        scrollPanel: {
          scrollingX: true,
          scrollingY: false
        },
        rall: {},
        bar: {
          disable: true
        }
      },
      opsAll: { // 页面聊天内容区域滚动条，默认展示
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'number',
          detectResize: true
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true
        },
        rall: {},
        bar: {
          background: '#d1d1d1',
          keepShow: true,
          size: '1px',
          disable: false
        }
      },
      wantToArr: [ // 底部我想右侧 选项卡数组列表
        {
          name: '我的申请',
          isTodo: false
        },
        {
          name: '我的订单',
          isTodo: false
        },
        {
          name: '差旅标准',
          isTodo: false
        }
      ],
      taskList: [ // 顶部横向 选项卡数组列表
        {
          name: '我要出差',
          imgUrl: require('../../../assets/image/chailvTopIcon1@2x.png'),
          istaskList: false
        },
        {
          name: '我要订票',
          imgUrl: require('../../../assets/image/chailvTopIcon2@2x.png'),
          istaskList: false
        },
        {
          name: '我要报销',
          imgUrl: require('../../../assets/image/chailvTopIcon3@2x.png'),
          istaskList: false
        }

      ],
      // startTime: "", //出差申请模板中填写内容，开始时间
      // StartDate: '请选择', //选择的开始时间
      // EndDate: '请选择', //选择的结束时间
      // startTimeModel: "", //选择的开始时间
      // endTimeModel: "", //选择的结束时间
      // startArea: "", //始发地
      // endArea: "", //目的地
      // customwhy: "", //出差原因
      msgType: 0, // 消息类型：0=用户输入，1=客服提示，2=请假申请卡片 3=订票列表信息
      menupop: false, // 用户点击菜单唤起菜单
      ismenuDialog: false, // 底部菜单弹窗是否显示
      booking: false, // 我要订票弹窗
      menuCont: [ // 仿微信弹出菜单模块
        {
          imgSrc: require('./../../../assets/image/myApplyImg@2x.png'),

          menuName: '我的申请'
        },
        {
          imgSrc: require('./../../../assets/image/myOrderImg@2x.png'),
          menuName: '我的订单'
        }
        // {
        // 	menuName: "代订管理"
        // },
        // {
        // 	menuName: "成本中心"
        // },
        // {
        // 	menuName: "管理报告"
        // },
        // {
        // 	menuName: "帮助中心"
        // },
        // {
        // 	menuName: "意见反馈"
        // },
      ],
      // findFlagArr: [{
      // 		id: 0,
      // 		name: '出差申请'
      // 	},
      // 	{
      // 		id: 1,
      // 		name: '查天气'
      // 	},
      // 	{
      // 		id: 2,
      // 		name: '差旅标准'
      // 	}
      // ],
      yesterday: '', // 默认出发日期时间
      startArea: '请选择', // 出差申请始发地
      endArea: '请选择', // 出差申请目的地
      startTimeModel: '请选择', // 选择的开始时间
      endTimeModel: '请选择', // 选择的结束时间
      customwhy: '', // 出差事由
      vehicleArr: [['飞机', '火车']], // 交通工具列表
      vehicleValue: [], // 交通工具默认值
      businessArr: [['异地差旅', '外事差旅', '培训差旅', '研发差旅', '封闭开发']], // 出差类别列表
      businessValue: [], // 出差类别默认值
      commodityArr: [['报销住宿费', '不报销住宿费']], // 住宿情况列表
      commodityValue: [], // 住宿情况默认值
      styleSatue: '',
      cityTripFlag: false, // 始发地、目的地弹窗是否展示
      cityArea: '', // 判断传给子组件是始发地还是目的地
      bookingCityArea: '', // 我要订单 判断传给子组件是始发地还是目的地

      draftFlag: false,

      bookingStartArea: '请选择', // 我要订单始发地
      bookingEndArea: '请选择', // 我要订单目的地
      bookingStartTimeModel: '请选择', // 我要订单开始时间
      bookingVehicleValue: [], // 我要订单交通工具
      bookingVehicleArr: [['飞机', '火车']], // 我要订单交通工具列表

      myapplyalertState: false, // 我的申请弹出框
      myorderalertState: false, // 我的订单弹出框
      flightList: false, // 机票列表弹出框

      flightlist: false,
      flightlistArr: [],
      transImgStyle: 'rotate(0deg)'
    }
  },
  watch: {
    counter () {
      this.$nextTick(() => {
        this.$refs.count.scrollTop = this.$refs.count.scrollHeight
      })
    }
  },
  methods: {
    // 点击我的申请某个列表，弹出对应卡片
    myapply (subList) {
      let subListArr = {
        orderType: '审批中',
        startArea: subList.applyuserDepartment,
        endArea: subList.applyuserTeam,
        StartDate: subList.applystartTime,
        EndDate: subList.applyendTime,
        vehicleValue: '',
        businessValue: '异地差旅费',
        commodityValue: '',
        customwhy: ''
      }
      this.msgType = 2
      this.styleSatue = 0 // 正常点击 不置灰
      this.counter.push({
        styleSatue: this.styleSatue,
        Msg: '出差申请',
        msgType: this.msgType,
        subList: subListArr
      })
    },

    // 我的申请
		 myapplyhandleHideClick () { // 我的申请弹出框隐藏
   this.myapplyalertState = false
 },
    // 我的订单
    myoerderhandleHideClick () {
      this.myorderalertState = false
    },

    // 选择始发地
    chooseStartCity () {
      this.cityArea = 'startArea'
      this.cityTripFlag = true
    },
    // 选择目的地
    chooseEndCity () {
      this.cityArea = 'endArea'
      this.cityTripFlag = true
    },
    bookingChooseStartCity () {
      this.cityArea = 'bookingStartArea'
      this.cityTripFlag = true
    },
    // 选择目的地
    bookingChooseEndCity () {
      this.cityArea = 'bookingEndArea'
      this.cityTripFlag = true
    },
    // 我要订单 从子组件获取始发地所选择的城市
    checkBookingStartCity (data) {
      this.bookingStartArea = data
    },
    // 我要订单 从子组件获取目的地所选择的城市
    checkBookingEndCity (data) {
      this.bookingEndArea = data
    },
    // 从子组件获取始发地所选择的城市
    checkStartCity (data) {
      this.startArea = data
    },
    // 从子组件获取目的地所选择的城市
    checkEndCity (data) {
      this.endArea = data
    },
    // 选择城市后隐藏子组件
    cityShowFlag (data) {
      this.cityTripFlag = data
    },

    wantTo (index) {
      let len = this.wantToArr.length
      for (var i = 0; i < len; i++) {
        this.wantToArr[i].isTodo = false
      }
      this.wantToArr[index].isTodo = true

      if (index == 0) {
        this.myapplyalertState = true
      }
      if (index == 1) {
        this.myorderalertState = true
      }
      if (index == 2) {
        // 差旅标准
        console.log('差旅标准')
        // this.chailvpop = true
      }
    },
    // chailvClose() {
    // 	this.chailvpop = false
    // },
    // shenqing() {
    // 	this.tripFlag = true
    // 	this.msgType = 0
    // 	this.counter.push({
    // 		Msg: "出差申请",
    // 		msgType: this.msgType,
    // 		subList: {}
    // 	})
    // },
    // chatianqi() {
    // 	this.msgType = 1
    // 	this.counter.push({
    // 		Msg: "海淀区今天阴，气温23到32度~",
    // 		msgType: this.msgType,
    // 		subList: {}
    // 	})
    // 	this.msgType = 3
    // 	this.counter.push({
    // 		Msg: "",
    // 		msgType: this.msgType,
    // 		subList: {},
    // 	})
    // 	this.$refs['vsAll'].scrollTo({
    // 		y: '1000%'
    // 	}, 500)
    // },
    showMenu () { // 弹出菜单
      this.ismenuDialog = !this.ismenuDialog // 底部仿微信弹出功能菜单
      if (this.ismenuDialog) {
        this.$nextTick(() => {
          this.$refs.count.scrollTop = this.$refs.count.scrollHeight + this.$refs.addDom.scrollHeight + this.$refs.ismenuDialog.scrollHeight
        })
        this.transImgStyle = 'rotate(45deg)'
      } else {
        this.transImgStyle = 'rotate(0deg)'
      }
    },

    // 出差申请单取值开始时间
    startTimeChange (val) {
      this.startTimeModel = val
    },

    // 我要订单取值开始时间
    bookingStartTimeChange (val) {
      this.bookingStartTimeModel = val
    },

    // 出差申请单取值结束时间
    endTimeChange (val) {
      this.endTimeModel = val
    },
    // 设置开始时间组建格式
    showStartDate () {
      let that = this
      that.$wbs.datetime.show({
        cancelText: '确认',
        confirmText: '取消',
        format: 'YYYY-MM-DD',
        value: this.startTime,
        slide: true,
        onConfirm (val) {
          console.log('plugin confirm:', val)
        }
      })
    },
    // 设置结束时间组建格式
    showEndDate (_this) {

    },
    // 设置出差事由
    textareaChange (value) {
      this.customwhy = value
    },

    // 设置交通工具
    vehicleChangeValue (val) {
      this.vehicleValue = val
    },
    // 我要订单设置出差类别
    bookingVehicleChangeValue (val) {
      this.bookingVehicleValue = val
    },

    // 出差申请单设置出差类别
    businessChangeValue (val) {
      this.businessValue = val
    },

    // 设置住宿情况
    commodityChangeValue (val) {
      this.commodityValue = val
    },

    // subEnter() { //点击出差申请末班“确定”按钮
    // 	this.$refs['vsAll'].scrollTo({
    // 		y: '1000%'
    // 	}, 500) //控制滚动条
    // 	this.tripFlag = false //关闭出差申请录取数据弹框
    // 	//==============赋值start==============
    // 	let startArea = this.startArea = "北京"
    // 	let endArea = this.endArea = "合肥"
    // 	let StartDate = this.StartDate = this.StartDate
    // 	let EndDate = this.EndDate = this.EndDate
    // 	let customwhy = this.customwhy = "培训"
    // 	let subList = {}
    // 	subList = {
    // 		startArea: startArea,
    // 		endArea: endArea,
    // 		StartDate: StartDate,
    // 		EndDate: EndDate,
    // 		customwhy: customwhy
    // 	}
    // 	//==============赋值end================
    // 	this.msgType = 1
    // 	this.counter.push({
    // 		Msg: "已为您生成「出差申请单」，请点击底部按钮继续惊醒操作~",
    // 		msgType: this.msgType,
    // 		subList: {}
    // 	})
    // 	this.msgType = 2
    // 	this.counter.push({
    // 		Msg: "出差申请",
    // 		msgType: this.msgType,
    // 		subList: subList,
    // 	})
    // 	console.log(JSON.stringify(subList))
    // },

    // 提交申请
    approval (subListArr) {
      let subList = {
        orderType: '申请中',
        startArea: subListArr.startArea,
        endArea: subListArr.endArea,
        StartDate: subListArr.StartDate,
        EndDate: subListArr.EndDate,
        customwhy: subListArr.customwhy
      }

      this.msgType = 0
      this.counter.push({
        Msg: '提交审批',
        msgType: this.msgType,
        subList: {}
      })

      this.msgType = 1
      this.counter.push({
        Msg: '您的 [出差申请单] 已提交团队经理XX审批，请知悉~',
        msgType: this.msgType,
        subList: {}
      })
    },

    // 删除单子
    del (index) {
      // 调取删除接口
      this.msgType = 0
      this.counter.push({
        Msg: '删除订单',
        msgType: this.msgType,
        subList: {}
      })

      this.msgType = 1
      this.counter.push({
        Msg: '您的 [出差申请单] ，已成功删除~',
        msgType: this.msgType,
        subList: {}
      })
    },

    // 点击出差申请单弹窗“确定”按钮
    subEnter () {
      this.draftFlag = true
      this.tripFlag = false

      let startTimeArr = this.startTimeModel.split('-')
      let startTime = startTimeArr[0] + '年' + startTimeArr[1] + '月' + startTimeArr[2] + '日'
      let endTimeArr = this.endTimeModel.split('-')
      let endTime = endTimeArr[0] + '年' + endTimeArr[1] + '月' + endTimeArr[2] + '日'

      let subList = {
        orderType: '拟稿',
        startArea: this.startArea,
        endArea: this.endArea,
        StartDate: startTime,
        EndDate: endTime,
        vehicleValue: this.vehicleValue,
        businessValue: this.businessValue,
        commodityValue: this.commodityValue,
        customwhy: this.customwhy
      }
      this.msgType = 0
      this.counter.push({
        Msg: '出差申请',
        msgType: this.msgType,
        subList: {}
      })

      this.msgType = 1
      this.counter.push({
        Msg: '已为您生成 [出差申请单] ，请点击底部按钮继续进行操作~',
        msgType: this.msgType,
        subList: {}
      })

      this.msgType = 2
      this.styleSatue = 0 // 正常点击 不置灰
      this.counter.push({
        styleSatue: this.styleSatue,
        Msg: '出差申请',
        msgType: this.msgType,
        subList: subList
      })

      let params = subList
      // getDefaultStartAddrApi.getAddEdit( params, this, (res) =>{
      // 	console.log(res)
      // })

      this.startArea = '请选择'
      this.endArea = '请选择'
      this.startTimeModel = this.yesterday
      this.endTimeModel = '请选择'
      this.customwhy = ''
    },
    // 点击出差申请单弹窗 “取消” 按钮
    subCencle () {
      this.tripFlag = false
    },
    // 点击我要订票“确定”按钮
    subEnterBooking () {
      this.booking = false // 控制我要订票弹框消失
      // this.flightlist = true // 显示订票单选列表
      this.draftFlag = true

      this.msgType = 0
      this.counter.push({
        Msg: '订票',
        msgType: this.msgType,
        subList: {}
      })

      this.msgType = 1
      this.counter.push({
        Msg: '根据您的出差行程，为您查询到N个符合差标的航班信息，请点击按钮继续进行操作~',
        msgType: this.msgType,
        subList: {}
      })

      let subList = {
        startArea: this.bookingStartArea,
        endArea: this.bookingEndArea,
        StartDate: this.bookingStartTimeModel,
        vehicleValue: this.bookingVehicleValue.toString()
      }
      this.flightlistArr = subList
      this.msgType = 3
      this.styleSatue = 0 // 正常点击 不置灰
      this.counter.push({
        styleSatue: this.styleSatue,
        Msg: '订票',
        msgType: this.msgType,
        subList: subList
      })
    },

    // 点击我要订票“取消”按钮
    subCencleBooking () {
      this.booking = false
    },

    hideStyle (e) {
      if (e.target.parentNode.getAttribute('class') !== 'tasks') {
        let len = this.taskList.length
        for (var i = 0; i < len; i++) {
          this.taskList[i].istaskList = false
        }
      }
      if (e.target.parentNode.getAttribute('class') !== 'todos') {
        let len = this.wantToArr.length
        for (var i = 0; i < len; i++) {
          this.wantToArr[i].isTodo = false
        }
      }
    },
    clickTaskList (index) { // 绑定默认横向滑动菜单的点击事件
      let len = this.taskList.length
      for (var i = 0; i < len; i++) {
        this.taskList[i].istaskList = false
      }
      this.taskList[index].istaskList = true
      // this.current = index
      if (index == 0) {
        // 出差申请
        this.tripFlag = true
        let params = {

        }
        // getDefaultStartAddrApi.getDefaultStartAddr( params, this, (res) =>{
        // 	console.log(res)
        // })
      }
      if (index == 1) {
        // 我要订票
        this.booking = true
      }
      if (index == 2) {
        // 差旅报销
        console.log('差旅报销')
      }
    },
    userCliCont () { // 点击输入域
      // if (this.userCont == '请输入...') {
      // 	this.userCont = ''
      // }
      //   this.scrollToBottom()
    },
    userCommit () { // 输入域失去焦点方法
      // if (this.userCont == '') {
      // 	this.userCont = '请输入...'
      // } else {
      // 	// this.userCont = this.userCont
      // 	this.commit()
      // 	//   this.scrollToBottom()
      // 	// console.log("this.userCont:"+this.userCont)
      // }
    },
    commit () { // 输入域点击“发送”
      if (this.userCont == '出差申请') {
        // 手动输入“出差申请”
        console.log('出差申请')
        this.userCont = ''
      } else {
        console.log('内容无效')
        this.userCont = ''
      }
      // if (this.userCont !== '请输入...') {
      // 	this.msgType = 0
      // 	this.counter.push({
      // 		Msg: this.userCont,
      // 		msgType: this.msgType,
      // 		subList: {}
      // 	})
      // 	// this.findFlagArr.forEach(element => {
      // 	// if(element.search(this.userCont) !== -1){
      // 	// 	let Msg = element.indexOf(this.userCont)
      // 	// 	console.log('------'+Msg)
      // 	// }
      // 	// let FlagNum = this.findFlagArr.name.filter(element => {
      // 	// 		return element === this.userCont
      // 	// })
      // 	let len = this.findFlagArr.length
      // 	for (let i = 0; i < len; i++) {
      // 		if (this.userCont === '查天气') {
      // 			console.log("查天气")
      // 			this.msgType = 1
      // 			this.counter.push({
      // 				Msg: "海淀区今天阴，气温23到32度~",
      // 				msgType: this.msgType,
      // 				subList: {}
      // 			})
      // 			this.msgType = 3
      // 			this.counter.push({
      // 				Msg: "",
      // 				msgType: this.msgType,
      // 				subList: {},
      // 			})
      // 			this.$refs['vsAll'].scrollTo({
      // 				y: '1000%'
      // 			}, 500)
      // 		}
      // 		if (this.userCont === '出差申请') {
      // 			console.log("出差申请")
      // 			this.tripFlag = true
      // 			// return 0
      // 			// this.msgType = 0
      // 			// this.counter.push({
      // 			// 	Msg:"出差申请",
      // 			// 	msgType:this.msgType,
      // 			// 	subList:{}
      // 			// })
      // 		}
      // 		if (this.userCont === '差旅标准') {
      // 			console.log("差旅标准")
      // 			this.chailvpop = true
      // 		}
      // 		if (this.userCont === '') {
      // 			this.userCont = '请输入...'
      // 		}
      // 		this.userCont = '请输入...'
      // 	}
      // 	// });
      // }
      // this.$refs['vsAll'].scrollTo({
      // 	y: '1000%'
      // }, 500)
      //   this.scrollToBottom()
    },
    show () { // 监听键盘点击回车的逻辑
      // let that = this
      // that.$nextTick(
      // 	() => {
      // 		that.$refs['userInput'].blur()
      // 	})
      //   this.scrollToBottom()
    },
    // scrollToBottom(){
    //   this.$nextTick(()=>{
    // 	  let countHigh = document.getElementById('wrap')
    // 	  countHigh.scrollTop = countHigh.scrollHeight
    //   })
    // },

    goBack () { // 返回指向
      this.$router.push({
        path: 'firstPage'
      })
    }
  },
  activated () {

  },
  created () {
    // 获取默认出发时间
    var t = new Date().getTime() + 24 * 60 * 60 * 1000
    let d = new Date(t)
    let yyyy = d.getFullYear()
    let mm = d.getMonth() + 1
    let dd = d.getDate()
    let h = new Date().getHours()
    let m = new Date().getMinutes()
    this.yesterday = yyyy + '-' + (mm > 9 ? mm : ('0' + mm)) + '-' + (dd > 9 ? dd : ('0' + dd))
    this.startTimeModel = this.yesterday // 出差申请单默认出发时间
    this.bookingStartTimeModel = this.yesterday // 我要订票默认出发时间

    this.bookingVehicleValue = ['飞机'] // 我要订票默认显示交通工具
    this.vehicleValue = ['飞机'] // 出差申请单默认显示交通工具
    this.commodityValue = ['报销住宿费'] // 出差申请单默认显示交通工具
    this.businessValue = ['异地差旅费'] // 出差申请单默认显示出差类别
  }
}
