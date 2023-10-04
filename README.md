# MusicPlayer
基于前端三剑客（HTML/CSS/JAVASCRIPT）实现的前端音乐播放器练手项目

## 项目介绍
本项目是作者基于前端三剑客（HTML/CSS/JAVASCRIPT）实现的前端音乐播放器。项目外观简洁大方，操作简单，界面优雅，动画流畅，适合作为前端初学者的练手项目

## 项目演示列表
![主页面](./preview/1.png "主页面")  
![音乐列表](./preview/2.png "音乐列表")

## 功能列表
- 音乐播放基本功能
- 上一曲/下一曲切换功能
- 音乐列表
- 背景随音乐专辑背景变化
- 音乐专辑转动
- 进度条（暂时未实现进度条拖拽功能）

## 项目配置
**推荐使用vscode中的`Live Server`插件来运行此项目**  
使用vscode打开此项目后，切换到`music.html`页面，点击右下角`Go Live`按钮进行运行  
按照正常音乐播放器使用即可

作者在`/music`目录下的`music.json`中预置了三首默认歌曲，可在`music.json`中自行进行添加（后期会考虑增加在线添加指定歌曲的功能）  

## 目录结构描述

    ├── ReadMe.md                       // 帮助文档
    ├── player.html                     // 主页面
    ├── res                             // 资源文件夹
    │   ├── css                         // 样式表文件夹
    │   │   ├── font-awesome-4.7.0      // font-awesome样式文件夹
    │   │   │   ├── ......              // 内容略
    │   │   ├── player.css              // 样式表
    │   ├── img                         // 图片文件夹
    │   │   ├── music.png               // 网页小图标
    │   ├── js                          // JavaScript文件夹
    │   │   ├── jquery-3.5.1.js         // jquery文件
    │   │   ├── player.js               // 页面逻辑js文件
    │   ├── music                       // 音乐文件夹
    │   │   ├── music.json              // 以json格式存储音乐外链列表信息
    │
    └───end             

## 更新摘要
###### v1.0.0
    1. 项目功能基本实现