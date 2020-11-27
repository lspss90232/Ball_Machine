console.clear()
let bomb = document.getElementById("Bomb")
let reset = document.getElementById("Reset")

let quantity = document.getElementById("quantity")
let text = document.getElementById("text")

let play = document.getElementById("play")
let redo = document.getElementById("redo")

let isClick = false
let canvas = document.getElementById("mycanvas")
let ctx = canvas.getContext("2d")

ww = canvas.width = window.innerWidth
wh = canvas.height = window.innerHeight

let colors = ["#ff4b5c","#d2e603","#fddb3a","#ffa931","#12cad6"]


// console.log(Math.round(Math.random()*5))
//若視窗大小變動-重設canvas寬高
window.addEventListener("resize",function(){
  ww = canvas.width = window.innerWidth
  wh = canvas.height = window.innerHeight
})




//建立“球”的物件原型-定義球各項屬性
let Ball = function(position,vector,r,color){
  // 中心位置
  this.p = position
  //速度
  this.v = vector
  //加速度
  this.a = {
    x:0,
    y:0
  }
  //半徑
  this.r = r
  
  this.color = color
  //是否正在被拖曳
  // this.dragging = false
}
//新增方法函數-畫圓
Ball.prototype.draw = function(){
  ctx.beginPath()
  ctx.save()
    ctx.translate(this.p.x,this.p.y)
    ctx.arc(0,0,this.r,0,Math.PI*2)
    ctx.fillStyle = this.color
  // console.log(this.color)
    ctx.fill()
  ctx.restore()
}

//新增方法函數-更新球的變化、碰到邊要反彈
Ball.prototype.update = function(){
    this.p.x +=this.v.x
    this.p.y +=this.v.y

    this.v.x+=this.a.x
    this.v.y+=this.a.y
  
    this.checkBoundary()
  }
//新增方法函數-偵測是否超出邊界，若超出，速度變為反向
Ball.prototype.checkBoundary = function(){
  if(this.p.x+this.r>ww){
    this.v.x = -Math.abs(this.v.x)
  }
  if(this.p.x-this.r<0){
    this.v.x = Math.abs(this.v.x)
  }
  
  if(this.p.y+this.r>wh){
    this.v.y = -Math.abs(this.v.y)
  }
  if(this.p.y-this.r<0){
    this.v.y = Math.abs(this.v.y)
  }
}
// Ball.prototype.back=function(){
//   if(Math.abs((this.p.x-ww/2))>0){
//     this.v.x= -Math.abs(this.v.x)
//   }
//   if(Math.abs((this.p.x-ww/2))=0){
//     this.v.x= 0
//   }
//   if(Math.abs((this.p.y-wh/2))>0){
//     this.v.y= -Math.abs(this.v.y)
//   }
  
//    if(Math.abs((this.p.y-wh/2))=0){
//     this.v.y= 0
//   }
// }

//新陣列-裝球
// let balls_data=
//   [{ name: "ball1",
//     position:{x: 50,y: 50},
//     vector:{x: 20,y: 5},
//     r: 20
//   },{ name: "ball2",
//     position:{x: 250,y: 300},
//     vector:{x: -30,y: -25},
//      r: 50
//   },{ name: "ball3",
//     position:{x: 400,y: -60},
//     vector:{x: -2,y: -10},
//      r: 30
//   }]

//產生陣列-裝球
let balls_data=[]
function makeBall(number){
  for(let i=0;i<number;i++){
    let ball={
    name: "ball"+i,
    position: {x:ww/2,y:wh/2},
    vector: {x:Math.random()*50-30,y:Math.random()*50-30},
    r: Math.random()*15+5,
    color: colors[Math.round(Math.random()*colors.length)]
  }
    // console.log(ball)
  balls_data.push(ball)
  }
}


//新陣列-裝建構式函數
let balls=[];
//將速度作為參數在初始化時給定

//球初始化-建立球
function init(data){
  data.forEach(function(item){
    balls.push(new Ball(item.position,item.vector,item.r,item.color))
  })
    // console.log("init")
}

// function back(){
//    balls.forEach(function(ball){
//       ball.back()
//     })
// }

function update(){
    balls.forEach(function(ball){
      ball.update()
    })
  // console.log("update")
}



//使用draw()-畫自己
function draw(){
  // 畫背景
  ctx.fillStyle = "white"
  ctx.fillRect(0,0,ww,wh)
  balls.forEach(function(ball){
    //畫球
    ball.draw()
  })
  //每秒執行 200 次
  setTimeout(draw,1000/120)
}


// rgba(20,39,78,1)


//點按bomb按鈕就發射球
bomb.addEventListener("click",function(){
  if(quantity.value==""){
    alert("There is no value.Please give me a number.Thank you!")
  }
  if(isClick==false && quantity.value!==""){
    isClick = true
    bomb.style.cursor = "initial"
    reset.style.cursor = "pointer"
    //變深紅
    bomb.style.backgroundColor="#CC3947"
    
    //播放符號不縮放
    play.style.transform="scale(1.1)"

    reset.style.backgroundColor="#12CAD6"
    redo.style.transform=""
    makeBall(quantity.value)
    init(balls_data)
    //執行-秒執行30次
    setInterval(update,1000/30)
    draw()
    quantity.value=""
  }

  
})


reset.addEventListener("click",function(){
  if(isClick==true){
    // back()
    isClick = false
    bomb.style.cursor = "pointer"
    reset.style.cursor = "initial"
    //變亮紅
    bomb.style.backgroundColor="#FF4B5C"
    //播放符號可縮放
    play.style.transform=""
    
    reset.style.backgroundColor="#26939A"
    redo.style.transform="rotate(90deg)"
    
    balls_data=[]
    balls=[]
    
  }
})