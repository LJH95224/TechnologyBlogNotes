
# Rxjava结合Retrofit的使用教程

<!--more-->

#### 之前写过Retrofit的使用，现在介绍一下Rxjava和Retrofit结合使用。

* 添加依赖
  <pre>
    compile 'com.squareup.retrofit2:retrofit:2.3.0'
    compile 'com.squareup.retrofit2:converter-gson:2.3.0'
    compile 'com.squareup.retrofit2:adapter-rxjava:2.3.0'
    compile 'io.reactivex:rxandroid:1.2.1'
  </pre>
* 创建Retrofit实例
```java
        String url = "http://www.baidu.com/";
        Retrofit retrofit = new Retrofit.Builder()
        .baseUrl(url)
        .addConverterFactory(GsonConverterFactory.create())
        .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
        .build();
```
* 定义接口并通过Retrofit实例获取
```java
public interface RetrofitService {
    @GET("users/{user}/repos")
    Observable<List<Repo>> listRepos(@Path("user") String user);
}
```
* 获取RetrofitService代理并调用其接口方法
```java
        RetrofitService retrofitService = retrofit.create(RetrofitService.class);
        retrofitService.listRepos("user")
			.subscribeOn(Schedulers.io())
			.observeOn(AndroidSchedulers.mainThread())
			.subscribe(new Subscriber<List<Repo>>() {
            	@Override
            	public void onCompleted() {
                
            	}

            	@Override
            	public void onError(Throwable e) {

            	}

            	@Override
            	public void onNext(List<Repo> repos) {

            	}
        });
```
#### 是不是Rxjava与Retrofit结合就比较简单了呢。