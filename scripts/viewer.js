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
  loadFile("zines/index.txt");

  for (var i = 0; i < 8; i++)
  {
    document.body.innerHTML += "<img src='zines/gameplayarcade/zine0/page" + i.toString() + ".png'></img>";
  }
}

function loadFile(filePath)
{
  var file = new XMLHttpRequest();

  file.open("GET", filePath, true);
  file.send();

  file.onreadystatechange = function()
  {
    if (file.readyState == 4 && file.status == 200)
    {
      console.log(file.responseText);
    }
  };
}
