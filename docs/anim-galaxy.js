/**
 * 星空渲染
 * @param {object} galaxyCanvas 画布元素
 */
function renderGalaxy(galaxyCanvas, starArguments) {
  let galaxyCtx = galaxyCanvas.getContext('2d')
  let galaxyCanvasWidth = galaxyCanvas.clientWidth
  let galaxyCanvasHeight = galaxyCanvas.clientHeight

  // 整个星空的随机星星点点位置计算
  // let starDensity = 1 / 300 // 星星密度
  let starDensity = starArguments.starDensity
  let starBaseNum = starArguments.starBaseNum
  let initStarNum = starArguments.starNumber
  // let starBaseNum = parseInt(galaxyCanvasWidth * galaxyCanvasHeight * starDensity) // 大概出现的星星数量
  // let initStarNum = starBaseNum + Math.random() * 40 - 20 // 初始数量
  let starArr = []

  // 新增一颗星星
  let addRandomStar = function () {
    if (starArr.length > starBaseNum * 1.5) return // 5成随机波动
    let star = {
      x: parseInt(Math.random() * galaxyCanvasWidth), // 左偏移
      y: parseInt(Math.random() * galaxyCanvasHeight), // 左偏移
      r: parseInt(Math.random() > 0.01 ? 1 : 2), // 半径
      b: Math.random() > 0.5 ? Math.random() > 0.95 ? 0.25 : 0.2 : 0.15 // 随机亮度
    }
    starArr.push(star)
    renderStar(star)
  }
  // 减去一颗星星
  let reduceRandomStar = function (repeat) {
    if (starArr.length < starBaseNum * 0.5) return // 5成随机波动
    let index = parseInt(Math.random() * (starArr.length - 1))
    index = index < 0 ? 0 : index
    var star = starArr[index]
    if (star.blinking) {
      // 闪烁着的星星不删
      if (!repeat) reduceRandomStar(true)
      return
    }
    starArr.splice(index, 1)
    galaxyCtx.clearRect(star.x, star.y, star.r, star.r)
  }
  // 星星闪烁
  let starBlink = function (star) {
    let i = 1
    let blinkAnim = function () {
      if (i > 10) return
      setTimeout(blinkAnim, 200)
      if (i <= 5) {
        star.b += 0.12
      } else {
        star.b -= 0.12
      }
      renderStar(star)
      i++
    }
    blinkAnim()
  }

  // 初始化渲染星星
  for (let i = 0; i < initStarNum; i++) {
    addRandomStar()
  }

  // 随机添加或删除星星
  function autoChangeRandomStar () {
    for (let i = 0; i < 20; i++) {
      if (Math.random() < 0.5) {
        addRandomStar()
      } else {
        reduceRandomStar()
      }
    }
  }

  animRender()
  animRender2()

  // 动画帧渲染
  function animRender () {
    setTimeout(animRender, 1000)
    autoChangeRandomStar() // 随机添加或删除星星
  }

  function animRender2 () {
    setTimeout(animRender2, 1000 + Math.random() * 1000 - 500)
    // 随机星星闪烁
    var index = parseInt(Math.random() * (starArr.length - 1))
    index = index < 0 ? 0 : index
    var star = starArr[index]
    star.blinking = true
    starBlink(star)
  }

  // 渲染星星的方法
  function renderStar (star) {
    // 计算
    let imgData = galaxyCtx.createImageData(star.r, star.r)
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i + 0] = 255
      imgData.data[i + 1] = 255
      imgData.data[i + 2] = 255
      imgData.data[i + 3] = parseInt(star.b * 255)
    }
    galaxyCtx.putImageData(imgData, star.x, star.y)
  }
}

