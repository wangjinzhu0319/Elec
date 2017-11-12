/**
 * Created by Administrator on 2017/10/11.
 */
$(function () {
    //产品分类手风琴
    $(".global_module h4").click(function () {
        $(this).next().slideToggle(600)
    });
    //往上滚动
    var $this = $(".scrollNews");
    var scrollTimer;
    $this.hover(function () {
        clearInterval(scrollTimer)
    }, function () {
        scrollTimer=setInterval(function () {
            var lineHeight = $this.find("li:first").height();
            $this.find("ul").animate({"marginTop":-lineHeight+"px"},600, function () {
                $(this).css({marginTop:0}).find("li:first").appendTo($(this)); //appendTo能直接移动元素
            })
        },3000)
    }).trigger("mouseleave");

    //图片轮播
    var liLen  = $(".num > li").length;
    var index = 0;
    var adTimer;

    $(".num li").mouseover(function(){
        index  =   $(this).index();
        var adWidth = $(".ad").width();
        $(".slider").stop(true,false).animate({left:-adWidth*index},1000);
        $(".num li").removeClass("active").eq(index).addClass("active");
    }).eq(0).mouseover();	//默认第一个
    //滑入停止动画，滑出开始动画.
    $('.ad').hover(function(){
        clearInterval(adTimer);
    },function(){
        adTimer = setInterval(function(){
            index++;
            var adWidth = $(".ad").width();
            $(".slider").stop(true,false).animate({left:-adWidth*index},1000);
            $(".num li").removeClass("active").eq(index).addClass("active");

            if(index==liLen){
                $(".slider").stop(true,false).animate({left:-adWidth*index},1000, function () {
                    $(".slider").css("left",0);
                });
                index=0;
                $(".num li").removeClass("active").eq(index).addClass("active");
            }
        } , 2000);
    }).trigger("mouseleave");


    //新品上市
    var page = 1;                               //默认当前的页面是1
    var i = 4; 								    //每版4个图片
    var len = $(".new ul li").length;  //li的数量
    var page_count = Math.ceil(len / i) ;       //总页数(只要不是整数，就往大的方向取最小的整数)
    var $parent = $(".new ul");           //获取li的宽度和(实际宽度)

//向右 按钮
    $(".module_right").click(function(){
        var none_unit_width =$(".prolist_content").width();   //获取框架内容的宽度,不带单位
        if( !$parent.is(":animated") ){
            if(page == page_count ){//已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
                $parent.animate({left:0}, 800); //通过改变left值，跳转到第一个版面
                page = 1;
            }else{
                $parent.animate({ left:'-='+none_unit_width}, 800);  //通过改变left值，达到每次换一个版面
                page++;
            }
        }
    });
//往左 按钮
    $(".module_left").click(function(){
        var none_unit_width =$(".prolist_content").width();   //获取框架内容的宽度,不带单位
        if( !$parent.is(":animated") ){
            if( page == 1 ){//已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
                $parent.animate({ left : '-='+none_unit_width*(page_count-1)}, 800); //通过改变left值，跳转到最后一个版面
                page = page_count;

            }else{
                $parent.animate({ left : '+='+none_unit_width }, 800);  //通过改变left值，达到每次换一个版面
                page--;
            }
        }
    });

    //详情页
    //衣服各部位的图片
    $(".imgList li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        aa(this);
    });
//    衣服颜色
    $(".pro_detail_right .color_change li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var imgSrc=$(this).find("img").attr("src");
        var i1=imgSrc.indexOf("_");         //右边第一个“_”
        var i2=imgSrc.lastIndexOf("_");     //右边第二个“_”
        //var unit2 = imgSrc.substring(0,i1);  //右边文件主名
        //var unit = imgSrc.substring(i2);    //右边文件扩展名
        imgSrc = imgSrc.substring(i1,i2);

        var imgSrc1=$('.imgList').find("img").attr("src");
        var j1=imgSrc1.indexOf("_");     //左边第一个“_”
        //var j2=imgSrc1.lastIndexOf("_");     //左边第二个“_”
        //var junit=imgSrc1.substring(j1,j2);     //左边_img1     _img2
        var junit1=imgSrc1.substring(0,j1);     //左边  image/small
        //alert(imgSrc);
        if(imgSrc=="_img2"){
            imgSrc=="_img1";
        }else{
            imgSrc=="_img2";
        }
        //var imgSrc_small = junit1 +imgSrc+ junit2;


        $(".imgList li").each(function (index) {
            //var junit2=imgSrc1.substring(j2);      //      _1.jpg
            $(this).find("img").attr("src",junit1 +imgSrc+ "_"+(index+1)+".jpg");
            aa(this);
        });
        var alt = $(this).find("img").attr("alt");
        $(".color span").text(alt);
    });


