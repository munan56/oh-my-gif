
const renderfs = require('fs');
const renderPath = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static')
  .replace(
    'app.asar',
    'app.asar.unpacked'
  );
ffmpeg.setFfmpegPath(ffmpegPath)
console.log(ffmpeg)

/**
 * 拖拽
 * @param {} event 
 */
function handleInputDragover(event){
  event.preventDefault();
}

/**
 * 拖拽
 * @param {} event 
 * @param {*} input 
 */
function handleInputDrop(event, input){
  event.preventDefault();
  const fileList = event.dataTransfer.files;
  input.value = fileList[0].path;
  console.log(fileList[0].path);
}





const convertBtn = document.getElementById('convert-btn');
const videoInput = document.getElementById('videoPath');
const gifInput = document.getElementById('gifPath');
convertBtn.addEventListener('click', handleButtonClick);
videoInput.addEventListener('dragover', handleInputDragover);
videoInput.addEventListener('drop', (event)=>{
  handleInputDrop(event, videoInput);
});
gifInput.addEventListener('dragover', handleInputDragover);
gifInput.addEventListener('drop', (event)=>{
  handleInputDrop(event, gifInput);
});



      




function handleButtonClick() {
  const videoPath = document.getElementById('videoPath').value;
  const gifPath = document.getElementById('gifPath').value;
  const meimiaozhenshu = document.getElementById('meimiaozhenshu').value;
  const xiangsudaxiao = document.getElementById('xiangsudaxiao').value;

  // 在这里执行您希望执行的操作
  console.log(videoPath, gifPath, meimiaozhenshu, xiangsudaxiao);
  // convertVideoToGif(videoPath, gifPath, meimiaozhenshu, xiangsudaxiao);
  if (!renderfs.existsSync(gifPath)) {
    renderfs.mkdirSync(gifPath, { recursive: true });
  }

  const outputFileName = renderPath.basename(videoPath, renderPath.extname(videoPath)) + '.gif';
  const outputPath = renderPath.join(gifPath, outputFileName);

  convertToGif(videoPath, meimiaozhenshu, xiangsudaxiao, outputPath)
    .then(() => {
      console.log('Video converted successfully!');
      success();
    })
    .catch((err) => {
      console.error('An error occurred:', err);
      fail();
    });

}




function start() {
  const alertBox = document.createElement('div');
  alertBox.classList.add('alert', 'alert-success');
  alertBox.textContent = '开始转换';
  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove();
  }, 200);
}







function convertToGif(videoUrl, frameRate, pixelSize, outputFileName) {
  return new Promise((resolve, reject) => {
    const outputStream = renderfs.createWriteStream(outputFileName);
    const ffmpegCommand = ffmpeg(videoUrl)
      .fps(frameRate)
      .size(pixelSize)
      .output(outputStream)
      .outputFormat('gif')
      .on('start', (commond) => {
        console.log("ffmpeg commond is ", commond)
        start();
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
    ffmpegCommand.run();
  });

}

function success() {
  const alertBox = document.createElement('div');
  alertBox.classList.add('alert', 'alert-success');
  alertBox.textContent = '操作成功';
  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove();
  }, 1000);
}
function fail() {
  const alertBox = document.createElement('div');
  alertBox.classList.add('alert', 'alert-error');
  alertBox.textContent = '转换失败';
  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove();
  }, 500);
}