// 渲染星河
function renderMilkyWay(milkyWayCanvas, milkyArguments) {
  
  let galaxyCtx = milkyWayCanvas.getContext('2d')
  let galaxyCanvasWidth = milkyWayCanvas.clientWidth
  let galaxyCanvasHeight = milkyWayCanvas.clientHeight

  let milkyWayDeg = Math.round(Math.atan(galaxyCanvasHeight / galaxyCanvasWidth) * 180 / Math.PI, 6)
  milkyWayCanvas.style.backgroundImage = 'linear-gradient('+milkyWayDeg+'deg, rgba(255,255,255,0) 15%, rgba(255,255,255,0.05) 43%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.05) 57%, rgba(255,255,255,0) 85%)'

  // 星河河道中随机星星位置计算
  // let starDenst = 1 / 80 // 星星密度
  // let riverWidth = 100 // 河道宽度
  let starDenst = milkyArguments.milkyStarDensity // 星星密度
  let riverWidth = milkyArguments.milkyRiverWidth // 河道宽度
  let riverLength = parseInt(Math.sqrt(galaxyCanvasWidth ** 2 + galaxyCanvasHeight ** 2))
  let riverAngle = Math.atan(galaxyCanvasHeight / galaxyCanvasWidth)

  let mockCanvas = document.createElement('CANVAS') // 创建一个画布来描绘超长的星河图
  mockCanvas.width = riverLength * 2
  mockCanvas.height = riverWidth
  let mockCtx = mockCanvas.getContext('2d')

  // let starBaseNum = parseInt(mockCanvas.width * mockCanvas.height * starDenst) // 大概出现的星星数量
  // let initStarNum = starBaseNum + Math.random() * 40 - 20 // 初始数量
  let starBaseNum = milkyArguments.milkyStarBaseNum
  let initStarNum = milkyArguments.milkyStarNumber
  let starArr = []
  let addRandomStar = function () {
    if (starArr.length > starBaseNum * 1.5) return // 5成随机波动
    let star = {
      x: parseInt(Math.random() * mockCanvas.width), // 左偏移
      y: parseInt(Math.random() * mockCanvas.height), // 左偏移
      r: parseInt(Math.random() > 0.08 ? 1 : 2), // 半径
      // b: Math.random() > 0.5 ? Math.random() > 0.95 ? 0.3 : 0.25 : 0.2 // 随机亮度
      b: Math.random() > 0.5 ? Math.random() > 0.95 ? 0.8 : 0.6 : 0.4 // 随机亮度
    }
    starArr.push(star)
    renderStar(star)
  }

  function renderStar (star) {
    // 计算
    let imgData = mockCtx.createImageData(star.r, star.r)
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i + 0] = 255
      imgData.data[i + 1] = 255
      imgData.data[i + 2] = 255
      imgData.data[i + 3] = parseInt(star.b * 255)
    }
    mockCtx.putImageData(imgData, star.x, star.y)
  }

  for (let j = 0; j < initStarNum; j++) {
    addRandomStar(j)
  }
  let riverImgData = mockCanvas.toDataURL('image/png')
  let img = new Image()
  img.src = riverImgData
  let animTime = 0

  // 星河运动动画
  function milkyWayAnim () {
    animTime++
    if (animTime % 10 !== 0) {
      return
    }
    galaxyCtx.setTransform(1, 0, 0, 1, 0, 0)
    galaxyCtx.clearRect(0, 0, galaxyCanvasWidth, galaxyCanvasHeight)
    galaxyCtx.setTransform(1, 0, 0, 1, 0, -46)
    let spanX = animTime * 0.05 % galaxyCanvasWidth
    galaxyCtx.translate(-spanX, -spanX * galaxyCanvasHeight / galaxyCanvasWidth)
    galaxyCtx.rotate(riverAngle)
    galaxyCtx.drawImage(img, 0, 0)
  }

  animRender()

  // 动画帧渲染
  function animRender () {
    requestAnimationFrame(animRender)
    milkyWayAnim()
  }
}

/**
 * 星座描绘
 * @param constellationCanvas
 */
