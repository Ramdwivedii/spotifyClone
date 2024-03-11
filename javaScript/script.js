// nav bar colour change //
document.addEventListener("scroll", myFunction);
function myFunction() {
    if(window.scrollY>60){
        document.getElementById("nav").style.backgroundColor = "black";
    }else if(window.scrollY<80){
        document.getElementById("nav").style.backgroundColor = "transparent";
    }
}

// wishing system //
const dev=document.querySelector('#dev')
var cur=new Date;
if(cur.getHours()>=12 && cur.getHours()<18){
    dev.innerHTML='Good Afternoon';
}
else if(cur.getHours()>=18 && cur.getHours()<21){
    dev.innerHTML='Good Evening';
}
else if(cur.getHours()>=21){
    dev.innerHTML='Good Night';
}
else{
    dev.innerHTML="Good Morning";
}

// songs //
let songindex=0;



const song=[
    {songname:'Srivalli',dir:'./music/Srivalli(PagalWorld.com.se).mp3',imgf:'./song thumnail/srivalli.jpg'},
    {songname:'Dhoka',dir:'./music/Arijit Singh - Dhokha(PagalWorld.com.se).mp3',imgf:'./song thumnail/arjit singh dhoka.jpg'},
    {songname:'Dil Galti Kar Baitha Hai',dir:'./music/Dil Galti Kar Baitha Hai(PagalWorld.com.se).mp3',imgf:'./song thumnail/dil galti kr.jpg'},
    {songname:'Galliyan Returns',dir:'./music/Galliyan Returns(PagalWorld.com.se).mp3',imgf:'./song thumnail/gakkiya.jpg'},
    {songname:'Har Har Shambhu Shiv Mahadeva',dir:'./music/Har Har Shambhu Shiv Mahadeva(PagalWorld.com.se).mp3',imgf:'./song thumnail/har har shanbhu.jpg'},
    {songname:'Kesariya',dir:'./music/Kesariya(PagalWorld.com.se).mp3',imgf:'./song thumnail/kesariya.jpg'},
    {songname:'Oh Antava Mava',dir:'./music/Oh Antava Mava(PagalWorld.com.se).mp3',imgf:'./song thumnail/oh antava mava.jpg'},
    {songname:'Paris Ka Trip',dir:'./music/Paris Ka Trip(PagalWorld.com.se).mp3',imgf:'./song thumnail/paris ka trip.jpg'}
]

let songs=Array.from(document.getElementsByClassName('play'));
songs.forEach((element,i)=>{
    element.addEventListener('click',(e)=>playPause(e.target,i));
})


// song list handler //
function makeallplay(){
    Array.from(document.getElementsByClassName('play')).forEach((element)=>{
        if(element.classList.contains('fa-circle-pause')){
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    });
    }

// music player //

let audio=new Audio(song[0].dir)
let progress=document.getElementById('progress');
let masterplay=document.querySelector('.pause');
let logo=document.getElementById('logo');
let text=document.getElementById('name');


masterplay.addEventListener("click",()=>{
    if(audio.paused || audio.currentTime===0){
        audio.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        let k=document.getElementById(String(songindex));
        logo.src=song[songindex].imgf;
        text.innerHTML=song[songindex].songname;
        k.classList.remove('fa-circle-play')
        k.classList.add('fa-circle-pause')
    }else{
        audio.pause();
        makeallplay();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
    }
});

// progress bar //
audio.addEventListener('timeupdate',()=>{
    let curr=((audio.currentTime/audio.duration)*100);
    progress.value=curr;
});

progress.addEventListener('change',()=>{
    let val=((progress.value * audio.duration)/100);
    audio.currentTime=val;
})



function playPause(k,n){
    if(k.classList.contains('fa-circle-pause')){
        audio.pause();
        k.classList.remove('fa-circle-pause');
        k.classList.add('fa-circle-play');
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        return
    }else{
        makeallplay(); 
        songindex=n; 

        audio.src=song[n].dir;
        audio.play();
        logo.src=song[songindex].imgf;
        text.innerHTML=song[songindex].songname;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        k.classList.remove('fa-circle-play');
        k.classList.add('fa-circle-pause');
    } 
}
// back button //
let prev=document.getElementById('prev')
let next=document.getElementById('next');
prev.addEventListener('click',()=>{
    if(songindex==0) songindex=8;
    let k=document.getElementById(String(--songindex));
    playPause(k,songindex);
})
next.addEventListener('click',()=>{
    if(songindex==7) songindex=-1;
    let k=document.getElementById(String(++songindex));
    playPause(k,songindex);
})


