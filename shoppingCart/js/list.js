$.ajax({
    url:'./data/goods.json',
    type:"get",
    data:"type=3",
    dataType:"json",
    success:function(data){
        $.each(data,function(index,item){
            var $Dom = `<div class="goods">+
                    <img src="${item.imgurl}" alt="">
                    <p>${item.price}</p>
                    <h3>${item.title}</h3>
                    <div code="${item.code}">加入购物车</div>
            </div>`;
            $('.content').append($Dom);
        })
    }
})
$(".content").on("click",'.goods div',function(){
    if(localStorage.getItem('goods')){
        var goodsArr = JSON.parse(localStorage.getItem("goods"))
    }else{
        var goodsArr = []; 
    }
    var code = $(this).attr('code');
    var hasCode = false;
    $.each(goodsArr,function(index,item){
        if(item.code == code){
            hasCode = true;
            item.num++
        }
    })
    if(!hasCode){
        goodsArr.push({code:code,num:1});
    } 
    var strArr = JSON.stringify(goodsArr);
    localStorage.setItem("goods",strArr);
    alert('加入购物车成功');
    
    
})