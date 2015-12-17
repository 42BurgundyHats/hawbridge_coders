var toggle_hideable = function() {
  elements=document.getElementsByClassName('hideable');
  for(i in elements){ 
    this_element = elements[i];
    if (this_element.style.display === 'block' || this_element.style.display === '') {
      this_element.style.display = 'none';
      document.getElementById('toggle_hideable_button').innerHTML = "Reveal Hidden Message";
    } else {
      this_element.style.display = 'block';
      document.getElementById('toggle_hideable_button').innerHTML = "Hide Message";
    }
  }
}

var toggle_item_color = function(item_id) {
  item = document.getElementById(item_id);
  if (item.style.color === 'red') {
    item.style.color = 'blue';
    document.getElementById('btn_toggle_'+item_id+'_color').innerHTML = "Make Red";
  } else {
    item.style.color = 'red';
    document.getElementById('btn_toggle_'+item_id+'_color').innerHTML = "Make Blue";
  }
}

window.onload = function(e) {
  toggle_hideable();
}
