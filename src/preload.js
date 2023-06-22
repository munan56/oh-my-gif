// const { contextBridge } = require('electron')
// const ffmpegPath = require('ffmpeg-static');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');
// const filePath = require('path');

// ffmpeg.setFfmpegPath(ffmpegPath);

// console.log("preload ", ffmpegPath)
// console.log("preload ", ffmpeg)
// console.log("preload ", ffmpeg('/Users/munan/Desktop/auto.mp4').outputOptions([]))


// contextBridge.exposeInMainWorld('ffmpeg', {
//   ffmpegPath: () => ffmpegPath,
//   ffmpeg:() => ffmpeg,
//   fs:()=> fs,
//   filePath:()=>filePath
// })