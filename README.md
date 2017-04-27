## KeywordSearch
基于Jquery开发的搜索展示插件

## 效果
![11.gif](https://github.com/humyfred/KeywordSearch/blob/master/screenshot/example.gif)

数据是通过mock平台渲染，会出现对不上现象，请见谅！

效果链接：https://humyfred.github.io/KeywordSearch/index.html

## API
```html
    <script>
    new KeywordSearch({
      url:'/supply/index', // 请求地址
      keyword: 'kw',      //     搜索的键值
      id : '#keywordSearch', // 输入框id
      loadType:'get',        // 请求地址的方式（get、post、put、delete...）
      data : function(res){  // 模板数据，展示列表的数据，默认key为itemName
        if(res.code === 0){
          if(res.data.length <= 0){
            return false;
          }
          return res.data.map(function(d){//得到数据返回itemName值，能渲染在模板上
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
## 其他高级用法例子


## License
This content is released under the MIT License.
