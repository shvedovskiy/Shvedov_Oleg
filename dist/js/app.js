"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var o={};e.m=t,e.c=o,e.i=function(t){return t},e.d=function(t,o,i){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=9)}([function(t,e){function o(){}function i(t,e,o){var i=t._eventable_registry;return e in i?i[e]:o?i[e]=[]:null}o.prototype._initEventable=function(){this._eventable_registry={}},o.prototype.on=function(t,e,o){return i(this,t,!0).push({handler:e,ctx:o}),this},o.prototype.off=function(t,e,o){var n=i(this,t);if(n)for(var r=0,s=n.length;r!==s;r++)if(n[r].handler===e&&n[r].ctx===o)return n.splice(r,1),this;return this},o.prototype.trigger=function(t,e){var o=i(this,t);if(o)for(var n=o.slice(),r=0,s=n.length;r!==s;r++)n[r].handler.call(n[r].ctx,e);return this},t.exports=o},function(t,e){function o(t,e){for(var o in e.prototype)t.prototype[o]=e.prototype[o];return t}t.exports=o},function(t,e,o){function i(){this._initEventable(),this.filter="all"}o(1)(i,o(0)),i.prototype.onChange=function(t,e){this.on("filterChanged",function(o){t.call(e,{filter:o})})},i.prototype.setFilter=function(t){return this.filter=t,this.trigger("filterChanged",t),this},i.prototype.getFilter=function(){return this.filter};var n=new i;t.exports=n},function(t,e,o){function i(t){this._initEventable(),this._root=t,this._input=t.querySelector(".js-todo-add_input"),this._selectAllBtn=t.querySelector(".js-todo-add_select-all"),this._input.addEventListener("keypress",this),this._selectAllBtn.addEventListener("click",this)}o(1)(i,o(0)),i.prototype._onSelectAll=function(){return this.trigger("selectAll")},i.prototype._onTodoAdd=function(){var t=this._input.value.trim();if(0!==t.length)return this._input.value="",this._input.blur(),this.trigger("todoCreate",{text:t})},i.prototype.getRoot=function(){return this._root},i.prototype.handleEvent=function(t){switch(t.type){case"click":this._onSelectAll();break;case"keypress":13===t.keyCode&&this._onTodoAdd()}},t.exports=i},function(t,e){function o(t){this._root=t,this._todosMain=t.querySelector(".js-todos-main")}o.prototype.updateInterfaceVisibility=function(t){return t?this._todosMain.classList.remove("__empty"):this._todosMain.classList.add("__empty"),this},o.prototype.getRoot=function(){return this._root},t.exports=o},function(t,e,o){function i(t){this._initEventable(),this._root=t,this._counter=t.querySelector(".js-left-counter"),this._clearCompletedBtn=t.querySelector(".js-todos-actions-bar_clear-completed"),this._filters=new s(t.querySelector(".js-todos-actions-bar_filters")),this._filters.on("filterSelect",this._onFilterSelected,this),this._clearCompletedBtn.addEventListener("click",this)}var n=o(1),r=o(0),s=o(10);n(i,r),i.prototype._onFilterSelected=function(t){return this.trigger("filterSelected",t)},i.prototype._onClearCompleted=function(){return this.trigger("clearCompleted")},i.prototype.setLeftTodosCount=function(t){return this._counter.innerHTML=t+"&nbsp;"+(1===t?"item":"items")+"&nbsp;left",this},i.prototype.manageClearCompletedVisibility=function(t){return t?this._clearCompletedBtn.classList.remove("__hide"):this._clearCompletedBtn.classList.add("__hide"),this},i.prototype.handleEvent=function(t){switch(t.type){case"click":this._onClearCompleted()}},t.exports=i},function(t,e,o){function i(t){this._initEventable(),this._root=t,this._items=[],this._left=0}var n=o(1),r=o(0),s=o(11),l=o(2);n(i,r),i.prototype.getTodosCount=function(){return this._items.length},i.prototype.addTodo=function(t){var e=new s(t);return this._items.push(e),e.on("todoChange",this._onTodoChange,this).render(this._root),this.filterShowedItems(),this},i.prototype.clearCompleted=function(){for(var t=0,e=this._items.length;t!==e;t++)this._items[t]._model.get("isReady")&&this._items[t].remove();return this},i.prototype._getItemById=function(t){for(var e=0,o=this._items.length;e!==o;e++)if(this._items[e]._model.get("id")===t)return this._items[e];return null},i.prototype._onTodoChange=function(){return this.filterShowedItems(l.getFilter()),this},i.prototype.remove=function(t){var e=this._getItemById(t.get("id"));if(e){e.off("todoChange",this._onTodoChange,this),e.remove();var o=this._items.indexOf(e);this._items.splice(o,1)}return this},i.prototype.selectAll=function(){return this._items.forEach(function(t){t.changeReady(!0)}),this},i.prototype.filterShowedItems=function(t){return t||(t=l.getFilter()),this._items.forEach(function(e){switch(t){case"all":e.visible(!0);break;case"completed":e.visible(e._model.get("isReady"));break;case"active":e.visible(!e._model.get("isReady"))}}),this},i.prototype.getRoot=function(){return this._root},t.exports=i},function(t,e,o){function i(t){this._initEventable(),this._itemIds=0,this._items_models=t||[],this._left=0}var n=o(1),r=o(0),s=o(12);n(i,r),i.prototype.getList=function(){return this._items_models},i.prototype.getLeftTodosCount=function(){return this._left},i.prototype.onChange=function(t,e){return this.on("todoAdd",t).on("todoRemoved",t).on("todoChange",t).on("modelReadyChange",function(o){switch(o.get("isReady")){case!0:0!==this._left&&(this._left-=1);break;case!1:this._left+=1}this.trigger("todoChange"),t.call(e)},this).on("modelRemove",function(o){this.remove(o.get("id")),this.trigger("todoChange"),t.call(e)},this).on("modelChange",function(){this.trigger("todoChange"),t.call(e)},this),this},i.prototype.add=function(t){var e=new s(Object.assign({id:this._itemIds++},t));return e.onAnyChange(function(t){switch(t.field){case"text":this.trigger("modelTextChange",e);break;case"isReady":this.trigger("modelReadyChange",e);break;case"deleted":this.trigger("modelRemove",e);break;default:this.trigger("modelChange",e)}},this),e.get("isReady")||(this._left+=1),this._items_models.push(e),this.trigger("todoAdd",e),this},i.prototype._getModelById=function(t){for(var e=0,o=this._items_models.length;e!==o;e++)if(this._items_models[e].get("id")===t)return this._items_models[e];return null},i.prototype.remove=function(t){var e=this._getModelById(t);if(e){e.get("isReady")||(this._left-=1),this.trigger("todoRemove",e),e.off("modelFieldChange",this);var o=this.getList().indexOf(e);this.getList().splice(o,1),this.trigger("todoRemoved")}return this},i.prototype.clearCompleted=function(){return this.getList().slice().forEach(function(t){t.get("isReady")&&this.remove(t.get("id"))},this),this},t.exports=i},function(t,e){var o={},i=window.navigator.userAgent.toLowerCase(),n=function(t){return-1!==i.indexOf(t)};o.ios=function(){return o.iphone()||o.ipod()||o.ipad()},o.iphone=function(){return!o.windows()&&n("iphone")},o.ipod=function(){return n("ipod")},o.ipad=function(){return n("ipad")},o.android=function(){return!o.windows()&&n("android")},o.androidPhone=function(){return o.android()&&n("mobile")},o.androidTablet=function(){return o.android()&&!n("mobile")},o.blackberry=function(){return n("blackberry")||n("bb10")||n("rim")},o.blackberryPhone=function(){return o.blackberry()&&!n("tablet")},o.blackberryTablet=function(){return o.blackberry()&&n("tablet")},o.windows=function(){return n("windows")},o.windowsPhone=function(){return o.windows()&&n("phone")},o.windowsTablet=function(){return o.windows()&&n("touch")&&!o.windowsPhone()},o.fxos=function(){return(n("(mobile;")||n("(tablet;"))&&n("; rv:")},o.fxosPhone=function(){return o.fxos()&&n("mobile")},o.fxosTablet=function(){return o.fxos()&&n("tablet")},o.meego=function(){return n("meego")},o.cordova=function(){return window.cordova&&"file:"===location.protocol},o.nodeWebkit=function(){return"object"===_typeof(window.process)},o.mobile=function(){return o.androidPhone()||o.iphone()||o.ipod()||o.windowsPhone()||o.blackberryPhone()||o.fxosPhone()||o.meego()},o.tablet=function(){return o.ipad()||o.androidTablet()||o.blackberryTablet()||o.windowsTablet()||o.fxosTablet()},o.desktop=function(){return!o.tablet()&&!o.mobile()},t.exports=o},function(t,e,o){function i(){n.desktop()&&(document.body.className="hover");var t=new r([]),e=document.querySelector(".main-wrapper"),o=new s(e),i=new l(e.querySelector(".todo-add")),h=new a(e.querySelector(".js-todos-list")),u=new d(e.querySelector(".todos-actions-bar"));c.onChange(function(t){h.filterShowedItems(t.filter)}),t.onChange(function(){0!==t.getList().length?o.updateInterfaceVisibility(!0):o.updateInterfaceVisibility(!1);var e=t.getLeftTodosCount();u.setLeftTodosCount(e),t.getList().length-e>0?u.manageClearCompletedVisibility(!0):u.manageClearCompletedVisibility(!1)}),i.on("todoCreate",function(e){t.add(e)}).on("selectAll",function(){t.getList().forEach(function(t){t.set("isReady",!0)})}),t.on("todoAdd",function(t){h.addTodo(t)}).on("todoRemove",function(t){h.remove(t)}).on("todoChange",function(){h.filterShowedItems()}),u.on("clearCompleted",function(){t.clearCompleted()}).on("filterSelected",function(t){c.setFilter(t)})}document.addEventListener("DOMContentLoaded",i);var n=o(8),r=o(7),s=o(4),l=o(3),a=o(6),d=o(5),c=o(2)},function(t,e,o){function i(t){this._initEventable(),this._filters=t.querySelectorAll(".filter"),this._activeFilter=null;for(var e=0,o=this._filters.length;e<o;e++)this._filters[e].addEventListener("click",this),this._filters[e].classList.contains("__active")&&(this._activeFilter=this._filters[e])}o(1)(i,o(0)),i.prototype._onSetFilter=function(t){return this._activeFilter!==t&&(this._activeFilter.classList.remove("__active"),t.classList.add("__active"),this._activeFilter=t,this.trigger("filterSelect",t.dataset.filter)),this},i.prototype.handleEvent=function(t){switch(t.type){case"click":this._onSetFilter(t.target)}},t.exports=i},function(t,e,o){function i(t){this._initEventable();var e=s.todoItem({text:t.get("text")});this._root=e.root,this._readyMark=e.readyMark,this._remove=e.remove,this._text=e.text,this._model=t,this._model.onChange("isReady",function(t){this._manageReadyModificator(t.value)},this),this._readyMark.addEventListener("change",this),this._remove.addEventListener("click",this),this._text.addEventListener("blur",this)}var n=o(1),r=o(0),s=o(13);n(i,r),i.prototype.render=function(t){return t.appendChild(this._root),this},i.prototype._onSetText=function(t){return this._model.get("text")!==t&&(this._text.innerText=t,this._model.set("text",t)),this},i.prototype._manageReadyModificator=function(t){return t?this._root.classList.add("__ready"):this._root.classList.remove("__ready"),this._readyMark.checked=t,this},i.prototype.changeReady=function(t){return t!==this._model.get("isReady")&&(this._model.set("isReady",t),this._manageReadyModificator(t),this.trigger("todoChange",this._model)),this},i.prototype._onRemove=function(){this._model.set("deleted",!0)},i.prototype.remove=function(){return this._root.parentNode.removeChild(this._root),this},i.prototype.visible=function(t){return t?this._root.classList.remove("__hide"):this._root.classList.add("__hide"),this},i.prototype.handleEvent=function(t){switch(t.type){case"change":this.changeReady(this._readyMark.checked);break;case"click":t.target===this._remove&&this._onRemove();break;case"blur":this._onSetText(this._text.innerText)}},t.exports=i},function(t,e,o){function i(t){this._initEventable(),this._model={id:t.id,isReady:t.isReady||!1,text:t.text}}o(1)(i,o(0)),i.prototype.set=function(t,e){return this._model[t]=e,this.trigger("modelFieldChange",{field:t,value:e}),this},i.prototype.get=function(t){return this._model[t]},i.prototype.onChange=function(t,e,o){return this.on("modelFieldChange",function(i){i.field===t&&e.call(o,i)},this),this},i.prototype.onAnyChange=function(t,e){return this.on("modelFieldChange",function(o){t.call(e,o),this.trigger("modelChange",this)},this),this},t.exports=i},function(t,e){function o(t){var e=document.getElementById(t);i.innerHTML=e.innerHTML;var o=i.children[0];return i.removeChild(o),o}var i=document.createElement("div"),n={todoItem:function(t){var e=o("todoItemTemplate"),i=e.querySelector(".js-todo-item_ready-mark"),n=e.querySelector(".js-todo-item_remove"),r=e.querySelector(".js-todo-item_text");return t.text&&(r.innerText=t.text),t.isReady&&(i.checked=!0),{root:e,text:r,readyMark:i,remove:n}}};t.exports=n}]);