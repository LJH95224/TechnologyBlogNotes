# VS Code的一些常用配置

## 配置vscode 支持 webpack 的 alias

 scode确实是比较好的编辑器
其中一个比较好的插件就是path autocomplete，但是这里有个问题，当通过webpack的alias引用的时候，path autocomplete是不起作用的。

```javascript
import sss from "@common/"
```

 需要在项目跟路径下配置一个jsconfig.json,让vscode能够识别出alias
废话不多说，
webpack配置 

```javascript
resolve: {
        alias: {
          "@actions": `${this.srcPathAbsolute}/actions/`,
          "@components": `${this.srcPathAbsolute}/components/`,
          "@commonComp": `${this.srcPathAbsolute}/components/common/`,
          "@common": `${this.srcPathAbsolute}/common/`
    }
}
```

 jsconfig.json的配置 

```json
{
  "compilerOptions": {
    "target": "es2017",
    "allowSyntheticDefaultImports": false,
    "baseUrl": "./",
    "paths": {
      "@actions/*": ["src/actions/*"],
      "@components/*": ["src/components/"],
      "@commonComp/*": ["src/components/common/"],
      "@common/*": ["src/common/*"]
    }
  },
  "exclude": ["node_modules", "dist"],
  "include": ["src"]
}
```

在vue.config.js中配置路径别名

```javascript
module.exports = {
    lintOnSave: false,
  // cordova 打包的时候 publicPath 必须要设置成 './'
  publicPath: "./",
  outputDir: "./www/",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components"));
  }
}
```

在根目录下创建 jsconfig.json 文件 配置如下

```json
{
  "compilerOptions": {
    "target": "es2017",
    "allowSyntheticDefaultImports": false,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "_c/*": ["src/components/*"],
    }
  },
  "exclude": ["node_modules", "dist"],
  "include": ["src"]
}
```

如果使用的是 TypeScript： 修改  typescript.json

```json

{
  "compilerOptions": {
      "baseUrl": "./",
      "allowJs": true,
      "paths": {
        "@/*": ["src/*"],
        "_c/*": ["src/components/*"],
      }
  },
  "exclude": ["node_modules", "dist"]

```



