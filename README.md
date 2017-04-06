## KeywordSearch
基于Jquery开发的搜索展示插件

## 效果

## API
```html
    <script>
    new KeywordSearch({
      url:'/supply/index', // 请求地址
      keyword: 'kw',      //     请求地址的key名
      id : '#keywordSearch', // 输入框id
      loadType:'get',        // 请求类型
      data : function(res){  // 模板数据，默认key为itemName
        if(res.code === 0){
          if(res.data.length <= 0){
            return false;
          }
          return res.data.map(function(d){
            return {
              itemName : d.supply_name
            }
          })
        }else{
          alert(res.message);
          return false;
        }
      },
      error : function(res){  // 出错处理
        alert('接口出错');
      }
    });
   </script>
```   

## License
This content is released under the MIT License.
