$(function () {
    if (!localStorage.getItem("goods")) {
        var noData = '<li style="line-height:80px;text-align:center;">购物车暂无数据</li>';
        $('.goodslist').append(noData);
    } else {
        var goodsArr = JSON.parse(localStorage.getItem('goods'));
        $.ajax({
            url: './data/goods.json',
            type: "get",
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, item) {
                    $.each(goodsArr, function (ind, ite) {
                        if (item.code == ite.code) {
                            let Dom = `<li>
                                        <img src="${item.imgurl}" alt="">
                                        <h5>${item.title}</h5>
                                        <p>${item.price}</p>
                                        <span>${ite.num}</span>
                                        <b code="${item.code}">删除</b>
                                    </li>`
                            $('.goodslist').append(Dom);
                        }
                    })
                })
            }
        })
        $(".goodslist").on("click","li b",function(){
            console.log(1111)
            $(this).parent().remove();
            var code = $(this).attr('code')
            $.each(goodsArr,function(index,item){
                if(item.code == code){
                    goodsArr.splice(index,1);
                    // return false;
                }
            })
            if (goodsArr.length > 0) {
                // 更新本地存储中的数据
                localStorage.setItem('goods',JSON.stringify(goodsArr));
            } else {
                localStorage.clear();
                var noData = '<li style="line-height:80px;text-align:center;">购物车暂无数据</li>';
                $('.goodslist').append(noData);
            }
        })
    }
})