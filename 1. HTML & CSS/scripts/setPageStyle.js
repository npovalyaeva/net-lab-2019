var ul = document.getElementById("collapse-list-group");
var selectedButton;

ul.onclick = function(event) {
    var target = event.target;

    while (target != this) {
      if (target.tagName == "BUTTON") {
        highlight(target);
        return;
      }
      target = target.parentNode;
    }
}

function highlight(node) {
    if (node.parentNode.style.backgroundColor == "rgb(59, 62, 74)") {
        node.parentNode.style.backgroundColor = '#ffffff';
        node.parentNode.style.color = '#828282';
        node.parentNode.style.borderColor = 'rgb(230, 230, 230)';
        node.parentNode.style.borderBottom = '1px solid rgb(230, 230, 230)';
        node.parentNode.style.borderRadius = '5px';
        node.style.borderRadius = '5px';
        node.innerHTML = '+';
    }
    else {
        node.parentNode.style.backgroundColor = '#3b3e4a';
        node.parentNode.style.color = '#ffffff';
        node.parentNode.style.borderColor = '#3b3e4a';
        node.parentNode.style.borderBottom = 0;
        node.parentNode.style.borderRadius = '5px 5px 0px 0px';
        node.style.borderRadius = '0 5px 0 0';
        node.innerHTML = '-';
    }  
}