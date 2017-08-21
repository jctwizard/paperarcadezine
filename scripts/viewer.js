var fullscreenZine = null;

var collectionIndex = 0;
var zineIndex = 0;
var pageIndex = 0;
var pageCount = 0;

var turnTime = 0.5 * 1000;

function initViewer()
{
  viewGallery();
}

function viewGallery()
{
  var zineGallery = "";

  // newest first
  for (var collection = collections.collectionCount - 1; collection >= 0; collection--)
  {
    zineGallery += "<div class='gallery-collection-container'>";

    zineGallery += "<div class='gallery-collection-title'>" + collections[collection.toString()].name + "</div>";
    zineGallery += "<div class='gallery-collection-caption'>" + collections[collection.toString()].description + "</div>";
    zineGallery += "<div class='gallery-collection-date'>" + collections[collection.toString()].date + "</div>";

    for (var zine = 0; zine < collections[collection.toString()].zineCount; zine++)
    {
      zineGallery += "<div class='gallery-zine-container'>";
      zineGallery += "<div class='gallery-zine-title'>" + collections[collection.toString()].zines[zine.toString()].name + "</div>";
      zineGallery += "<div class='gallery-zine-caption'>" + collections[collection.toString()].zines[zine.toString()].description + "</div>";
      zineGallery += "<div class='gallery-zine-cover'>";

      var coverPath = "zines/" + collections[collection.toString()].path + "/zine" + zine.toString() + "/page0.png";

      zineGallery += "<img class='gallery-zine-cover-image' onclick='viewZine(" + collection.toString() + ", " + zine.toString() + ")' src='" + coverPath + "'></img>";
      zineGallery += "</div></div>";
    }

    zineGallery += "</div>";
  }

  document.getElementById("gallery").innerHTML = zineGallery;
}

function preloadImage(url)
{
    var img = new Image();
    img.src = url;
}

function viewZine(collection, zine)
{
    collectionIndex = collection;
    zineIndex = zine;
    pageIndex = 0;

    pageCount = collections[collectionIndex.toString()].zines[zineIndex.toString()].pageCount;

    for (var page = 0; page < pageCount; page++)
    {
      preloadImage("zines/" + collections[collectionIndex].path + "/zine" + zineIndex.toString() + "/page" + page.toString() + ".png");
    }

    if (fullscreenZine != null)
    {
      fullscreenZine.remove();
    }

    fullscreenZine = document.createElement('div');
    fullscreenZine.setAttribute('id', 'fullscreen-background');

    var fullscreenExitButton = document.createElement('div');
    fullscreenExitButton.setAttribute('id', 'fullscreen-exit-button');
    fullscreenExitButton.setAttribute('onclick', 'exitZine()');
    fullscreenZine.appendChild(fullscreenExitButton);

    var fullscreenHeader = document.createElement('div');
    fullscreenHeader.setAttribute('id', 'fullscreen-header');
    fullscreenZine.appendChild(fullscreenHeader);

    var title = document.createElement('div');
    title.setAttribute('id', 'fullscreen-title');
    title.innerHTML = collections[collectionIndex.toString()].zines[zineIndex.toString()].name;
    fullscreenHeader.appendChild(title);

    var description = document.createElement('div');
    description.setAttribute('id', 'fullscreen-description');
    description.innerHTML = collections[collectionIndex.toString()].zines[zineIndex.toString()].description;
    fullscreenHeader.appendChild(description);

    var pageDescription = document.createElement('div');
    pageDescription.setAttribute('id', 'fullscreen-page-description');
    pageDescription.innerHTML = collections[collectionIndex.toString()].zines[zineIndex.toString()].pageDescriptions["0"];
    fullscreenHeader.appendChild(pageDescription);

    var zineContainer = document.createElement('div');
    zineContainer.setAttribute('id', 'fullscreen-zine');
    fullscreenZine.appendChild(zineContainer);

    var zineCover = document.createElement('img');
    zineCover.setAttribute('id', 'fullscreen-zine-cover');
    zineCover.setAttribute('onclick', 'turnCover()');
    zineCover.setAttribute('src', "zines/" + collections[collectionIndex].path + "/zine" + zineIndex.toString() + "/page0.png");
    zineContainer.appendChild(zineCover);

    document.body.appendChild(fullscreenZine);
}

function exitZine()
{
  if (fullscreenZine != null)
  {
    fullscreenZine.remove();
    fullscreenZine = null;
  }
}

