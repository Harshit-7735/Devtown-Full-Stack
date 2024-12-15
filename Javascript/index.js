// console.log(navigator.geolocation.getCurrentPosition (function(position) {
//   console.log(position);
// }));

// navigator.clipboard.writeText('Hello, World!').then(function() {
//   console.log('Copied to clipboard!');
// }, function() {
//   console.error('Unable to write to clipboard. :-(');
// });

/* 
const button = document.querySelector("button");
const handleClick = async () => {
  try {
    const res = await fetch("https://api.quotable.io/random");
    // const data = await res.json();
    // const quote = `${data.content} - ${data.author}`;
    // navigator.clipboard.writeText(quote);
    // console.log("Copied to clipboard!", quote);
    const {content} = await res.json();
    navigator.clipboard.writeText(content);
    console.log("Copied to clipboard!", content);
  } catch (err) {
    console.error("Failed to copy!", err);
  }
};
document.addEventListener('copy',()=>{
  navigator.clipboard.writeText("You can't copy this!");
})
button.addEventListener("click", handleClick);
*/
/*
navigator.mediaDevices.getUserMedia({video: true}).then(function(videoStream){ 
  console.log(videoStream);
  const video=document.querySelector("video");
  video.srcObject=videoStream;
  video.play();
})
navigator.mediaDevices.getUserMedia({audio: true}).then(function(audioStream){
  console.log(audioStream);
  const audio=document.querySelector("audio");
  audio.srcObject=audioStream;
  audio.play();
})
  */

navigator.mediaDevices.getDisplayMedia({video: true}).then(function(stream){
  console.log(stream);
  const video=document.querySelector("video");
  video.srcObject=stream
  video.play();
})