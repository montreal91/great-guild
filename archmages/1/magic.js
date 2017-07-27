
var current_chapter;
var current_block;
var content;


var book_page;
var archmage_header;


function mg_load_content() {
  book_page = document.getElementById("mg-book-page");
  archmage_header = document.getElementById("mg-archmage-header");
  chapter_header = document.getElementById("mg-chapter-header");
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    var response;
    if (req.readyState == 4) {
      if (req.status != 200) {
      } else {
        content = JSON.parse(req.responseText);
        current_chapter = 0;
        current_block = 0;
        mg_show_content();
      }
    }
  }
  req.open('GET', 'bio.json');
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.send();
  return false;
}

function mg_next_block() {
  let chapter_name = content.chapters[current_chapter];
  current_block++;
  if (current_block > content[chapter_name].length - 1) {
    current_block = content[chapter_name].length - 1;
  }
  mg_show_content();
}

function mg_next_chapter() {
  current_chapter++;
  if (current_chapter > content.chapters.length - 1) {
    current_chapter = content.chapters.length - 1;
  }
  current_block = 0;
  mg_show_content();
}

function mg_previous_block() {
  let chapter_name = content.chapters[current_chapter];
  current_block--;
  if (current_block < 0) {
    current_block = 0;
  }
  mg_show_content();
}

function mg_previous_chapter() {
  current_chapter--;
  if (current_chapter < 0) {
    current_chapter = 0;
  }
  current_block = 0;
  mg_show_content();
}

function mg_set_block_number() {
  document.getElementById("mg-block-number").innerHTML = current_block + 1;
}

function mg_set_chapter_name() {
  let div = document.getElementById("mg-chapter-header");
  div.innerHTML = content.chapters[current_chapter];
}

function mg_show_content() {
  archmage_header.innerHTML = content.archmage;

  let chapter_name = content.chapters[current_chapter];
  // chapter_header.innerHTML = chapter_name;
  let block = content[chapter_name][current_block];
  let text = "";
  for (var i=0; i<block.length; i++) {
    text += "<p>" + block[i] + "</p>";
  }
  book_page.innerHTML = text;
  if (current_block === 0) {
    document.getElementById("mg-previous-block").disabled = true;
  } else {
    document.getElementById("mg-previous-block").disabled = false;
  }

  if (current_block === content[chapter_name].length-1) {
    document.getElementById("mg-next-block").disabled = true;
  } else {
    document.getElementById("mg-next-block").disabled = false;
  }

  if (current_chapter === 0) {
    document.getElementById("mg-previous-chapter").disabled = true;
  } else {
    document.getElementById("mg-previous-chapter").disabled = false;
  }

  if (current_chapter === content.chapters.length - 1) {
    document.getElementById("mg-next-chapter").disabled = true;
  } else {
    document.getElementById("mg-next-chapter").disabled = false;
  }

  mg_set_block_number();
  mg_set_chapter_name();
}
