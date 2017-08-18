var collections = {};

loadZines();

function initViewer()
{

}

function getCollectionList()
{

}

function getZineList(collectionIndex)
{

}

function getZine(zineIndex)
{

}

function viewZine()
{
  var zineGallery = "";

  for (var collection = 0; collection < collections.collectionCount; collection++)
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
      zineGallery += "<img class='gallery-zine-cover' src='zines/" + collections[collection.toString()].path + "/zine" + zine.toString() + "/page0.png'></img>";
      zineGallery += "</div>";
    }

    zineGallery += "</div>";
  }

  console.log(zineGallery);

  document.getElementById("content").innerHTML = zineGallery;
}

function loadZines()
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
                          viewZine();
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
}
