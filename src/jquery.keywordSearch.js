(function(){
   /**
    strbuf
    @description : used for mounting data by tpl
    @params tpl
    @params data
   */
  !function(){function t(n){if(this.__data=[],n){var r,i=arguments;if(!(this instanceof t)){return r=new t,r.push.apply(r,i).toString()}this.push.apply(this,i)}}t.prototype={push:function(t,n,r){var i,o=arguments;return i=o.length<2?void 0===t?"":t:"object"==typeof n?t.replace(/\$\{([\w.]+)\}/g,function(t,i){for(var o=i.split("."),u=0,a=o.length,e=n;a>u;){try{e=e[o[u++]]}catch(s){e=t}}e=e||"";return void 0===e?r:e}):t.replace(/\{(\d+)\}/g,function(t,n){return o[+n+1]}),this.__data.push(i),this},pushArray:function(t,n,r){for(var i,o=0;o<n.length;o++){i=n[o],this.push(t,i,r)}},toString:function(t){return this.__data.join(void 0===t?"":t)}},window.strbuf=t}();

  var ksWrapTpl = '<div class="ks-wrap" id=${__uuid}>' +
                  '<div/>';

  var __uuid = 0;

  var ksItemTpl = '<div class="ks-item">' +
                      '<span class="ks-item-key">${itemName}</span>'
                  '<div/>';



  function noop(){}

  function KeywordSearch(options){
    if(!(this instanceof KeywordSearch)){
      throw 'please add "new" keyword';
    }
    this._id = options.id;
    this._url = options.url;
    this._loadType = options.loadType;
    this._keyword = options.keyword;
    this._data = options.data;
    this._error = options.error || noop;
    this._itemTpl = options.itemTpl || ksItemTpl;
    this.requestIdx = 0;
    this.init();
  }

  KeywordSearch.prototype = {
    construct : KeywordSearch,
    init : function(){
      this.target = $(this._id);
      this.targetHeight = this.target.outerHeight();
      if(this.target.length === 0){
        throw 'params inputed error';
      }
      this.targetOffset = this.target.offset();
      this.createKSWrap();
      this.eventController();
    },
    eventController : function(){
      this.bind(this.target, 'keyup', this.search.bind(this));
      this.bind(this.target, 'focus', this.focus.bind(this));
      this.bind(this.target, 'blur', this.blur.bind(this));
      this.bind(this._ksWrap, 'click', this.wrapClick.bind(this));
    },
    search : function(){
      var self = this;
      var params = {};
      params[this._keyword] = this.target.val();
      this.focus();
      this._ksWrap.html('<div class="ks-item text-center">加载中...</div>');
      $.ajax({
        url: this._url,
        type: this._loadType,
        data: params,
        dataType : 'json',
        success : function(res){
          try {
            self.mountData(self.processData(self._data, res));
          } catch (e) {
            error.call(self, e, res);
          }
        },
        error : function(res, textStatus){
          error.call(self, new Error(textStatus), res);
        }
      })
    },
    focus : function(){
      if(this.target.val())
        this._ksWrap.css({left:this.targetOffset.left, top:this.targetOffset.top + this.targetHeight}).show();
    },
    blur : function(){
      if(this._ksWrap.is(':active')||this._ksWrap.is(':focus')){
      }else{
        this._ksWrap.hide();
      }
    },
    processData : function(data, res){
      if(typeof data === 'function'){
        var result = data.call(this, res);
        if(result === false){
          return false;
        }else if(Object.prototype.toString.call(result) === '[object Array]'){
          return result;
        }else{
          throw 'the result of "data" param is illegal, should return Array or false';
        }
      }else {
        throw 'set wrong value of the "data" param';
      }
    },
    mountData : function(data){
      var key = 'itemName';
      if(typeof data === 'boolean'){
        this._ksWrap.html('<div class="ks-item text-center">搜不到结果</div>');
        return false;
      }
      this._cache = data;
      var $frag = $(document.createDocumentFragment());
      var self = this;
      data.forEach(function(d){
        $frag.append(strbuf(self._itemTpl, d));
      });
      this._ksWrap.html($frag);
    },
    createKSWrap : function(){
      this.__uuid = __uuid ++ ;
      this.__ksWrapId =  this.__uuid + 'ksWrap';

      $('body').append(strbuf(ksWrapTpl, {__uuid : this.__ksWrapId}));
      this._ksWrap = $('#' + this.__ksWrapId);

    },
    wrapClick : function(evt){
      var clickTarget = $(evt.target);
      if(clickTarget.attr('id') === this.__ksWrapId){//包裹元素
        return false;
      }
      var key_item = clickTarget.hasClass('ks-item-key')? clickTarget.text() : clickTarget.find('.ks-item-key').text();
      this.target.val(key_item);
      this._ksWrap.hide();
    },
    bind : function(target, event, fn){
      target.on(event, fn);
    },
  }

  if(typeof module === 'object' && typeof module.exports === 'object'){
    module.exports = KeywordSearch;
  }else {
    window.KeywordSearch = KeywordSearch;
  }
})();
