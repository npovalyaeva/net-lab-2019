<script type="text/javascript">

    const backgroundColors = new Array('#3b3e4a','#ffffff');
    const textColors = new Array('#ffffff', '#828282');
    const borderColors = new Array('#3b3e4a', 'rgb(230, 230, 230)');
    const {length} = backgroundColors
    
    
    const setListItemStyle = (event) => {
        let countPress = 0;
        return function() {
            el.parentNode.style.backgroundColor = backgroundColors[countPress];
            el.parentNode.style.color = textColors[countPress];
            el.parentNode.style.borderColor = borderColors[countPress];
            switch (countPress) {
                case 0:
                    el.parentNode.style.borderBottom = 0;
                    el.parentNode.style.borderRadius = '5px 5px 0px 0px';
                    el.style.borderRadius = '0 5px 0 0';
                    el.style.value = '-';
                    break;
                case 1:
                    el.parentNode.style.borderBottom = '1px solid rgb(230, 230, 230)';
                    el.parentNode.style.borderRadius = '5px';
                    el.style.borderRadius = '5px';
                    el.style.value = '+';
                break;
            }
            countPress++;
            if (countPress == backgroundColors.length) { 
                countPress = 0; 
            }
        }
    }     

</script>