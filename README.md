#可拖拽的弹出框

基于jquery和zepto，代码写得比较屎……

##用法
```
$('needPopupEle').initPopup();
```

##可传入的参数

* width
> 弹出框的宽度
* height
> 弹出窗的高度
* draggable
> 是否可以拖拽
* overlay
> 可以生成一个遮罩，黑色调的。
* opacity
> 可以控制遮罩的透明度
* closeBtn
> 设置关闭按钮
* triggerBtn
> 设置弹出的开关
* autoShow
> 在初始化后会直接弹出