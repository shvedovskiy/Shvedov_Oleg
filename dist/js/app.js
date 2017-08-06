"use strict";!function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e){function i(){}function o(t,e,i){var o=t._eventable_registry;return e in o?o[e]:i?o[e]=[]:null}i.prototype._initEventable=function(){this._eventable_registry={}},i.prototype.on=function(t,e,i){return o(this,t,!0).push({handler:e,ctx:i}),this},i.prototype.off=function(t,e,i){var n=o(this,t);if(n)for(var r=0,s=n.length;r!==s;r++)if(n[r].handler===e&&n[r].ctx===i)return n.splice(r,1),this;return this},i.prototype.trigger=function(t,e){var i=o(this,t);if(i)for(var n=i.slice(),r=0,s=n.length;r!==s;r++)n[r].handler.call(n[r].ctx,e);return this},t.exports=i},function(t,e){function i(t,e){for(var i in e.prototype)t.prototype[i]=e.prototype[i];return t}t.exports=i},function(t,e,i){function o(){this._initEventable(),this.filter="all"}i(1)(o,i(0)),o.prototype.onChange=function(t,e){this.on("filterChanged",function(i){t.call(e,{filter:i})})},o.prototype.setFilter=function(t){return this.filter=t,this.trigger("filterChanged",t),this},o.prototype.getFilter=function(){return this.filter};var n=new o;t.exports=n},function(t,e,i){function o(t){this._initEventable(),this._root=t,this._input=t.querySelector(".js-todo-add_input"),this._selectAllBtn=t.querySelector(".js-todo-add_select-all"),this._input.addEventListener("keypress",this),this._selectAllBtn.addEventListener("click",this)}i(1)(o,i(0)),o.prototype._onSelectAll=function(){return this.trigger("selectAll")},o.prototype._onTodoAdd=function(){var t=this._input.value.trim();if(0!==t.length)return this._input.value="",this._input.blur(),this.trigger("todoCreate",{text:t})},o.prototype.getRoot=function(){return this._root},o.prototype.handleEvent=function(t){switch(t.type){case"click":this._onSelectAll();break;case"keypress":13===t.keyCode&&this._onTodoAdd()}},t.exports=o},function(t,e){function i(t){this._root=t,this._todosMain=t.querySelector(".js-todos-main")}i.prototype.updateInterfaceVisibility=function(t){return t?this._todosMain.classList.remove("__empty"):this._todosMain.classList.add("__empty"),this},i.prototype.getRoot=function(){return this._root},t.exports=i},function(t,e,i){function o(t){this._initEventable(),this._root=t,this._counter=t.querySelector(".js-left-counter"),this._clearCompletedBtn=t.querySelector(".js-todos-actions-bar_clear-completed"),this._filters=new s(t.querySelector(".js-todos-actions-bar_filters")),this._filters.on("filterSelect",this._onFilterSelected,this),this._clearCompletedBtn.addEventListener("click",this)}var n=i(1),r=i(0),s=i(9);n(o,r),o.prototype._onFilterSelected=function(t){return this.trigger("filterSelected",t)},o.prototype._onClearCompleted=function(){return this.trigger("clearCompleted")},o.prototype.setLeftTodosCount=function(t){return this._counter.innerHTML=t+"&nbsp;"+(1===t?"item":"items")+"&nbsp;left",this},o.prototype.manageClearCompletedVisibility=function(t){return t?this._clearCompletedBtn.classList.remove("__hide"):this._clearCompletedBtn.classList.add("__hide"),this},o.prototype.handleEvent=function(t){switch(t.type){case"click":this._onClearCompleted()}},t.exports=o},function(t,e,i){function o(t){this._initEventable(),this._root=t,this._items=[],this._left=0}var n=i(1),r=i(0),s=i(10),h=i(2);n(o,r),o.prototype.getTodosCount=function(){return this._items.length},o.prototype.addTodo=function(t){var e=new s(t);return this._items.push(e),e.on("todoChange",this._onTodoChange,this).render(this._root),this.filterShowedItems(),this},o.prototype.clearCompleted=function(){for(var t=0,e=this._items.length;t!==e;t++)this._items[t]._model.get("isReady")&&this._items[t].remove();return this},o.prototype._getItemById=function(t){for(var e=0,i=this._items.length;e!==i;e++)if(this._items[e]._model.get("id")===t)return this._items[e];return null},o.prototype._onTodoChange=function(){return this.filterShowedItems(h.getFilter()),this},o.prototype.remove=function(t){var e=this._getItemById(t.get("id"));if(e){e.off("todoChange",this._onTodoChange,this),e.remove();var i=this._items.indexOf(e);this._items.splice(i,1)}return this},o.prototype.selectAll=function(){return this._items.forEach(function(t){t.changeReady(!0)}),this},o.prototype.filterShowedItems=function(t){return t||(t=h.getFilter()),this._items.forEach(function(e){switch(t){case"all":e.visible(!0);break;case"completed":e.visible(e._model.get("isReady"));break;case"active":e.visible(!e._model.get("isReady"))}}),this},o.prototype.getRoot=function(){return this._root},t.exports=o},function(t,e,i){function o(t){this._initEventable(),this._itemIds=0,this._items_models=t||[],this._left=0}var n=i(1),r=i(0),s=i(11);n(o,r),o.prototype.getList=function(){return this._items_models},o.prototype.getLeftTodosCount=function(){return this._left},o.prototype.onChange=function(t,e){return this.on("todoAdd",t).on("todoRemoved",t).on("todoChange",t).on("modelReadyChange",function(i){i.get("isReady")&&0!==this._left?this._left-=1:this._left+=1,this.trigger("todoChange"),t.call(e)},this).on("modelRemove",function(i){this.remove(i.get("id")),this.trigger("todoChange"),t.call(e)},this).on("modelChange",function(){this.trigger("todoChange"),t.call(e)},this),this},o.prototype.add=function(t){var e=new s(Object.assign({id:this._itemIds++},t));return e.onAnyChange(function(t){switch(t.field){case"text":this.trigger("modelTextChange",e);break;case"isReady":this.trigger("modelReadyChange",e);break;case"deleted":this.trigger("modelRemove",e);break;default:this.trigger("modelChange",e)}},this),e.get("isReady")||(this._left+=1),this._items_models.push(e),this.trigger("todoAdd",e),this},o.prototype._getModelById=function(t){for(var e=0,i=this._items_models.length;e!==i;e++)if(this._items_models[e].get("id")===t)return this._items_models[e];return null},o.prototype.remove=function(t){var e=this._getModelById(t);if(e){e.get("isReady")||(this._left-=1),this.trigger("todoRemove",e),e.off("modelFieldChange",this);var i=this.getList().indexOf(e);this.getList().splice(i,1),this.trigger("todoRemoved")}return this},o.prototype.clearCompleted=function(){return this.getList().slice().forEach(function(t){t.get("isReady")&&this.remove(t.get("id"))},this),this},t.exports=o},function(t,e,i){function o(){var t=new n([]),e=document.querySelector(".main-wrapper"),i=new r(e),o=new s(e.querySelector(".todo-add")),d=new h(e.querySelector(".js-todos-list")),c=new l(e.querySelector(".todos-actions-bar"));a.onChange(function(t){d.filterShowedItems(t.filter)}),t.onChange(function(){0!==t.getList().length?i.updateInterfaceVisibility(!0):i.updateInterfaceVisibility(!1);var e=t.getLeftTodosCount();c.setLeftTodosCount(e),t.getList().length-e>0?c.manageClearCompletedVisibility(!0):c.manageClearCompletedVisibility(!1)}),o.on("todoCreate",function(e){t.add(e)}).on("selectAll",function(){t.getList().forEach(function(t){t.set("isReady",!0)})}),t.on("todoAdd",function(t){d.addTodo(t)}).on("todoRemove",function(t){d.remove(t)}).on("todoChange",function(){d.filterShowedItems()}),c.on("clearCompleted",function(){t.clearCompleted()}).on("filterSelected",function(t){a.setFilter(t)})}document.addEventListener("DOMContentLoaded",o);var n=i(7),r=i(4),s=i(3),h=i(6),l=i(5),a=i(2)},function(t,e,i){function o(t){this._initEventable(),this._filters=t.querySelectorAll(".filter"),this._activeFilter=null;for(var e=0,i=this._filters.length;e<i;e++)this._filters[e].addEventListener("click",this),this._filters[e].classList.contains("__active")&&(this._activeFilter=this._filters[e])}i(1)(o,i(0)),o.prototype._onSetFilter=function(t){return this._activeFilter!==t&&(this._activeFilter.classList.remove("__active"),t.classList.add("__active"),this._activeFilter=t,this.trigger("filterSelect",t.dataset.filter)),this},o.prototype.handleEvent=function(t){switch(t.type){case"click":this._onSetFilter(t.target)}},t.exports=o},function(t,e,i){function o(t){this._initEventable();var e=s.todoItem({text:t.get("text")});this._root=e.root,this._readyMark=e.readyMark,this._remove=e.remove,this._text=e.text,this._model=t,this._model.onChange("isReady",function(t){this._manageReadyModificator(t.value)},this),this._readyMark.addEventListener("change",this),this._remove.addEventListener("click",this),this._text.addEventListener("blur",this)}var n=i(1),r=i(0),s=i(12);n(o,r),o.prototype.render=function(t){return t.appendChild(this._root),this},o.prototype._onSetText=function(t){return this._model.get("text")!==t&&(this._text.innerText=t,this._model.set("text",t)),this},o.prototype._manageReadyModificator=function(t){return t?this._root.classList.add("__ready"):this._root.classList.remove("__ready"),this._readyMark.checked=t,this},o.prototype.changeReady=function(t){return t!==this._model.get("isReady")&&(this._model.set("isReady",t),this._manageReadyModificator(t),this.trigger("todoChange",this._model)),this},o.prototype._onRemove=function(){this._model.set("deleted",!0)},o.prototype.remove=function(){return this._root.parentNode.removeChild(this._root),this},o.prototype.visible=function(t){return t?this._root.classList.remove("__hide"):this._root.classList.add("__hide"),this},o.prototype.handleEvent=function(t){switch(t.type){case"change":this.changeReady(this._readyMark.checked);break;case"click":t.target===this._remove&&this._onRemove();break;case"blur":this._onSetText(this._text.innerText)}},t.exports=o},function(t,e,i){function o(t){this._initEventable(),this._model={id:t.id,isReady:t.isReady||!1,text:t.text}}i(1)(o,i(0)),o.prototype.set=function(t,e){return this._model[t]=e,this.trigger("modelFieldChange",{field:t,value:e}),this},o.prototype.get=function(t){return this._model[t]},o.prototype.onChange=function(t,e,i){return this.on("modelFieldChange",function(o){o.field===t&&e.call(i,o)},this),this},o.prototype.onAnyChange=function(t,e){return this.on("modelFieldChange",function(i){t.call(e,i),this.trigger("modelChange",this)},this),this},t.exports=o},function(t,e){function i(t){var e=document.getElementById(t);o.innerHTML=e.innerHTML;var i=o.children[0];return o.removeChild(i),i}var o=document.createElement("div"),n={todoItem:function(t){var e=i("todoItemTemplate"),o=e.querySelector(".js-todo-item_ready-mark"),n=e.querySelector(".js-todo-item_remove"),r=e.querySelector(".js-todo-item_text");return t.text&&(r.innerText=t.text),t.isReady&&(o.checked=!0),{root:e,text:r,readyMark:o,remove:n}}};t.exports=n}]);