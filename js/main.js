    function handleFiles(files) {
      // Check for the various File API support.
      if (window.FileReader) {
          // FileReader are supported.
          getAsText(files[0]);
      } else {
          alert('FileReader are not supported in this browser.');
      }
    }

    function getAsText(fileToRead) {
      var reader = new FileReader();
      // Read file into memory as UTF-8      
      reader.readAsText(fileToRead);
      // Handle errors load
      reader.onload = loadHandler;
      reader.onerror = errorHandler;
    }

    function loadHandler(event) {
      var csv = event.target.result;
      processData(csv);
    }

    function processData(csv) {
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = [];
        for (var i=0; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
                var tarr = [];
                for (var j=0; j<data.length; j++) {
                    tarr.push(parseInt(data[j]));
                }
                lines.push(tarr);
        }
      console.log(lines);
	  dataset = lines;
    }

let nn = new RedeNeural(16 ,(49*16), 225, 10);

function getTrainingData(){
  var TreiningData = [[], []];
  var index = getRandom(0, dataset.length);
  //var index = getRandom(0, 200);
  var inputT = [];
  var outputT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for(let x=1; x<dataset[index].length; x++){
    inputT.push(dataset[index][x]);
  }
  for(let o=0; o<=9; o++){
    if(dataset[index][0] == o){
      outputT[o] = 1;
    }
  }
  TreiningData[0] = adaptArrayToMatrixIMG(inputT, 28).map(normalize);
  TreiningData[1] = outputT;
  TreiningData[2] = index;
  for(let i=0; i<28; i++){
    for(let j=0; j<28; j++){
      if(isNaN(TreiningData[0].data[i][j])){
        return getTrainingData();
      }
      else 
        return TreiningData;
    }
  }
}

function qualonumero(){
	var Input = getImg().map(normalize);
	document.getElementById("numero").innerHTML = "Numero:"+indexOfMax(nn.predict(Input))+"  Chance:"+(nn.predict(Input)[indexOfMax(nn.predict(Input))]*100).toFixed(2)+"%";
	console.table(nn.predict(Input))
}

function treinar(qnt){
  t1 = performance.now()
	for(let t=1; t<=qnt; t++){
		Data = getTrainingData();
    nn.train(Data[0], Data[1]);
      console.log("Treinando "+qnt+" vezes.");
  }
  console.log(performance.now() - t1);
}

var stop = false;
function s_treinar(){
  var qnt=0;
  do{
    var point = 0;
    for(let t=1; t<=100; t++){
    Data = getTrainingData();
    nn.train(Data[0], Data[1]);
    qnt++;
    }
    for(let t=1; t<=1000; t++){
      Data = getTrainingData();
      if( indexOfMax(nn.predict(Data[0])) == indexOfMax(Data[1])){
          point++;
      };
    }
    console.log("00 treinos");
    if(stop){
      console.log("Cancelado.");
      stop = false;
      return
    }
  }
  while(point<900);
  console.log('Sucesso após '+qnt+' treinos');
}

function eficiencia(){
  let porcentage = 0;

  for(let i=0; i<10000; i++){
    Data = getTrainingData();
    if(indexOfMax(nn.predict(Data[0]))==indexOfMax(Data[1])){
      porcentage++;
    }
  }
  return porcentage/10000
}