function turnCover()
{
    var zineContainer = document.getElementById("fullscreen-zine");

    var cover = document.getElementById("fullscreen-zine-cover");

    if (cover.classList.contains("turnToCover"))
    {
      cover.classList.remove("turnToCover");
      var coverClone = cover.cloneNode(true);
      zineContainer.appendChild(coverClone);
      cover.remove();
      cover = coverClone;
    }

    cover.classList.add("turnFromCover");
    setTimeout("removeById('fullscreen-zine-cover')", turnTime + 1500);

    if (pageCount > 1)
    {
      var zineLeftPage = document.createElement('img');
      zineLeftPage.setAttribute('id', 'fullscreen-zine-page-left');
      zineLeftPage.setAttribute('onclick', 'turnBackPage()');
      zineLeftPage.setAttribute('src', "zines/" + collections[collectionIndex].path + "/zine" + zineIndex.toString() + "/page1.png");
      zineLeftPage.classList.add("turnLeftFromCover");
      zineContainer.appendChild(zineLeftPage);
    }

    if (pageCount > 2)
    {
      var zineRightPage = document.createElement('img');
      zineRightPage.setAttribute('id', 'fullscreen-zine-page-right');
      zineRightPage.setAttribute('onclick', 'turnForwardPage()');
      zineRightPage.setAttribute('src', "zines/" + collections[collectionIndex].path + "/zine" + zineIndex.toString() + "/page2.png");
      zineRightPage.classList.add("turnRightFromCover");
      zineContainer.appendChild(zineRightPage);
    }

    pageIndex = 1;
}

function turnBackPage()
{
  var zineContainer = document.getElementById("fullscreen-zine");

  var pageLeft = document.getElementById("fullscreen-zine-page-left");

  if (pageLeft.classList.contains("turnToLeftPage"))
  {
    pageLeft.classList.remove("turnToLeftPage");
    var pageLeftClone = pageLeft.cloneNode(true);
    zineContainer.appendChild(pageLeftClone);
    pageLeft.remove();
    pageLeft = pageLeftClone;
  }

  pageLeft.classList.add("turnFromLeftPage");
  setTimeout("removeById('fullscreen-zine-page-left')", turnTime);

  if (pageIndex < (pageCount - 1))
  {
    setTimeout("removeById('fullscreen-zine-page-right')", turnTime * 2);
  }

  if (pageIndex == 1)
  {
      var zineCover = document.createElement('img');
      zineCover.setAttribute('id', 'fullscreen-zine-cover');
      zineCover.setAttribute('onclick', 'turnCover()');
      zineCover.setAttribute('src', "zines/" + collections[collectionIndex].path + "/zine" + zineIndex.toString() + "/page0.png");
      zineCover.classList.add("turnToCover");
      zineContainer.appendChild(zineCover);

      pageIndex = 0;
  }

  if (pageIndex > 1)
  {
    pageIndex -= 2;

    var zineLeftPage = document.createElement('img');
    zineLeftPage.setAttribute('id', 'fullscreen-zine-page-left');
    zineLeftPage.setAttribute('onclick', 'turnBackPage()');
    zineLeftPage.setAttribute('src', "zines/" + collections[collectionIndex].path + "/zine" + zineIndex.toString() + "/page" + pageIndex.toString() + ".png");
    zineContainer.appendChild(zineLeftPage);

    var zineRightPage = document.createElement('img');
    zineRightPage.setAttribute('id', 'fullscreen-zine-page-right');
    zineRightPage.setAttribute('onclick', 'turnForwardPage()');
    zineRightPage.setAttribute('src', "zines/" + collections[collectionIndex].path + "/zine" + zineIndex.toString() + "/page" + (pageIndex + 1).toString() + ".png");
    zineRightPage.classList.add("turnToRightPage");
    zineContainer.appendChild(zineRightPage);
  }
}

