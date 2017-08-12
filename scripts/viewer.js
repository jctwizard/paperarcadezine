var collections = [];

viewZine();

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

function viewZine(parent)
{
  for (var i = 0; i < 8; i++)
  {
    document.body.innerHTML += "<img src='zines/gameplayarcade/zine0/page" + i.toString() + ".png'></img>";
  }
}

function loadFile(filePath)
{
  var result = null;
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", filePath, false);
  xmlHttp.send();

  if (xmlHttp.status == 200)
  {
    result = xmlHttp.responseText;
  }

  return result;
}
