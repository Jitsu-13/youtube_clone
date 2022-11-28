var key = "AIzaSyBd6rvC-ncSUxE60OIZgT5yZuy-THbp_iQ";
var url =  window.location.href;
 var videoId= "";
 for(var i=url.length-1; ;i--)
     {
         if(url[i] == "?")
             break;
         else
         videoId+=url[i];
     }
 videoId = videoId.split("").reverse().join("");
 var url = `https://www.youtube.com/embed/${videoId}`;
 console.log(url);
 var player = document.getElementById("video-player");
 player.setAttribute("src", url);

 url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${key}`;



 getVideoDetails()
 async function getVideoDetails()
 {
     var resp = await fetch(url);
     var videoData = await resp.json();
     showMoreData(videoData.items[0]);
 }

 function showMoreData(videoData)
 {
     console.log(videoData);
    if(videoData.snippet.tags != undefined)
    {
        document.getElementById("tags").textContent = `#${videoData.snippet.tags[0]} #${videoData.snippet.tags[1]} #${videoData.snippet.tags[2]} #${videoData.snippet.tags[3]}`;
    document.getElementById("video-title").textContent = videoData.snippet.title;
    }

    var date = new Date(videoData.snippet.publishedAt.substring(0,10));
    document.getElementById("views").innerHTML = videoData.statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" view &#8226; "+date.toDateString();

    document.getElementById("likes").textContent = videoData.statistics.likeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.getElementById("dislikes").textContent = videoData.statistics.dislikeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.getElementById("channel-title").textContent = videoData.snippet.channelTitle;
    document.getElementById("desc").textContent = videoData.snippet.description;

    document.getElementById("channel-logo").setAttribute("src", videoData.snippet.thumbnails.default.url);

    document.getElementById("comments").textContent = videoData.statistics.commentCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }


 var rightNav = document.querySelector(".right-nav");

        url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=20&key=${key}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
                makeSuggestionsVideoCard(data.items);
        })
        .catch(err => console.log(err));

const makeSuggestionsVideoCard = (data) => {
    for(x of data)
    {
        if(x.snippet != undefined)
        { 
            rightNav.innerHTML += `
    <div class="search-card" onclick="location.href = '../HTML/individual_video.html?${x.id.videoId}'">
        <div class="thumbnail-cont">
            <img src="${x.snippet.thumbnails.high.url}" class="thumbnail2" />
        </div>
        <div class="title-cont">
            <h2 class="title2">${x.snippet.title.substring(0,40)}...</h2>
                <p class = "channel-name">${x.snippet.channelTitle}</p>
        </div>
        </div>
    `;
        }
    }
   
}