# okhttp的使用
现在开发App常用的网络框架有android-async-http、volley、okhttp、Retrofit，由于android-async-http和volley内部使用的是HttpClient，而Android 6.0对HttpClient已经放弃了，不再使用。所以现在一般使用的网络框架是okhttp和Retrofit。今天讲解一下okhttp的使用。
<!--more-->
## okhttp的使用
* 在使用之前需要加上对OkHttp的依赖
<pre>compile 'com.squareup.okhttp3:okhttp:3.8.0'</pre>
* 使用Okhttp的步骤如下：
 * 创建OkHttpClient实例
 <pre>OkHttpClient okHttpClient = new OkHttpClient();</pre>
 * 创建一个Request对象,使用构造者模式
 <pre>
Request.Builder builder = new Request.Builder();
Request request = builder.get().url("http://www.baidu.com").build();
</pre>
 * 将Request对象使用OkHttpClient封装成Call对象
 <pre>Call call = okHttpClient.newCall(request);
</pre>
 * 执行Call的方法
   * 异步操作，回调的方法在子线程
```java
call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                System.out.println(response.body().string());
            }
        });
```
	* 同步操作
	```java
			Response response = call.execute();
            String result = response.body().string();
```
#### 以上是OkHttp基于Get请求，Post请求需要Request.Builder调用post()方法，并将RequestBody对象传入即可。代码如下：
```java
        RequestBody requestBody = new FormBody.Builder().add("username", "username").build();
        Request request = builder.url("").post(requestBody).build();
```
上面这种方法是通过表单的形式发送Post请求，当然RequestBody提供了一些静态方法来传入像字符串、上传文件等。
![](http://ww2.sinaimg.cn/large/006HJ39wgy1fg8b7yevp1j30oi039aai.jpg)
例如字符串：
```java
RequestBody.create(MediaType.parse("text/plain;chaset=utf-8"), "{username:codeteenager}");
```
你只需注意第一个参数mime type即可。
#### 以上就是使用OkHttp的一个基本的流程，OkHttp官网： http://square.github.io/okhttp/