function renderConstellation(constellationCanvas, constellationOption) {
  let constellationCtx = constellationCanvas.getContext('2d')
  let canvasWidth = constellationCanvas.width
  let canvasHeight = constellationCanvas.height

  switch (constellationOption) {
	//白羊座
    case '1':
		  var starArr =[
			  {x: 60,y: 156},
			  {x: 68,y: 132},
			  {x: 56,y: 96},
			  {x: 120,y: 52},
			  {x: 130,y: 40},
			  {x: 142,y: 46},
			  {x: 140,y: 64},
			  {x: 144,y: 72}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 3, to: 6},
			  {from: 6, to: 7}
		  ]
		  break;
		  
	//金牛座
	case '2':
		  var starArr =[
			  {x: 58,y: 42},
			  {x: 78,y: 72},
			  {x: 100,y: 102},
			  {x: 100,y: 114},
			  {x: 122,y: 126},
			  {x: 154,y: 142},
			  {x: 158,y: 158},
			  {x: 44,y: 86},
			  {x: 78,y: 114},
			  {x: 120,y: 142},
			  {x: 134,y: 152}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 5, to: 6},
			  {from: 7, to: 8},
			  {from: 8, to: 3},
			  {from: 4, to: 9},
			  {from: 9, to: 10}
		  ]
		  break;
		  
	//双子座
	case '3':
		  var starArr =[
			  {x: 36,y: 74},
			  {x: 50,y: 90},
			  {x: 70,y: 110},
			  {x: 78,y: 136},
			  {x: 98,y: 154},
			  {x: 102,y: 126},
			  {x: 114,y: 156},
			  {x: 56,y: 58},
			  {x: 84,y: 64},
			  {x: 122,y: 98},
			  {x: 144,y: 120},
			  {x: 166,y: 118},
			  {x: 138,y: 150},
			  {x: 44,y: 108},
			  {x: 70,y: 86},
			  {x: 96,y: 42}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 2, to: 5},
			  {from: 5, to: 6},
			  {from: 7, to: 8},
			  {from: 8, to: 9},
			  {from: 9, to: 10},
			  {from: 10, to: 11},
			  {from: 9, to: 12},
			  {from: 13, to: 1},
			  {from: 1, to: 14},
			  {from: 14, to: 8},
			  {from: 8, to: 15}
		  ]
		  break;
		  
	//巨蟹座
	case '4':
		  var starArr =[
			  {x: 32,y: 78},
			  {x: 54,y: 72},
			  {x: 104,y: 98},
			  {x: 114,y: 130},
			  {x: 166,y: 156},
			  {x: 88,y: 42}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 2, to: 5}
		  ]
		  break;
		  
	//狮子座
	case '5':
		  var starArr =[
			  {x: 32,y: 150},
			  {x: 46,y: 134},
			  {x: 78,y: 154},
			  {x: 142,y: 106},
			  {x: 128,y: 78},
			  {x: 110,y: 74},
			  {x: 94,y: 54},
			  {x: 108,y: 48},
			  {x: 120,y: 54}, 
			  {x: 170,y: 112}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 5, to: 6},
			  {from: 7, to: 8},
			  {from: 3, to: 9}
		  ]
		  break;
		  
	//处女座
	case '6':
		  var starArr =[
			  {x: 32,y: 118},
			  {x: 70,y: 126},
			  {x: 88,y: 140},
			  {x: 124,y: 102},
			  {x: 154,y: 92},
			  {x: 168,y: 74},
			  {x: 120,y: 84},
			  {x: 130,y: 52},
			  {x: 68,y: 150}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 3, to: 6},
			  {from: 6, to: 7},
			  {from: 2, to: 8}
		  ]
		  break;
		  
	//天秤座
	case '7':
		  var starArr =[
			  {x: 32,y: 134},
			  {x: 68,y: 120},
			  {x: 120,y: 54},
			  {x: 150,y: 46},
			  {x: 168,y: 94},
			  {x: 126,y: 148},
			  {x: 102,y: 156}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 5, to: 6}
		  ]
		  break;
		  
	//天蝎座
	case '8':
		  var starArr =[
			  {x: 34,y: 100},
			  {x: 56,y: 126},
			  {x: 38,y: 140},
			  {x: 56,y: 156},
			  {x: 82,y: 154},
			  {x: 98,y: 144},
			  {x: 114,y: 110},
			  {x: 118,y: 88},
			  {x: 138,y: 62},
			  {x: 148,y: 42},
			  {x: 164,y: 58},
			  {x: 158,y: 88},
			  {x: 146,y: 100},
			  {x: 76,y: 94}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 5, to: 6},
			  {from: 6, to: 7},
			  {from: 7, to: 8},
			  {from: 8, to: 9},
			  {from: 9, to: 10},
			  {from: 10, to: 11},
			  {from: 11, to: 12},
			  {from: 1, to: 13},
			  {from: 8, to: 11}
		  ]
		  break;
		  
	//射手座
	case '9':
		  var starArr =[
			  {x: 44,y: 132},
			  {x: 48,y: 102},
			  {x: 90,y: 80},
			  {x: 108,y: 74},
			  {x: 118,y: 86},
			  {x: 132,y: 100},
			  {x: 126,y: 120},
			  {x: 132,y: 134},
			  {x: 148,y: 106},
			  {x: 154,y: 78},
			  {x: 98,y: 94},
			  {x: 58,y: 136},
			  {x: 60,y: 156},
			  {x: 96,y: 42},
			  {x: 104,y: 54},
			  {x: 118,y: 58}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 5, to: 6},
			  {from: 6, to: 7},
			  {from: 7, to: 8},
			  {from: 8, to: 9},
			  {from: 2, to: 10},
			  {from: 10, to: 11},
			  {from: 11, to: 12},
			  {from: 10, to: 4},
			  {from: 13, to: 14},
			  {from: 14, to: 15},
			  {from: 15, to: 3},
			  {from: 14, to: 3}
		  ]
		  break;  
		  
	//摩羯座
	case '10':
		  var starArr =[
			  {x: 156,y: 42},
			  {x: 156,y: 68},
			  {x: 150,y: 90},
			  {x: 150,y: 140},
			  {x: 138,y: 156},
			  {x: 62,y: 132},
			  {x: 44,y: 98},
			  {x: 60,y: 106},
			  {x: 106,y: 108}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 5, to: 6},
			  {from: 6, to: 7},
			  {from: 7, to: 8},
			  {from: 8, to: 1}
		  ]
		  break;	  
		
	//水瓶座
	case '11':
		  var starArr =[
			  {x: 90,y: 42},
			  {x: 74,y: 70},
			  {x: 54,y: 102},
			  {x: 60,y: 116},
			  {x: 58,y: 128},
			  {x: 96,y: 158},
			  {x: 102,y: 142},
			  {x: 116,y: 136},
			  {x: 146,y: 148},
			  {x: 86,y: 106},
			  {x: 106,y: 94}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 5, to: 6},
			  {from: 6, to: 7},
			  {from: 7, to: 8},
			  {from: 2, to: 9},
			  {from: 9, to: 10}
		  ]
		  break;	  
		  
	//双鱼座
	case '12':
		  var starArr =[
			  {x: 56,y: 86},
			  {x: 56,y: 106},
			  {x: 72,y: 146},
			  {x: 86,y: 156},
			  {x: 100,y: 140},
			  {x: 106,y: 124},
			  {x: 114,y: 116},
			  {x: 126,y: 86},
			  {x: 134,y: 78},
			  {x: 148,y: 78},
			  {x: 154,y: 68},
			  {x: 144,y: 60},
			  {x: 150,y: 44},
			  {x: 46,y: 100},
			  {x: 132,y: 66}
		  ]
		  lines = [
			  {from: 0, to: 1},
			  {from: 1, to: 2},
			  {from: 2, to: 3},
			  {from: 3, to: 4},
			  {from: 4, to: 5},
			  {from: 5, to: 6},
			  {from: 6, to: 7},
			  {from: 7, to: 8},
			  {from: 8, to: 9},
			  {from: 9, to: 10},
			  {from: 10, to: 11},
			  {from: 11, to: 12},
			  {from: 0, to: 13},
			  {from: 13, to: 1},
			  {from: 8, to: 14},
			  {from: 14, to: 11}
		  ]
		  break;
		  
    default:
       starArr = [
        { x: 75, y: 15 },
        { x: 75, y: 45 },
        { x: 75, y: 95 },
        { x: 75, y: 145 },
        { x: 35, y: 50 },
        { x: 115, y: 50 },
        { x: 15, y: 80 },
        { x: 135, y: 80 }
      ]
       lines = [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 1, to: 4 },
        { from: 1, to: 5 },
        { from: 4, to: 6 },
        { from: 5, to: 7 }
      ]
      break;
  }

  function render () {
    constellationCtx.clearRect(0, 0, canvasWidth, canvasHeight)
    for (let i = 0; i < starArr.length; i++) {
      renderStar(starArr[i])
    }

    constellationCtx.beginPath()
    for (let i = 0; i < lines.length; i++) {
      renderLine(lines[i])
    }
    constellationCtx.strokeStyle = 'rgba(255,255,255,.2)'
    constellationCtx.stroke()
  }

  // 渲染星星的方法
  function renderStar (star) {
    constellationCtx.beginPath()
    let r = 2
    r += 0.15 * time
    constellationCtx.arc(star.x, star.y, r, 0, 2 * Math.PI)
    let alpha = 0.4
    alpha += 0.02 * time
    constellationCtx.fillStyle = 'rgba(255,255,255,' + alpha + ')'
    constellationCtx.shadowBlur = 0.4 * time
    constellationCtx.shadowColor = '#fff'
    // 大四角星
    constellationCtx.moveTo(star.x - 1, star.y - 1)
    constellationCtx.lineTo(star.x, star.y - 0.14 * time ** 2)
    constellationCtx.lineTo(star.x + 1, star.y - 1)
    constellationCtx.lineTo(star.x + 0.14 * time ** 2, star.y)
    constellationCtx.lineTo(star.x + 1, star.y + 1)
    constellationCtx.lineTo(star.x, star.y + 0.14 * time ** 2)
    constellationCtx.lineTo(star.x - 1, star.y + 1)
    constellationCtx.lineTo(star.x - 0.14 * time ** 2, star.y)
    constellationCtx.lineTo(star.x - 1, star.y - 1)
    // 小四角星
    constellationCtx.moveTo(star.x, star.y - 1)
    constellationCtx.lineTo(star.x + 1 + 0.06 * time ** 2, star.y - 1 - 0.06 * time ** 2)
    constellationCtx.lineTo(star.x + 1, star.y)
    constellationCtx.lineTo(star.x + 1 + 0.06 * time ** 2, star.y + 1 + 0.06 * time ** 2)
    constellationCtx.lineTo(star.x, star.y + 1)
    constellationCtx.lineTo(star.x - 1 - 0.06 * time ** 2, star.y + 1 + 0.06 * time ** 2)
    constellationCtx.lineTo(star.x - 1, star.y)
    constellationCtx.lineTo(star.x - 1 - 0.06 * time ** 2, star.y - 1 - 0.06 * time ** 2)
    constellationCtx.lineTo(star.x, star.y - 1)

    constellationCtx.fill()
  }

  // 渲染星星连线的方法
  function renderLine (line) {
    constellationCtx.moveTo(starArr[line.from].x, starArr[line.from].y)
    constellationCtx.lineTo(starArr[line.to].x, starArr[line.to].y)
  }

  let timeout
  let time = 0

  render() // 初始化

  // hover动画特效
  constellationCanvas.addEventListener('mouseenter', function () {
    clearHoverAnimTimeout()
    timeout = setInterval(function () {
      if (time >= 10) clearHoverAnimTimeout()
      time++
      render()
    }, 34)
  })
  constellationCanvas.addEventListener('mouseleave', function () {
    clearHoverAnimTimeout()
    timeout = setInterval(function () {
      if (time < 0) clearHoverAnimTimeout()
      time--
      render()
    }, 34)
  })

  function clearHoverAnimTimeout () {
    if (timeout) clearInterval(timeout)
  }
}