//尺寸
    $(".pro_detail_right .pro_size .size li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".same span").text($(this).text())
    });
//数量
    var span=$(".pro_price span");
    var price=span.text();
    $("#num_sort").change(function () {
        span.text($(this).val()*price)
    });
    //加入购物车
    $(".cart1").click(function () {
        var $product = $(".pro_detail_right");
        var pro_name = $product.find("h4:first").text();
        var pro_size = $product.find(".pro_size .same span").text();
        var pro_color =  $(".color span").text();
        var pro_num = $product.find("#num_sort").val();
        $(".modal1_title").text(pro_name);
        $(".modal1_color").text(pro_color);
        $(".modal1_size").text(pro_size);
        $(".modal1_numbers").text(pro_num);

        $(".modal1").toggle();
        $(".shade").toggle();
    });
    $(".gobuy a").click(function () {
        $(".modal1").toggle();
        $(".shade").toggle();
    });
//    描述
    $(".tab_menu ul li").click(function () {
        $(this).toggleClass("active").siblings().removeClass("active");
        var index=$(this).index();
        $(".tab_box div").eq(index).addClass("active").siblings().removeClass("active")
    });
    //通过修改样式来显示不同的星级
    star();
    $(".OK a").click(function () {
        $(".modal").toggle();
        $(".shade").toggle();
    });
    /*最终购买输出*/
    var $product = $(".pro_detail_right");
    $(".cart a").click(function(){
        var pro_name = $product.find("h4:first").text();
        var pro_size = $product.find(".pro_size .same span").text();
        var pro_color =  $(".color span").text();
        var pro_num = $product.find("#num_sort").val();
        var pro_price = $product.find(".pro_price span").text();
        var dialog = " 感谢您的购买。\n您购买的\n"+
            "产品是："+pro_name+"；\n"+
            "尺寸是："+pro_size+"；\n"+
            "颜色是："+pro_color+"；\n"+
            "数量是："+pro_num+"；\n"+
            "总价是："+pro_price +"元。";
        if( confirm(dialog) ){
            alert("您已经下单!");
        }
    });
    //猜你喜欢和本店热卖
    $(".control_left").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var divObj=$(this).parent().siblings("div");
        var divObj_W=divObj.width();
        divObj.find("ul").animate({
            marginLeft:0
        },500)

    });
    $(".control_right").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var divObj=$(this).parent().siblings("div");
        var divObj_W=divObj.width();
        divObj.find("ul").animate({
            marginLeft:-(divObj_W+20)
        },500)

    });
    //图片放大


});
//衣服换颜色
function aa(elem){
    if($(elem).hasClass("active")){
        var $imgSrc=$(elem).find("img").attr("src");
        var i1=$imgSrc.indexOf("/");         //左边第一个“/”
        var i2=$imgSrc.indexOf("_");     //左边第一个“-”
        var unit = $imgSrc.substring(0,i1);    //左边文件主名
        var unit2 = $imgSrc.substring(i2);  //左边文件地址
        //$("#bigImg").attr("src",$imgSrc);
        var imgSrc1=unit+"/big"+unit2;
        //alert(imgSrc1);
        $("#bigImg").attr({"src":$imgSrc,"jqimg":imgSrc1});

    }
}
//评分
function star(){
    var num=0;  //  初始值    修改代码时全局变量可能发生冲突
    var $rating=$("#rating");
    var $item=$rating.find(".rating-item");
    var lightOn=function(num){
        $item.each(function(index){
            console.log(index);
            if(index<num){
                $(this).css("background-position","-15px top");
            }else{
                $(this).css("background-position","0 top");
            }
        });
    };
    lightOn(num);//  初始化  先点亮2颗星星
    //  事件绑定  （ 优化 事件委托  子元素事件委托给父元素）
    $item.mouseover(function(){
        lightOn($(this).index()+1);
        $(this).css("background-position","-15px top");
    }).click(function(){
        num=$(this).index()+1;
        $(".modal").toggle();
        $(".shade").toggle();
        $(".grade span").text($(this).attr("title"))
    });
    $("#rating").mouseout(function(){
        lightOn(num);
        $(this).css("background-position","0 top");
    });
}

