/**
 * テーブルのヘッダを固定して明細をスクロールします。
 * IE8-9, Chrome, FireFoxあたりは多分動く。
 * @param id 対象のテーブルID
 * @param height スクロールする高さ
 */
function addDetailScroll(id, height){
  if(!height){
    height = 150;
  }
  var targets = document.getElementById(id);
  if(!targets) return;
  if(!targets.tHead) return;
  if(!targets.tBodies) return;
  if(targets.tBodies.length == 0) return;
  
  var header = document.createElement("table");
  var tHead  = targets.tHead.cloneNode(true);
  header.appendChild(tHead);
  header.className = targets.className;
  resizeCells(targets.tHead, tHead);
  targets.parentNode.insertBefore(header, targets);

  var scrollDiv = document.createElement("div");
  targets.parentNode.insertBefore(scrollDiv, targets);
  scrollDiv.id = "scrollable-table";
  scrollDiv.style.overflow = "auto";
  scrollDiv.style.height = height + "px";
  scrollDiv.style.width  = targets.offsetWidth + 21 + "px";
  scrollDiv.appendChild(targets);
  resizeCells(targets.tBodies[0], targets.tBodies[0]);
  
  targets.removeChild(targets.tHead);
}

/**
 * セルの横幅をリサイズします。
 * cssで'box-sizing:border-box;' を指定しとかないと残念なコトになります。
 */
function resizeCells(source, dist){
  for(var i = 0; i < source.rows.length; i++){
    for(var k = 0; k < source.rows[i].cells.length; k++){
      dist.rows[i].cells[k].style.width = source.rows[i].cells[k].offsetWidth + "px";
    }
  }
}