/**
 * 黑洞动画
 * @param nebulaCanvas 画布容器
 */
function nebulaAnim (nebulaCanvas) {
  let nebulaCtx = nebulaCanvas.getContext('2d')
  let canvasWidth = nebulaCanvas.width
  let canvasHeight = nebulaCanvas.height
  let canvasCenter = {
    x: canvasWidth / 2,
    y: canvasHeight / 2
  }

  nebulaCanvas.addEventListener('click', function () {
    // 随机生成2个起始点
    let startPoint = []
    for (let i = 0; i < 2; i++) {
      let angle = parseInt(Math.random() * 90) - 45 + 180 * i
      let y = 250 * Math.sin(angle * Math.PI / 180)
      let x = 250 * Math.cos(angle * Math.PI / 180)
      startPoint.push({
        x: x,
        y: y
      })
    }
    let time = 0
    let needTime = 50
    let tailTime = 5
    render()

    function render () {
      if (time >= needTime + tailTime) {
        nebulaCtx.clearRect(0, 0, canvasWidth, canvasHeight)
        highlightAnim()
        return
      }
      requestAnimationFrame(render)
      time++
      nebulaCtx.clearRect(0, 0, canvasWidth, canvasHeight)
      for (let i = 0; i < 2; i++) {
        let currTime = time > needTime ? needTime : time
        let currPos = {
          x: startPoint[i].x + (canvasCenter.x - startPoint[i].x) / needTime * currTime,
          y: startPoint[i].y + (canvasCenter.y - startPoint[i].y) / needTime * currTime
        }
        let currTailTime = time - tailTime < 0 ? 0 : time - tailTime
        currTailTime = currTailTime > needTime ? needTime : currTailTime
        let tailPos = {
          x: startPoint[i].x + (canvasCenter.x - startPoint[i].x) / needTime * currTailTime,
          y: startPoint[i].y + (canvasCenter.y - startPoint[i].y) / needTime * currTailTime
        }
        nebulaCtx.beginPath()
        nebulaCtx.moveTo(currPos.x, currPos.y)
        nebulaCtx.lineTo(tailPos.x, tailPos.y)
        var gnt1 = nebulaCtx.createLinearGradient(currPos.x, currPos.y, tailPos.x, tailPos.y) // 线性渐变的起止坐标
        gnt1.addColorStop(0, 'rgba(255,255,255,.5)') // 创建渐变的开始颜色，0表示偏移量，个人理解为直线上的相对位置，最大为1，一个渐变中可以写任意个渐变颜色
        gnt1.addColorStop(1, 'rgba(255,255,255,.001)')
        nebulaCtx.strokeStyle = gnt1
        nebulaCtx.stroke()
      }
    }

    // 中心光柱动画
    function highlightAnim () {
      let gnt1 = nebulaCtx.createLinearGradient(canvasCenter.x, canvasCenter.y, canvasCenter.x + 30, canvasCenter.y - 30) // 线性渐变的起止坐标
      let time = 0
      let currTime = 0

      function renderLight () {
        if (time >= 100) {
          nebulaCtx.clearRect(0, 0, canvasWidth, canvasHeight)
          return
        } else if (time >= 50) {
          currTime--
        } else {
          currTime++
        }
        requestAnimationFrame(renderLight)
        time++
        nebulaCtx.clearRect(0, 0, canvasWidth, canvasHeight)
        nebulaCtx.beginPath()
        nebulaCtx.moveTo(canvasCenter.x - 5, canvasCenter.y - 5)
        nebulaCtx.lineTo(canvasCenter.x + 25, canvasCenter.y - 35)
        nebulaCtx.lineTo(canvasCenter.x + 35, canvasCenter.y - 25)
        nebulaCtx.lineTo(canvasCenter.x + 5, canvasCenter.y + 5)
        nebulaCtx.arc(canvasCenter.x, canvasCenter.y, 10, 0, 2 * Math.PI)
        nebulaCtx.closePath()
        gnt1.addColorStop(0, 'rgba(255,255,255,' + 0.005 * currTime + ')') // 创建渐变的开始颜色，0表示偏移量，个人理解为直线上的相对位置，最大为1，一个渐变中可以写任意个渐变颜色
        gnt1.addColorStop(1, 'rgba(255,255,255,' + 0.001 * currTime + ')')
        nebulaCtx.fillStyle = gnt1
        nebulaCtx.fill()
      }

      renderLight()
    }
  })
}
