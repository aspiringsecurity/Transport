# 如何更新并上传@bifrost-finance 包到 npm.js 网站上供下载

## 准备工作

如果 bifrost 项目里定义的类型有更新，则需要分别更新前端的类型定义文件和后端的 metadata 文件。

### 必要时，需升级 polkadot.js 版本，与后端版本同步。

## 包的上传操作

1. 在项目根目录下，输入命令行: yarn update-metadata 更新metadata。
2. 在项目根目录下，输入命令行：lerna version --skip-git ，创建新的版本编码。
3. 在项目根目录下，输入命令行：yarn build 。这个命令，把整个工程的 ts 文件生成可执行的 js 文件，放在各个包的 build 文件夹下。
4. 分别进入到 api、type-definitions、types 文件夹下的 build 文件夹内，输入命令 npm publish，输入前面 lerna 生成的版本号，并填入 npmjs 的密码，即可把新版本发布上去，供他人下载和使用。如：用 cd bifrost.js/packages/types/build，进入 types 下面的 build 文件夹，然后 yarn publish 进行发布。
