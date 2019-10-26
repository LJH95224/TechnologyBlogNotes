# Android网络请求详解
现在市场上的App大多是联网的，像QQ、微博等，没有网络就不能登录聊天了，可见网络在我们的生活中多么重要，那么在Android开发中如何使用网络功能呢？在这里简单介绍下有关网络的使用。
<!--more-->
## HTTP请求和响应
说到联网，不得不说HTTP请求，联网的作用就是App与服务端发起连接请求并传送数据，从而把数据从服务端传送到App上。接下来说一下Http请求包和响应包的结构。

### Http请求包：
一个Http请求包包括：请求行、请求头部、空行和请求数据四个部分组成。结构如图所示。

![](http://ww1.sinaimg.cn/large/006HJ39wgy1fg6syshi45j30cv04jq2v.jpg)

例如：
```java
	POST /meme.php/home/user/login HTTP/1.1 
    Host: 114.215.86.90
    Cache-Control: no-cache
    Postman-Token: bd243d6b-da03-902f-0a2c-8e9377f6f6ed
    Content-Type: application/x-www-form-urlencoded
    tel=13637829200&password=123456
```

### Http响应包：
当服务端收到请求后就会发出一个响应。Http响应由状态行、消息报头、空行和响应正文四个部分组成，如图所示。
![](http://ww4.sinaimg.cn/large/006HJ39wgy1fg6t5qkkapj30g907tac0.jpg)
Http请求方式如图所示：
![](http://ww3.sinaimg.cn/large/006HJ39wgy1fg6t8ecje9j30ha09ct97.jpg)
常见的请求就是Get和Post请求了。

## Get/Post请求
* Get请求一般是请求一个url，然后在url上以键值对的方式附带参数，也就是将参数放在请求行中。例如：
` http://xxxx.xx.com/xx.php?params1=value1&params2=value2 `
* Post请求一般是请求一个表单，将参数放在请求体中传递。例如上面Http请求包的例子中，请求体是`tel=13637829200&password=123456`，一般请求体需要编码后放上去。

## HttpClient/HttpURLConnection

Android中发送请求一般使用两个方式，HttpClient和HttpURLConnection。由于HttpClient的api数量过多、扩展困难，所以Android开发团队在Android6.0中已经废弃了HttpCient，所以现在学会使用HttpURLConnection就可以了。HttpURLConnection使用的流程：

* 使用你要访问的url地址，new 一个URL对象，根据URL的openConnection()方法获得HttpURLConnection类。
* 拿到HttpURLConnection实例后，设置其请求方法、连接超时和读取超时的毫秒数等服务器想得到的消息头。
* 通过HttpURLConnection的getOutputStream()方法获取服务器返回的输出流，向服务器写入数据。
* 通过HttpURLConnection的getInputStream()方法获取服务器返回的输入流，读取服务器返回的数据。
* 最后通过调用disconnect()方法，将连接关闭掉。

以上是HttpURLConnection使用的流程，代码如下所示：
```java

public class NetUtils {
        public static String post(String url, String content) {
            HttpURLConnection conn = null;
            try {
                // 创建一个URL对象
                URL mURL = new URL(url);
                // 调用URL的openConnection()方法,获取HttpURLConnection对象
                conn = (HttpURLConnection) mURL.openConnection();

                conn.setRequestMethod("POST");// 设置请求方法为post
                conn.setReadTimeout(5000);// 设置读取超时为5秒
                conn.setConnectTimeout(10000);// 设置连接网络超时为10秒
                conn.setDoOutput(true);// 设置此方法,允许向服务器输出内容

                // post请求的参数
                String data = content;
                // 获得一个输出流,向服务器写数据,默认情况下,系统不允许向服务器输出内容
                OutputStream out = conn.getOutputStream();// 获得一个输出流,向服务器写数据
                out.write(data.getBytes());
                out.flush();
                out.close();

                int responseCode = conn.getResponseCode();// 调用此方法就不必再使用conn.connect()方法
                if (responseCode == 200) {
                    InputStream is = conn.getInputStream();//获取服务器返回的输入流，使用此输入流进行读取操作
                    String response = getStringFromInputStream(is);
                    return response;
                } else {
                    throw new NetworkErrorException("响应码"+responseCode);
                }

            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (conn != null) {
                    conn.disconnect();// 关闭连接
                }
            }

            return null;
        }

        public static String get(String url) {
            HttpURLConnection conn = null;
            try {
                // 利用string url构建URL对象
                URL mURL = new URL(url);
                conn = (HttpURLConnection) mURL.openConnection();

                conn.setRequestMethod("GET");//设置请求方法为Get
                conn.setReadTimeout(5000);
                conn.setConnectTimeout(10000);

                int responseCode = conn.getResponseCode();
                if (responseCode == 200) {
                    InputStream is = conn.getInputStream();//获取服务端输入流。
                    String response = getStringFromInputStream(is);
                    return response;
                } else {
                    throw new NetworkErrorException("响应码"+responseCode);
                }

            } catch (Exception e) {
                e.printStackTrace();
            } finally {

                if (conn != null) {
                    conn.disconnect();
                }
            }

            return null;
        }

        private static String getStringFromInputStream(InputStream is)
                throws IOException {
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len = -1;
            while ((len = is.read(buffer)) != -1) {
                os.write(buffer, 0, len);
            }
            is.close();
            String state = os.toString();// 把流中的数据转换成字符串,采用的编码utf-8(模拟器默认编码)
            os.close();
            return state;
        }
    }

```
注意：使用网络请求时要加上访问网络的权限，`<uses-permission android:name="android.permission.INTERNET"/>`。
## 同步和异步
网络请求中常常会谈到异步请求，那么异步请求是什么呢？首先你需要知道同步请求是什么，同步跟异步请求一般是在多线程编程中使用的，大家都知道Android中有一个默认的主线程即UI线程，View的绘制只能在UI线程中操作，如果你阻塞了主线程（如耗时操作），那么UI绘制将会卡顿，所以我们要避免卡顿，而网络请求就是一个典型的耗时操作。同步请求就是在主线程中请求网络，需要等待网络请求完毕才可以继续执行，这样就会造成卡顿。而异步请求是在子线程中执行耗时操作，当执行完后使用Handler将更新UI的操作发送到主线程中执行，这样就不会造成卡顿。代码如下所示：

```java
public class AsynNetUtils {
        public interface Callback{
            void onResponse(String response);
        }

        public static void get(final String url, final Callback callback){
            final Handler handler = new Handler();
            new Thread(new Runnable() {
                @Override
                public void run() {
                    final String response = NetUtils.get(url);
                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            callback.onResponse(response);
                        }
                    });
                }
            }).start();
        }

        public static void post(final String url, final String content, final Callback callback){
            final Handler handler = new Handler();
            new Thread(new Runnable() {
                @Override
                public void run() {
                    final String response = NetUtils.post(url,content);
                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            callback.onResponse(response);
                        }
                    });
                }
            }).start();
        }
    }

```
通过使用回调的方式来执行更新UI的操作，调用示例如下代码：
```java
AsynNetUtils.get("http://www.baidu.com", new AsynNetUtils.Callback() {
            @Override
            public void onResponse(String response) {
                
            }
        });
```