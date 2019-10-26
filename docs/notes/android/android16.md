# Android文件存储

#### Android文件存储顾名思义就是将数据存储在文件中，它比较适合存储简单的文本数据和二进制数据。
## 将数据存储在文件中
```java
private void save(String data) {
        FileOutputStream out = null;
        BufferedWriter writer = null;
        try {
            out = openFileOutput("data", MODE_PRIVATE);
            writer = new BufferedWriter(new OutputStreamWriter(out));
            writer.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
```
#### 首先通过context的openFileOutput方法获取io流，该方法有两个参数，一个是文件名称，另一个是文件的操作模式，主要有两个模式可选择，一个是MODE_PRIVATE为默认的模式，表示当你写进文件时会直接覆盖文件内容。另一个模式是MODE_APPEND，表示当你写进文件时以追加的方式写入。然后你就可以通过io流的方式将数据写进文件中了。注意：文件名可以不写路径，因为Android默认将文件存储在/data/data/`<package name>`/files/下。
## 从文件中读取数据
```java
private String getData() {
        FileInputStream in = null;
        BufferedReader reader = null;
        StringBuilder content = new StringBuilder();
        try {
            in = openFileInput("data");
            reader = new BufferedReader(new InputStreamReader(in));
            String line = "";
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return content.toString();
    }
```
#### 跟写入文件一样，通过context的openFileInput方法得到FileInputStream，该方法只有一个参数是文件名，然后通过io流得到文件里的内容。效果如下：输入数据保存到文件中，然后从文件中获取你输入的数据。具体的请看我的Demo(https://github.com/codeteenager/FileStoreDemo);



