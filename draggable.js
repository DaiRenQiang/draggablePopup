$.fn.initPopup = function(options) {

    //设定
    var settings = $.extend({
        width: 300,
        height: 100,
        draggable: true,
        overlay: true,
        opacity: 0.3,
        closeBtn: null,
        triggerBtn: null,
        autoShow: true
    }, options);

    //将当前的弹出窗元素保存在popEle变量中
    var popEle = this;

    //获取可视窗口的高宽，定位弹出窗元素
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;

    var leftMargin = (windowWidth - settings.width) / 2;
    var topMargin = (windowHeight - settings.height) / 2;

    this.css({
        position: 'fixed',
        width: settings.width + 'px',
        height: settings.height + 'px',
        left: leftMargin + 'px',
        top: topMargin + 'px',
        display: 'none',
        zIndex: 101
    });

    //使用HTML5的新特性实现可拖拽
    if (settings.draggable === true) {

        var startLeft, startTop;
        var currX = parseInt(popEle.css('left'));
        var currY = parseInt(popEle.css('top'));

        this.attr('draggable', 'true')
            .css({
                cursor: 'move'
            })
            .on('dragstart', function(event) {

                if (event.clientX) {
                    startLeft = event.clientX;
                    startTop = event.clientY;
                } else {
                    startLeft = event.originalEvent.clientX;
                    startTop = event.originalEvent.clientY;
                }

            })
            .on('dragend', function() {
                currX = parseInt(popEle.css('left'));
                currY = parseInt(popEle.css('top'));
            });

        $('body').on('dragover', function(event) {

            if (event.clientX) {
                var movedX = startLeft - event.clientX;
                var movedY = startTop - event.clientY;
            } else {
                var movedX = startLeft - event.originalEvent.clientX;
                var movedY = startTop - event.originalEvent.clientY;
            }

            popEle.css({
                left: currX - movedX + 'px',
                top: currY - movedY + 'px'
            });
        })
    }

    //添加遮罩
    if (settings.overlay === true) {
        var mask = document.createElement('div');
        $(mask).css({
            width: '100%',
            height: '100%',
            position: 'fixed',
            backgroundColor: 'rgba(0,0,0,' + settings.opacity + ')',
            right: 0,
            top: 0,
            display: 'none',
            zIndex: 100
        }).addClass('overlay').on('click tap', function() {
            //默认绑定关闭事件
            $(this).hide();
            popEle.hide();
        });

        document.body.appendChild(mask);
    }

    //关闭按钮
    if (settings.closeBtn) {
        $(settings.closeBtn).on('click tap', function() {
            popEle.hide();
            $('.overlay').hide();
        })
    }

    if (settings.triggerBtn) {
        $(settings.triggerBtn).on('click tap', function() {
            popEle.show();
            $('.overlay').show();
        })
    }

    if (settings.autoShow === true) {
        popEle.show();
        $('.overlay').show();
    }

    return this;
};
