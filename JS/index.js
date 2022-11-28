const videoCardContainer = document.querySelector('.home-page-container');
const searchVideoCard = document.getElementById("serach-video-container");


const api_key1 = "AIzaSyDjhd33iSAKyQX_ArnDprrQQp94_OYNnsk";
const api_key2 = "AIzaSyDjhd33iSAKyQX_ArnDprrQQp94_OYNnsk";
const api_key3 = "AIzaSyDjhd33iSAKyQX_ArnDprrQQp94_OYNnsk";
const api_key4 = "AIzaSyDjhd33iSAKyQX_ArnDprrQQp94_OYNnsk";

let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

const showData = () => {
    videoCardContainer.innerHTML = "";
    searchVideoCard.innerHTML = "";
    fetch(video_http + new URLSearchParams({
        key: api_key1,
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 50,
        regionCode: 'IN'
    }))
    .then(res => res.json())
    .then(data => {
        data.items.forEach(item =>   {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(err));
    
    const getChannelIcon = (video_data) => {
        fetch(channel_http + new URLSearchParams({
            key: api_key2,
            part: 'snippet',
            id: video_data.snippet.channelId
        }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
    }
}

showData();
// localStorage.setItem("", json.stringify(data))
function makeVideoCard(data) {
    // console.log("need : "+JSON.stringify(data));
    videoCardContainer.innerHTML += `
    <div class="video"  onclick="location.href = 'HTML/individual_video.html?${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// search bar

const searchBtn = document.querySelector('.search-btn');


searchBtn.addEventListener('click', () => {
    
const searchInput = document.getElementById('search').value;
    console.log(searchInput)
    if(searchInput.length)
    {
        url = `https://www.googleapis.com/youtube/v3/search?q=${searchInput}&key=${api_key3}&type=video&maxResults=30&part=snippet`;
        videoCardContainer.innerHTML="";
        searchVideoCard.innerHTML = "";
        fetch(url)
        .then(res => res.json())
        .then(data => {
            data.items.forEach(item =>   {
                getChannelIcon(item);
            })
        })
        .catch(err => console.log(err));
        
        const getChannelIcon = (video_data) => {
            fetch(channel_http + new URLSearchParams({
                key: api_key3,
                part: 'snippet',
                id: video_data.snippet.channelId
            }))
            .then(res => res.json())
            .then(data => {
                video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
                makeSearchVideoCard(video_data);
            })
        }
    }
})


const makeSearchVideoCard = (data) => {
    console.log(data);
    searchVideoCard.innerHTML += `
    <div class="search-card"  onclick="location.href = 'HTML/individual_video.html?${data.id.videoId}'">
        <div class="thumbnail-cont">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail2" />
        </div>
        <div>
            <h2 class="title2">${data.snippet.title}</h2>
            <div class="channelInfo">
                <img src="${data.channelThumbnail}" class="channel-icon"/>
                    &#183;
                <p class = "channel-name">${data.snippet.channelTitle}</p>
            </div>
            <p class="desc">${data.snippet.description.substring(0,200)}...</p>
        </div>
        </div>
    `;
}   
