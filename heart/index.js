/**
 * @desc 心形线函数
 */
function heart() {
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    // 画布宽度
    var width = window.parseInt(canvas.width, 10);
    // 画布高度
    var height = window.parseInt(canvas.height, 10);
    // 线开始的颜色
    var startColor = 'rgba(255, 255, 255, 0.7)';
    // 线结束的颜色
    var endColor = 'rgb(0, 0, 255)';
    // 阴影的颜色
    var shadowColor = 'rgba(255, 255, 255, 0.5)';
    // 设置画布宽度
    canvas.width = width;
    // 设置画布高度
    canvas.height = height;
    context.lineWidth = 3;
    // 将画布原点从0,0移动到画布中心，移动原点是为了让心形显现出来
    context.translate(width/2, height/2);
    // 保存所有点的坐标的数组
    var pointArr = getAllPoints();


}

/**
 * @desc 获取心形线坐标数组
 */
var getHeartPos = function() {
    // 坐标集合
    var posArr = [];
    // t 代表弧度
    var t = -Math.PI + 0.5;
    // maxt 代表 t 的最大值
    var maxt = 2 * Math.PI - 1;
    // vt 代表 t 的增量
    var vt = 0.1;
    // 需要循环的次数
    var maxi = Math.ceil( maxt / vt );
    // 临时x坐标
    var x = 0;
    // 临时y坐标
    var y = 0;
    // 控制心形大小
    var size = 10;

    for(var i = 0; i <= maxi; i++) {
        // x=16 * (sin(t)) ^ 3;
        x = 16 * Math.pow(Math.sin(t), 3);
        // y=13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)
        y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        t += vt;
        posArr.push([x * size, -y * size])
    }

    return posArr;
}

/**
 * @desc 获取折线坐标数组
 * @param {*} x 表示折线上的点 每次改变的x坐标
 * @param {*} maxX 表示 x 的最大值
 * @param {*} y 折线的 y坐标
 * @param {*} startX 开始坐标值
 * @param {*} endX 结束坐标值
 */
var getLinePos = function(x, maxX, y, startX, endX) {
    // lineArr暂时保存所有折线上的点的坐标
    var lineArr = [];

    // brokenLine 函数用来得到折线上所有点的坐标
    function brokenLine( x, maxX, y, startX, endX ) {
        
        if(x > maxX)  return lineArr;

        if(x > startX && x < endX){
            if(Math.random() > 0.8){
                lineArr.push([x, randomNum(y + 60, y - 90)]);
            } else {
                lineArr.push([x, y]);
            }
        }else{
            lineArr.push([x, y]);
        }

        x += randomNum(5, 10);
        return brokenLine( x, maxX, y, startX, endX )
    }

    return brokenLine( x, maxX, y, startX, endX )
}

/**
 * @desc 返回from和to之间的一个整数
 * @param {number} from
 * @param {number} to
 */
var randomNum = function(from, to) {
    var range = to - from;
    var num = from + Math.round(Math.random() * range);
    return num;
}

/**
 * @desc 获取所有点的坐标，包括心形线 和 折线
 */
var getAllPoints = function() {
    var canvas = document.querySelector('canvas');
    // 画布宽度
    var width = window.parseInt(canvas.width, 10);

    // 获取心形
    let pointsArr = getHeartPos();
    // 获取左边折线
    var x = - width / 2; // -500
    var maxX = pointsArr[0][0]; // 0
    var y = pointsArr[0][1]; // 0
    var startX = maxX - (maxX - x) * 0.8 //-400
    var endX = maxX - (maxX - x) * 0.2 // -100
    var Pos = getLinePos( x, maxX, y, startX, endX );
    pointsArr = Pos.concat(pointsArr);

    // 获取右边折线
    x = pointsArr[pointsArr.length - 1][0]; 
    maxX = width / 2; // 500
    y = pointsArr[pointsArr.length - 1][1]; // 0
    startX = (maxX - x) * 0.2 //100
    endX = (maxX - x) * 0.8 // 400
    Pos = getLinePos( x, maxX, y, startX, endX );
    pointsArr = pointsArr.concat(Pos)
    
    return pointsArr
}

heart()