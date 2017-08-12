var collections = {};

loadZines();

function initViewer()
{
  //var index =
  //collections =
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
  console.log(collections);
}

function loadZines()
{
  var load = (function()
  {
    var collectionsFile = new XMLHttpRequest();
    collectionsFile.open("GET", "zines/collections.txt", true);
    collectionsFile.send();

    var loadedFlags = [];
    loadedFlags.push("collection");

    collectionsFile.onreadystatechange = function()
    {
      if (collectionsFile.readyState == 4 && collectionsFile.status == 200)
      {
        console.log(collectionsFile.responseText);
        var collectionsObject = JSON.parse(collectionsFile.responseText.toString());
        var zinesFiles = [];

        for (var collection = 0; collection < collectionsObject.collectionCount; collection++)
        {
          (function(collection)
          {
            zinesFiles[collection] = new XMLHttpRequest();
            var collectionPath = collectionsObject[collection.toString()];
            zinesFiles[collection].open("GET", "zines/" + collectionPath + "/zines.txt", true);
            zinesFiles[collection].send();

            loadedFlags.push("zines" + collection.toString());

            zinesFiles[collection].onreadystatechange = function()
            {
              if (zinesFiles[collection].readyState == 4 && zinesFiles[collection].status == 200)
              {
                console.log(zinesFiles[collection].responseText);
                var zinesObject = JSON.parse(zinesFiles[collection].responseText.toString());

                collections[collection.toString()] = zinesObject;
                collections[collection.toString()].path = collectionPath;
                collections[collection.toString()].zines = {};

                console.log(zinesObject.zineCount);
                var descriptionFiles = [];

                for (var zine = 0; zine < zinesObject.zineCount; collection++)
                {
                  (function(zine)
                  {
                    descriptionFiles[zine] = new XMLHttpRequest();
                    descriptionFiles[zine].open("GET", "zines/" + collectionPath + "/zine" + zine.toString() + "/description.txt", true);
                    descriptionFiles[zine].send();

                    loadedFlags.push("description" + collection.toString() + "." + zine.toString());

                    descriptionFiles[zine].onreadystatechange = function()
                    {
                      if (descriptionFiles[zine].readyState == 4 && descriptionFiles[zine].status == 200)
                      {
                        console.log(descriptionFiles[zine].responseText);
                        var descriptionObject = JSON.parse(descriptionFiles[zine].responseText.toString());

                        collections[collection.toString()].zines[zine.toString()] = descriptionObject;
                      }

                      loadedFlags.splice(loadedFlags.indexOf("description" + collection.toString() + "." + zine.toString()), 1);

                      if (loadedFlags.length() == 0)
                      {
                        viewZine();
                      }
                    }
                  })(zine);
                }
              }

              loadedFlags.splice(loadedFlags.indexOf("zines" + collection.toString()), 1);
            }
          })(collection);
        }

        loadedFlags.splice(loadedFlags.indexOf("collection"), 1);
      }
    };
  })();
}
