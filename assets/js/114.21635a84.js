(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{566:function(t,i,e){"use strict";e.r(i);var o=e(44),n=Object(o.a)({},(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"recyclerview使用notifyitemremoved遇到的问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#recyclerview使用notifyitemremoved遇到的问题"}},[t._v("#")]),t._v(" RecyclerView使用notifyItemRemoved遇到的问题")]),t._v(" "),e("h4",{attrs:{id:"在使用recyclerview过程中-我们需要删除单个item-这时候我们可能使用recyclerview的notifyitemremoved函数来删除对应位置的item。然而-调用这个函数后-由于该方法不会使position及其之后位置的itemview重新onbindviewholder-重新刷新后面的数据会导致下标错乱。为此会产生一些bug。为此解决此问题我们就需要调用notifyitemrangechanged-int-positionstart-int-itemcount-函数从positionstart位置到itemcount数量的列表项进行数据刷新。这样就解决了position错乱的问题。有关recyclerview的adapter的方法如下所示。"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#在使用recyclerview过程中-我们需要删除单个item-这时候我们可能使用recyclerview的notifyitemremoved函数来删除对应位置的item。然而-调用这个函数后-由于该方法不会使position及其之后位置的itemview重新onbindviewholder-重新刷新后面的数据会导致下标错乱。为此会产生一些bug。为此解决此问题我们就需要调用notifyitemrangechanged-int-positionstart-int-itemcount-函数从positionstart位置到itemcount数量的列表项进行数据刷新。这样就解决了position错乱的问题。有关recyclerview的adapter的方法如下所示。"}},[t._v("#")]),t._v(" 在使用RecyclerView过程中，我们需要删除单个item，这时候我们可能使用RecyclerView的notifyItemRemoved函数来删除对应位置的item。然而，调用这个函数后，由于该方法不会使position及其之后位置的itemView重新onBindViewHolder，重新刷新后面的数据会导致下标错乱。为此会产生一些bug。为此解决此问题我们就需要调用notifyItemRangeChanged(int positionStart, int itemCount) 函数从positionStart位置到itemCount数量的列表项进行数据刷新。这样就解决了position错乱的问题。有关RecyclerView的Adapter的方法如下所示。")]),t._v(" "),e("ul",[e("li",[t._v("notifyItemChanged(int position) 更新列表position位置上的数据可以调用")]),t._v(" "),e("li",[t._v("notifyItemInserted(int position) 列表position位置添加一条数据时可以调用，伴有动画效果")]),t._v(" "),e("li",[t._v("notifyItemRemoved(int position) 列表position位置移除一条数据时调用，伴有动画效果")]),t._v(" "),e("li",[t._v("notifyItemMoved(int fromPosition, int toPosition) 列表fromPosition位置的数据移到toPosition位置时调用，伴有动画效果")]),t._v(" "),e("li",[t._v("notifyItemRangeChanged(int positionStart, int itemCount) 列表从positionStart位置到itemCount数量的列表项进行数据刷新")]),t._v(" "),e("li",[t._v("notifyItemRangeInserted(int positionStart, int itemCount) 列表从positionStart位置到itemCount数量的列表项批量添加数据时调用，伴有动画效果")]),t._v(" "),e("li",[t._v("notifyItemRangeRemoved(int positionStart, int itemCount) 列表从positionStart位置到itemCount数量的列表项批量删除数据时调用，伴有动画效果")])])])}),[],!1,null,null,null);i.default=n.exports}}]);