function turnForwardPage()
{
  if (pageIndex < (pageCount - 1))
  {
    var zineContainer = document.getElementById("fullscreen-zine");

    var pageRight = document.getElementById("fullscreen-zine-page-right");

    if (pageRight.classList.contains("turnToRightPage"))
    {
      pageRight.classList.remove("turnToRightPage");
      var pageRightClone = pageRight.cloneNode(true);
      zineContainer.appendChild(pageRightClone);
      pageRight.remove();
      pageRight = pageRightClone;
    }

    pageRight.classList.add("turnFromRightPage");
    setTimeout("removeById('fullscreen-zine-page-left')", turnTime * 2);
    setTimeout("removeById('fullscreen-zine-page-right')", turnTime);

    pageIndex += 2;

    var zineLeftPage = document.createElement('img');
    zineLeftPage.setAttribute('id', 'fullscreen-zine-page-left');
    zineLeftPage.setAttribute('onclick', 'turnBackPage()');
    zineLeftPage.setAttribute('src', "zines/" + collections[collectionIndex].path + "/zine" + zineIndex.toString() + "/page" + pageIndex.toString() + ".png");
    zineLeftPage.classList.add("turnToLeftPage");
    zineContainer.appendChild(zineLeftPage);

    if ((pageIndex + 1) < pageCount)
    {
      var zineRightPage = document.createElement('img');
      zineRightPage.setAttribute('id', 'fullscreen-zine-page-right');
      zineRightPage.setAttribute('onclick', 'turnForwardPage()');
      zineRightPage.setAttribute('src', "zines/" + collections[collectionIndex].path + "/zine" + zineIndex.toString() + "/page" + (pageIndex + 1).toString() + ".png");
      zineContainer.appendChild(zineRightPage);
    }
  }
}

function removeById(id)
{
  document.getElementById(id).remove();
}

/*function loadZines()
{
  var load = (function()
  {
    var collectionsFile = new XMLHttpRequest();
    collectionsFile.open("GET", "zines/collections.txt", true);
    collectionsFile.send();

    collectionsFile.onreadystatechange = function()
    {
      if (collectionsFile.readyState == 4 && collectionsFile.status == 200)
      {
        var collectionsObject;

        try
        {
          collectionsObject = JSON.parse(collectionsFile.responseText.toString());
        }
        catch(e)
        {
          console.log("error: " + e); // error in the above string (in this case, yes)!
        }

        var zinesFiles = [];
        var descriptionFiles = [[],[]];

        collections.collectionCount = collectionsObject.collectionCount;

        for (var collection = 0; collection < collections.collectionCount; collection++)
        {
          (function(collection)
          {
            zinesFiles[collection] = new XMLHttpRequest();
            var collectionPath = collectionsObject[collection.toString()];
            zinesFiles[collection].open("GET", "zines/" + collectionPath + "/zines.txt", true);
            zinesFiles[collection].send();

            zinesFiles[collection].onreadystatechange = function()
            {
              if (zinesFiles[collection].readyState == 4 && zinesFiles[collection].status == 200)
              {
                var zinesObject;

                try
                {
                  zinesObject = JSON.parse(zinesFiles[collection].responseText.toString());
                }
                catch(e)
                {
                  console.log("error: " + e); // error in the above string (in this case, yes)!
                }

                collections[collection.toString()] = zinesObject;
                collections[collection.toString()].path = collectionPath;
                collections[collection.toString()].zines = {};

                descriptionFiles[collection] = [];

                for (var zine = 0; zine < zinesObject.zineCount; zine++)
                {
                  (function(zine)
                  {
                    descriptionFiles[collection][zine] = new XMLHttpRequest();
                    descriptionFiles[collection][zine].open("GET", "zines/" + collectionPath + "/zine" + zine.toString() + "/description.txt", true);
                    descriptionFiles[collection][zine].send();

                    descriptionFiles[collection][zine].onreadystatechange = function()
                    {
                      if (descriptionFiles[collection][zine].readyState == 4 && descriptionFiles[collection][zine].status == 200)
                      {
                        var descriptionObject;

                        try
                        {
                          descriptionObject = JSON.parse(descriptionFiles[collection][zine].responseText.toString());
                        }
                        catch(e)
                        {
                          console.log("error: " + e); // error in the above string (in this case, yes)!
                        }

                        collections[collection.toString()].zines[zine.toString()] = descriptionObject;

                        console.log("loading collection." + (collection + 1).toString() + "/" + collections.collectionCount.toString() + ".zine." + (zine + 1).toString() + "/" + zinesObject.zineCount.toString());

                        if (collection == (collections.collectionCount - 1) && zine == (zinesObject.zineCount - 1))
                        {

                        }
                      }
                    }
                  })(zine);
                }
              }
            }
          })(collection);
        }
      }
    };
  })();
}*/
