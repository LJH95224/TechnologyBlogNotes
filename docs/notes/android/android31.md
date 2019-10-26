# RecyclerView使用notifyItemRemoved遇到的问题

<!--more-->

#### 在使用RecyclerView过程中，我们需要删除单个item，这时候我们可能使用RecyclerView的notifyItemRemoved函数来删除对应位置的item。然而，调用这个函数后，由于该方法不会使position及其之后位置的itemView重新onBindViewHolder，重新刷新后面的数据会导致下标错乱。为此会产生一些bug。为此解决此问题我们就需要调用notifyItemRangeChanged(int positionStart, int itemCount) 函数从positionStart位置到itemCount数量的列表项进行数据刷新。这样就解决了position错乱的问题。有关RecyclerView的Adapter的方法如下所示。

* notifyItemChanged(int position) 更新列表position位置上的数据可以调用
* notifyItemInserted(int position) 列表position位置添加一条数据时可以调用，伴有动画效果
* notifyItemRemoved(int position) 列表position位置移除一条数据时调用，伴有动画效果
* notifyItemMoved(int fromPosition, int toPosition) 列表fromPosition位置的数据移到toPosition位置时调用，伴有动画效果
* notifyItemRangeChanged(int positionStart, int itemCount) 列表从positionStart位置到itemCount数量的列表项进行数据刷新
* notifyItemRangeInserted(int positionStart, int itemCount) 列表从positionStart位置到itemCount数量的列表项批量添加数据时调用，伴有动画效果
* notifyItemRangeRemoved(int positionStart, int itemCount) 列表从positionStart位置到itemCount数量的列表项批量删除数据时调用，伴有动画效果