# Retrofit的使用
说到网络请求，不得不说Retrofit这个框架，可以说现在大部分App都使用Retrofit框架来进行网络请求。Retrofit要求请求的接口必须遵循restful规则。接下来讲解一下使用教程。
<!--more-->
### 使用教程
* 添加依赖
```xml
    compile 'com.squareup.retrofit2:retrofit:2.3.0'
    compile 'com.squareup.retrofit2:converter-gson:2.3.0'
```
其中第二个包引入Retrofit的gson解析库，用于解析响应数据，并把数据转为bean类。

* 创建Retrofit实例
```java
     String baseUrl = "http://www.baidu.com/";
     Retrofit retrofit = new Retrofit.Builder()
             .baseUrl(baseUrl)
             //增加返回值为Gson的支持(以实体类返回)
             .addConverterFactory(GsonConverterFactory.create())
             .build();
```
其中addConverterFactory是通过GsonConverterFactory为Retrofit添加Gson支持。

* 定义接口并通过Retrofit实例获取
```java
public interface RetrofitService {
  @GET("users/{user}/repos")
  Call<List<Repo>> listRepos(@Path("user") String user);
}
```
通过Retrofit的create方法来创建一个RetrofitService的代理对象，然后通过代理对象调用其中的方法。一般情况下，Call的泛型为ResponseBody，但是增加了Gson支持后，Retrofit将ResponseBody转为我们想要的类型，像List<Repo>。
```java 
RetrofitService service = retrofit.create(RetrofitService.class);
```
* 接口调用
```java
Call<List<Repo>> repos = service.listRepos("octocat");
repos.enqueue(new Callback<List<Repo>>() {
            @Override
            public void onResponse(Call<List<Repo>> call, Response<List<Repo>> response) {
                //请求成功时
            }

            @Override
            public void onFailure(Call<List<Repo>> call, Throwable t) {
				//请求失败时
            }
        });
```
这样一个请求就完成。
### 在接口定义时，通过@GET注解来定义url，接下来说说Retrofit的相关注解。

1. Http请求方法
![](http://ww4.sinaimg.cn/large/006HJ39wgy1fg75c6y5syj30el09m74p.jpg)
2. 标记类
![](http://ww2.sinaimg.cn/large/006HJ39wgy1fg75eo0aj3j30ij095dgq.jpg)
3. 参数类
![](http://ww1.sinaimg.cn/large/006HJ39wgy1fg75iymigij30jj0d6jub.jpg)

### Retrofit中Url的组合规则
* 如果你在注解中提供的url是完整的url，则url将作为请求的url。
* 如果你在注解中提供的url是不完整的url，且不以 / 开头，则请求的url为baseUrl+注解中提供的值
* 如果你在注解中提供的url是不完整的url，且以 / 开头，则请求的url为baseUrl的主机部分+注解中提供的值
### 参考地址Retrofit官网： http://square.github.io/retrofit/