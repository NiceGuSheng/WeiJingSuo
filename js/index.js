/**
 * ITCAST WEB
 * Created by zhousg on 2017/4/6.
 */
$(function(){
    /*动态的响应式轮播图*/
    banner();
    /*初始化页签*/
    initTab();
    /*初始页面上的工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function(){
    /*
     * 1.模拟数据（从后台回去数据）   [{},{}]
     * 2.判断当前设备          768px
     * 3.根据当前设备把数据转换成html  拼接字符串
     * 3.1 点容器内容需要动态生成
     * 3.2 图片容器内容需要动态生成
     * 4.渲染到页面当中    html追加
     *
     * 5.测试能否响应 两种设备      监听页面尺寸改变重新渲染
     *
     * 6.移动端  手势切换功能     左滑 右滑
     * */


    /*获取需要操作的元素*/

    /*轮播图组件*/
    var $banner = $('.carousel');
    /*点容器*/
    var $point = $banner.find('.carousel-indicators');
    /*图片容器*/
    var $image = $banner.find('.carousel-inner');
    /*窗口对象*/
    var $window = $(window);


    /*1.模拟数据（从后台回去数据）   [{},{}]*/
    var data = [
        {
            pcSrc:'images/slide_01_2000x410.jpg',
            mSrc:'images/slide_01_640x340.jpg'
        },
        {
            pcSrc:'images/slide_02_2000x410.jpg',
            mSrc:'images/slide_02_640x340.jpg'
        },
        {
            pcSrc:'images/slide_03_2000x410.jpg',
            mSrc:'images/slide_03_640x340.jpg'
        },
        {
            pcSrc:'images/slide_04_2000x410.jpg',
            mSrc:'images/slide_04_640x340.jpg'
        }
    ]

    /*渲染操作*/
    var render = function(){
        /*2.判断当前设备          768px*/
        var isMobile = $window.width() < 768 ? true : false;
        /*3.根据当前设备把数据转换成html  拼接字符串*/
        /*3.1点容器内容需要动态生成*/
        var pointHtml = '';
        /*3.2图片容器内容需要动态生成*/
        var imageHtml = '';

        /*根据数据来拼接*/
        $.each(data,function(k,v){
            /*点内容的拼接*/
            pointHtml += '<li data-target="#carousel-example-generic" data-slide-to="'+k+'" '+(k==0?'class="active"':'')+'></li>\n';
            /*图片内容的拼接*/
            imageHtml += '<div class="item '+(k==0?'active':'')+'">';
            /*按需追加图片*/
            if(isMobile){
                imageHtml += '<a class="m_imageBox" href="#"><img src="'+v.mSrc+'" /></a>';
            }else{
                imageHtml += '<a class="pc_imageBox" href="#" style="background-image: url('+v.pcSrc+');"></a>';
            }
            imageHtml += '</div>';
        });
        /*4.渲染到页面当中    html追加*/
        $point.html(pointHtml);
        $image.html(imageHtml);
    }

    /*5.测试能否响应 两种设备      监听页面尺寸改变重新渲染*/
    $window.on('resize',function(){
        render();
    }).trigger('resize');
    /* trigger 主动触发  resize 事件  执行 render  页面渲染*/

    /*6.移动端  手势切换功能     左滑 右滑*/
    /*通过jquery可以绑定touch事件*/
    /*注意：在event对象当中没有触摸点集合*/
    /*注意：originalEvent当中才有触摸点集合*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $banner.on('touchstart',function(e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function(e){
        /*手势的条件*/
        /*
        * 1.滑动过的
        * 2.移动的距离超过50px 认为是手势
        * */
        if(isMove && Math.abs(distanceX) >= 50){
            /*满足*/
            if(distanceX > 0){
                /*右滑  上一张*/
                $banner.carousel('prev');
            }else{
                /*左滑  下一张*/
                $banner.carousel('next');
            }
        }
        /*重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
    })
};

var initTab = function(){
    /*
    * 1.把所有的页签在一行显示    设置父容器的宽度是所有子容器的宽度之和
    * 2.满足区域滚动的html结构要求   必须有大容器套着一个小容器
    * 3.实现滑动功能                使用区域滚动插件  iscroll
    * */

    /*父容器*/
    var tabs = $('.wjs_product .nav-tabs');
    /*所有的子容器*/
    var liList = tabs.find('li');


    /*1.把所有的页签在一行显示    设置父容器的宽度是所有子容器的宽度之和*/
    /*计算宽度之和*/
    var width = 0;

    $.each(liList,function(i,item){
        /*width 内容的宽度*/
        /*innerWidth 内容和内边距的宽度*/
        /*outerWidth 内容和内边距和边框的宽度*/
        /*outerWidth(true) 内容和内边距和边框和外边距的宽度*/

        width += $(item).outerWidth(true);
    });

    tabs.width(width);

    /*2.满足区域滚动的html结构要求   必须有大容器套着一个小容器*/
    /*3.实现滑动功能                使用区域滚动插件  iscroll*/
    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false
    });


}
