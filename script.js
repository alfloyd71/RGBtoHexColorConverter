color_div = document.getElementById("color-div")
hex_value_input = document.getElementById("hex-value-input")
red_input = document.getElementById("red-input")
green_input = document.getElementById("green-input")
blue_input = document.getElementById("blue-input")
button_convertto_hexadecimal = document.getElementById("button-convertto-hexadecimal")
button_copy_hexcode = document.getElementById("button-copy-hexcode")


red_input.style.width="34px"
green_input.style.width="34px"
blue_input.style.width="34px"

const updateTimer=()=>{
    button_copy_hexcode.innerText="Copy"
}

const copyHexValue=()=>{
    hex_value_input.select()
    hex_value_input.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(hex_value_input.value)
    button_copy_hexcode.innerText="Copied"
    setInterval(updateTimer, 1000)
}
  
button_convertto_hexadecimal.addEventListener(("click"),(event)=>{
    event.preventDefault()
    let color;
    color_div.style.display="block"
    hex_value_input.style.display="inline"
    if (red_input.value==="" && green_input.value==="" && blue_input.value==="") {
        console.log(red_input.value)
        console.log(green_input.value)
        console.log(blue_input.value)
        color = rgbToHex(0,0,0)
        hex_value_input.value=color.toLocaleUpperCase()
    }
    else{
        if(red_input.value===""){red_input.value="0"}
        if(green_input.value===""){green_input.value="0"}
        if(blue_input.value===""){blue_input.value="0"}
        console.log(red_input.value)
        console.log(green_input.value)
        console.log(blue_input.value)
        color = rgbToHex(parseInt(red_input.value), parseInt(green_input.value), parseInt(blue_input.value))
        hex_value_input.value=color.toLocaleUpperCase()
    }
    color_div.style.backgroundColor=color
    button_copy_hexcode.style.display="inline"
    if(red_input.value==="0"){red_input.value=""}
    if(green_input.value==="0"){green_input.value=""}
    if(blue_input.value==="0"){blue_input.value=""}
    
})

button_copy_hexcode.addEventListener(("click"),(event)=>{
    event.preventDefault()
    copyHexValue()
})

const rgbToHex = (r,g,b)=>"#" + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)
hex_color = rgbToHex(255, 255, 0)

hex_value_input.value=hex_color.toUpperCase()
//color_div.style.backgroundColor=hex_color
