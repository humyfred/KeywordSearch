## KeywordSearch
基于Jquery开发的搜索展示插件

## 效果

## API
```html
    <script>

       $(function(){
            new KeywordSearch({
              url:'/supply/index',
              keyword: 'kw',
              id : '#keywordSearch',
              loadType:'get',
              data : function(res){
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
              error : function(res){
                alert('接口出错');
              }
            })
        });

   </script>
```   

## License
This content is released under the MIT License.


