window.onload = function loadTable() {

  var xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      // code for older browsers
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        var savingsAccountData = JSON.parse(this.responseText);

        var col = [];
        for (var i = 0; i < savingsAccountData.length; i++) {
            for (var key in savingsAccountData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        var table = document.createElement("table");

        var tr = table.insertRow(-1);

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }


        for (var i = 0; i < savingsAccountData.length; i++) {

            tr = table.insertRow(-1);
            tr.setAttribute('row-index', i+1 );
            tr.setAttribute('product-name',savingsAccountData[i].Product);
            tr.setAttribute('id', i+1);

            if(i != 0) {
              tr.setAttribute('class', 'collapsed');
            }
             else {
               tr.setAttribute('class', 'currentRecord');
             }
                for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = savingsAccountData[i][col[j]];
            }
        }
        setLinkCaptions("", savingsAccountData[1].Product);
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
       table.setAttribute("id", "newtable");
      }
    };
    xmlhttp.open("GET", "http://localhost:3000/users/json", true);
    xmlhttp.send();
  }


  function onPrevClick(e){
    var prevLinkCaption = "";
  var nextLinkCaption = "";
  var productTable = document.getElementById('newtable');
  var items = document.getElementsByClassName('currentRecord');
  var currentRow = items[0];
  var currentRowIndex = parseInt(currentRow.rowIndex);
  var preRowIndex = productTable.rows.length - 1;
  if(currentRowIndex > 1) {
    preRowIndex = currentRowIndex - 1;
  }

  if(preRowIndex > 1) {

    prevLinkCaption = document.getElementById(preRowIndex - 1).getAttribute("product-name");
    nextLinkCaption = document.getElementById(currentRowIndex).getAttribute("product-name");
  } else{
    nextLinkCaption = document.getElementById("2").getAttribute("product-name");
  }


  productTable.rows[preRowIndex].setAttribute('class', 'currentRecord');
  setLinkCaptions(prevLinkCaption, nextLinkCaption);
  currentRow.setAttribute('class', 'collapsed');
  }


  function onNextClick(e){
  var prevLinkCaption = "";
  var nextLinkCaption = "";
  var productTable = document.getElementById('newtable');
  var items = document.getElementsByClassName('currentRecord');
  var currentRow = items[0];
  var currentRowIndex = parseInt(currentRow.rowIndex) ;
  var nextRowIndex = 1;
  if(currentRowIndex != productTable.rows.length - 1) {
    nextRowIndex = parseInt(currentRowIndex) + 1;
  }

  if(nextRowIndex < productTable.rows.length - 1) {
    nextLinkCaption = document.getElementById(nextRowIndex + 1).getAttribute("product-name");
    prevLinkCaption = document.getElementById(currentRowIndex).getAttribute("product-name");
  } else if(nextRowIndex == productTable.rows.length - 1) {
    prevLinkCaption = document.getElementById(currentRowIndex).getAttribute("product-name");
  }

  productTable.rows[nextRowIndex].setAttribute('class', 'currentRecord');

  setLinkCaptions(prevLinkCaption, nextLinkCaption);
  currentRow.setAttribute('class', 'collapsed');
}

function setLinkCaptions(prevButton, nextButton) {
  var prevLink = document.getElementById('prevLink');
  var nextLink = document.getElementById('nextLink');


  if(prevButton === "")
    prevLink.style.display = 'none';
  else {
    prevLink.innerHTML = prevButton;
    prevLink.style.display = "block";
  }

  if(nextButton === "")
    nextLink.style.display = 'none';
  else {
    nextLink.innerHTML = nextButton;
    nextLink.style.display = "block";
  }

}
