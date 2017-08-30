var zines = [
  {
      edition: "Paper Arcade 0 (July 2017)",
      images: [
        "https://s-media-cache-ak0.pinimg.com/736x/c8/fb/12/c8fb124927e5285e82e7488d18cd5ebf.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/7/73/Neo-Geo-AES-Controller-FL.jpg",
        "https://i.ytimg.com/vi/3Sa2aDxvxJ8/maxresdefault.jpg",
        "https://cdn.tutsplus.com/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/4.jpg"
      ],
      captions: [
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/Pong'>Pong (1972)</a>",
        "",
        "",
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/Grim_Fandango'>Grim Fandango (1998)</a>"
      ]
    },
  {
      edition: "Paper Arcade 1 (October 2017)",
      images: [
        "https://s-media-cache-ak0.pinimg.com/originals/b7/85/20/b78520bc3889356de7229b2d218e6e0b.jpg",
        "https://s-media-cache-ak0.pinimg.com/236x/4a/9e/fd/4a9efde06981b4884c6bfe208101f152.jpg",
        "http://www.thegamerscouch.com/wp-content/uploads/2017/03/instruction_manual-01.jpg",
        "https://speckycdn-sdm.netdna-ssl.com/wp-content/uploads/2011/03/papercraft_08.jpg"
      ],
      captions: [
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/Space_Invaders'>Space Invaders (1978)</a>",
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/Tetris'>Tetris (1984)</a>",
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/Zelda'>Zelda (1986)</a>",
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/Game_Boy'>Game Boy (1989)</a>"
      ]
    },
  {
      edition: "Paper Arcade 20 (Arcaduary 2042)",
      images: [
        "https://creativemess.net/wp-content/uploads/2015/01/2001SpaceOdyssey1_zps98894788.jpg",
        "http://douglasadams.s3-website-eu-west-1.amazonaws.com/creations/infocom.gif",
        "http://www.metroid-database.com/m1/jp_metroid_guide_05.jpg",
        "http://img03.deviantart.net/2870/i/2009/181/1/7/vector_like_nes_game_by_juew.jpg"
      ],
      captions: [
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/2001:_A_Space_Odyssey_(film)'>2001: A Space Odyssey (1968)</a>",
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy_(video_game)'>H2G2 (1984)</a>",
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/Metroid'>Metroid (1986)</a>",
        "<a class='gallery-caption' href='https://en.wikipedia.org/wiki/Nintendo_Entertainment_System'>NES (1983)</a>"
      ]
    }
]

function getRandomSize(min, max)
{
  return Math.round(Math.random() * (max - min) + min);
}

function makeContent()
{
  var content = "";

  for (z in zines)
  {
    content += "<br />";
    content += makeHeading(zines[z].edition);
    content += "<br />";
    content += makeGallery(zines[z].images, zines[z].captions);
    content += "<hr />";
  }

  document.getElementById("content").innerHTML = content;
}

function makeHeading(edition)
{
  return "<div id='zine'>" + edition + "</div>";
}

function makeGallery(images, captions)
{
  var gallery = "<div id='gallery'>";

  for (var i in images)
  {
    gallery += "<img class='gallery-image' onclick='fillScreen(\"" + images[i] + "\")' src='" + images[i] + "'></img>";

    if (i < captions.length && captions[i] != "")
    {
      gallery += "<div class='gallery-caption'>" + captions[i] + "</div>";
    }
  }

  gallery += "</div>";

  return gallery;
}

function fillScreen(src)
{
  if (document.getElementById("fullscreen-background") != null)
  {
    document.getElementById("fullscreen-background").remove();
  }

  var fullScreenBackground = document.createElement('div');
  fullScreenBackground.setAttribute('id', 'fullscreen-background');
  fullScreenBackground.setAttribute('onclick', 'exitFullScreen()');

  var fullScreenImage = document.createElement('img');
  fullScreenImage.setAttribute('id', 'fullscreen-image');
  fullScreenImage.setAttribute('src', src);

  fullScreenBackground.appendChild(fullScreenImage);

  document.body.appendChild(fullScreenBackground);
}

function exitFullScreen()
{
  if (document.getElementById("fullscreen-background") != null)
  {
    document.getElementById("fullscreen-background").remove();
  }
}

function scrollToTop()
{
  var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

  if (currentScroll > 0)
  {
     window.requestAnimationFrame(scrollToTop);
     window.scrollTo(0, currentScroll - (currentScroll / 2));
   }
}

// a key map of allowed keys
var allowedKeys = {
37: 'left',
38: 'up',
39: 'right',
40: 'down',
65: 'a',
66: 'b'
};

// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
// get the value of the key code from the key map
var key = allowedKeys[e.keyCode];
// get the value of the required key from the konami code
var requiredKey = konamiCode[konamiCodePosition];

// compare the key with the required key
if (key == requiredKey) {

  // move to the next key in the konami code sequence
  konamiCodePosition++;

  // if the last key is reached, activate cheats
  if (konamiCodePosition == konamiCode.length)
    activateCheats();
} else
  konamiCodePosition = 0;
});

function activateCheats()
{
  var audio = new Audio("paperarcadezine.wav");
  audio.play();
  konamiCodePosition = 0;
}

function isMobile()
{
   return (/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) );
}
