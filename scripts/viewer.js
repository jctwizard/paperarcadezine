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

      for (var collection = 0; collection < collection.collectionCount; collection++)
      {
        var zinesFile = new XMLHttpRequest();
        var collectionPath = collectionsObject[collection.toString()];
        zinesFile.open("GET", "zines/" + collectionPath + "/zines.txt", true);
        zinesFile.send();

        loadedFlags.push("zines" + collection.toString());

        zinesFile.onreadystatechange = function()
        {
          if (zinesFile.readyState == 4 && zinesFile.status == 200)
          {
            console.log(zinesFile.responseText);
            var zinesObject = JSON.parse(zinesFile.responseText.toString());

            collections[collection.toString()] = zinesObject;
            collections[collection.toString()].path = collectionPath;
            collections[collection.toString()].zines = {};

            for (var zine = 0; zine < zinesObject.zineCount; collection++)
            {
              var descriptionFile = new XMLHttpRequest();
              descriptionFile.open("GET", "zines/" + collectionPath + "/zine" + zine.toString() + "/description.txt", true);
              descriptionFile.send();

              loadedFlags.push("description" + collection.toString() + "." + zine.toString());

              descriptionFile.onreadystatechange = function()
              {
                if (descriptionFile.readyState == 4 && descriptionFile.status == 200)
                {
                  console.log(descriptionFile.responseText);
                  var descriptionObject = JSON.parse(descriptionFile.responseText.toString());

                  collections[collection.toString()].zines[zine.toString()] = descriptionObject;
                }

                loadedFlags.splice(loadedFlags.indexOf("description" + collection.toString() + "." + zine.toString()), 1);

                if (loadedFlags.length() == 0)
                {
                  viewZine();
                }
              }
            }
          }

          loadedFlags.splice(loadedFlags.indexOf("zines" + collection.toString()), 1);
        }
      }

      loadedFlags.splice(loadedFlags.indexOf("collection"), 1);
    }
  };
}
