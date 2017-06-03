"use strict";!function(t){function e(o){if(i[o])return i[o].exports;var r=i[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=6)}([function(t,e){function i(){}function o(t,e,i){var o=t._eventable_registry;return e in o?o[e]:i?o[e]=[]:null}i.prototype._initEventable=function(){this._eventable_registry={}},i.prototype.on=function(t,e,i){return o(this,t,!0).push({handler:e,ctx:i}),this},i.prototype.off=function(t,e,i){var r=o(this,t);if(r)for(var n=r.length;n--;)if(r[n].handler===e&&r[n].ctx===i)return r.splice(n,1),this;return this},i.prototype.trigger=function(t,e){var i=o(this,t);if(i)for(var r=i.slice(),n=0,s=r.length;n!==s;n+=1)r[n].handler.call(r[n].ctx,e);return this},t.exports=i},function(t,e){function i(t,e){for(var i in e.prototype)t.prototype[i]=e.prototype[i];return t}t.exports=i},function(t,e,i){function o(){this._initEventable(),this._input=document.querySelector(".js-todo-add_input"),this._selectAllBtn=document.querySelector(".js-todo-add_select-all"),this._input.addEventListener("keypress",this),this._selectAllBtn.addEventListener("click",this)}i(1)(o,i(0)),o.prototype._onSelectAll=function(){return this.trigger("selectAll")},o.prototype._onTodoAdd=function(){var t=this._input.value.trim();if(0!==t.length)return this._input.value="",this._input.blur(),this.trigger("todoCreate",{text:t})},o.prototype.handleEvent=function(t){switch(t.type){case"click":this._onSelectAll();break;case"keypress":13===t.keyCode&&this._onTodoAdd()}},t.exports=o},function(t,e){function i(){this._todosMain=document.querySelector(".js-todos-main")}i.prototype.updateMarkers=function(t){return t?this._todosMain.classList.remove("__empty"):this._todosMain.classList.add("__empty"),this},t.exports=i},function(t,e,i){function o(){this._initEventable(),this._counter=document.querySelector(".js-left-counter"),this._filters=new s(document.querySelector(".js-todos-actions-bar_filters")),this._clearCompletedBtn=document.querySelector(".js-todos-actions-bar_clear-completed"),this._filters.on("filterSelected",this._onFilterSelected,this),this._clearCompletedBtn.addEventListener("click",this)}var r=i(1),n=i(0),s=i(7);r(o,n),o.prototype._onFilterSelected=function(t){return this.trigger("filterSelected",t)},o.prototype._onClearCompleted=function(){return this.trigger("clearCompleted")},o.prototype.setLeftTodosCount=function(t){return this._counter.innerHTML=t+"&nbsp;"+(1===t?"item":"items")+"&nbsp;left",this},o.prototype.manageClearCompletedVisibility=function(t){return t?this._clearCompletedBtn.classList.remove("__hide"):this._clearCompletedBtn.classList.add("__hide"),this},o.prototype.handleEvent=function(t){switch(t.type){case"click":this._onClearCompleted()}},t.exports=o},function(t,e,i){function o(){this._initEventable(),this._root=document.querySelector(".js-todos-list"),this._itemIds=0,this._items=[],this._left=0,this._filter="all"}var r=i(1),n=i(0),s=i(8);r(o,n),o.prototype.getTodosCount=function(){return this._items.length},o.prototype.getLeftTodosCount=function(){return this._left},o.prototype.createTodo=function(t){var e=new s(Object.assign({id:this._itemIds++},t));return e.model.isReady||(this._left+=1),this._items.push(e),e.on("todoChange",this._onTodoChange,this).on("todoRemove",this._onTodoRemove,this).render(this._root),this.trigger("todoAdd",e),this},o.prototype.clearCompleted=function(){for(var t=this._items.length;t--;)this._items[t].model.isReady&&this._items[t].remove();return this},o.prototype._getItemById=function(t){for(var e=this._items.length;e--;)if(this._items[e].model.id===t)return this._items[e];return null},o.prototype._onTodoChange=function(t){t.isReady?this._left-=1:this._left+=1,this.filterShowedItems(this._filter),this.trigger("todoChange",this)},o.prototype._onTodoRemove=function(t){var e=this._getItemById(t);if(e){e.model.isReady||(this._left-=1),e.off("todoChange",this._onItemChange,this).off("todoRemove",this._onItemRemove,this);var i=this._items.indexOf(e);this._items.splice(i,1),this.trigger("todoRemove",e.model)}return this},o.prototype.selectAll=function(){return this._items.forEach(function(t){t.changeReady(!0)}),this},o.prototype.setFilter=function(t){return t?(this._filter=t,this.filterShowedItems(t)):this.filterShowedItems(this._filter)},o.prototype.filterShowedItems=function(t){return this._items.forEach(function(e){switch(t){case"all":e.visible(!0);break;case"completed":e.model.isReady?e.visible(!0):e.visible(!1);break;case"active":e.model.isReady?e.visible(!1):e.visible(!0)}}),this},t.exports=o},function(t,e,i){function o(){function t(){var t=a.getTodosCount(),e=a.getLeftTodosCount();0!==t?i.updateMarkers(!0):i.updateMarkers(!1),c.setLeftTodosCount(e)}function e(){a.getTodosCount()-a.getLeftTodosCount()>0?c.manageClearCompletedVisibility(!0):c.manageClearCompletedVisibility(!1)}var i=new r,o=new n,a=new s,c=new l;o.on("todoCreate",function(t){a.createTodo(t)}).on("selectAll",function(){a.selectAll(),e()}),a.on("todoAdd",function(){t(),a.setFilter()}).on("todoRemove",function(){e(),t()}).on("todoChange",function(){e(),t()}),c.on("clearCompleted",function(){a.clearCompleted(),e()}).on("filterSelected",function(t){a.setFilter(t)})}document.addEventListener("DOMContentLoaded",o);var r=i(3),n=i(2),s=i(5),l=i(4)},function(t,e,i){function o(t){this._initEventable(),this._filters=t.querySelectorAll(".filter"),this._activeFilter=null;for(var e=0;e<this._filters.length;e++)this._filters[e].addEventListener("click",this),this._filters[e].classList.contains("__active")&&(this._activeFilter=this._filters[e])}i(1)(o,i(0)),o.prototype._onSetFilter=function(t){return this._activeFilter!==t&&(this._activeFilter.classList.remove("__active"),t.classList.add("__active"),this._activeFilter=t,this.trigger("filterSelected",t.dataset.filter)),this},o.prototype.handleEvent=function(t){switch(t.type){case"click":this._onSetFilter(t.target)}},t.exports=o},function(t,e,i){function o(t){this._initEventable();var e=s.todoItem({text:t.text});this._root=e.root,this._readyMark=e.readyMark,this._remove=e.remove,this._text=e.text,this.model={id:t.id,isReady:t.isReady||!1,text:t.text},t.isReady&&(this._manageReadyModificator(!0),this.trigger("todoChange",this.model)),this._readyMark.addEventListener("change",this),this._remove.addEventListener("click",this),this._text.addEventListener("blur",this)}var r=i(1),n=i(0),s=i(9);r(o,n),o.prototype.render=function(t){return t.appendChild(this._root),this},o.prototype._onSetText=function(t){return this.model.text!==t&&(this._text.innerText=t,this.model.text=t),this},o.prototype._manageReadyModificator=function(t){return t?this._root.classList.add("__ready"):this._root.classList.remove("__ready"),this},o.prototype.changeReady=function(t){return t!==this.model.isReady&&(this._readyMark.checked=t,this.model.isReady=t,this._manageReadyModificator(t),this.trigger("todoChange",this.model)),this},o.prototype.remove=function(){return this._root.parentNode.removeChild(this._root),this.trigger("todoRemove",this.model.id)},o.prototype.visible=function(t){t?this._root.classList.remove("__hide"):this._root.classList.add("__hide")},o.prototype.handleEvent=function(t){switch(t.type){case"change":this.changeReady(this._readyMark.checked);break;case"click":t.target===this._remove&&this.remove();break;case"blur":this._onSetText(this._text.innerText)}},t.exports=o},function(t,e){function i(t){var e=document.getElementById(t);o.innerHTML=e.innerHTML;var i=o.children[0];return o.removeChild(i),i}var o=document.createElement("div"),r={todoItem:function(t){var e=i("todoItemTemplate"),o=e.querySelector(".js-todo-item_ready-mark"),r=e.querySelector(".js-todo-item_remove"),n=e.querySelector(".js-todo-item_text");return t.text&&(n.innerText=t.text),t.isReady&&(o.checked=!0),{root:e,text:n,readyMark:o,remove:r}}};t.exports=r}]);