const color_div_tohex = document.getElementById("color-div-tohex")
const color_div_torgb = document.getElementById("color-div-torgb")
const input_hex_value_tocopy = document.getElementById("input-hex-value-tocopy")
const input_rgb_value_tocopy = document.getElementById("input-rgb-value-tocopy")
const rgb_value_input = document.getElementById("input-rgb-value-tocopy")
const red_input = document.getElementById("red-input")
const green_input = document.getElementById("green-input")
const blue_input = document.getElementById("blue-input")
const button_convertto_hexadecimal = document.getElementById("button-convertto-hexadecimal")
const button_convertto_rgb = document.getElementById("button-convertto-rgb")
const button_copy_hexcode = document.getElementById("button-copy-hexcode")
const button_copy_rgb = document.getElementById("button-copy-rgb")
const input_hex = document.getElementById("input-hex")

red_input.style.width="34px"
green_input.style.width="34px"
blue_input.style.width="34px"

const updateTimer=()=>{
    button_copy_hexcode.innerText="Copy"
}

const copyHexValue=()=>{
    input_hex_value_tocopy.select()
    input_hex_value_tocopy.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(input_hex_value_tocopy.value)
    button_copy_hexcode.innerText="Copied"
    setInterval(updateTimer, 1000)
}
  
button_convertto_hexadecimal.addEventListener(("click"),(event)=>{
    event.preventDefault()
    
    let color;
    color_div_tohex.style.display="block"
    input_hex_value_tocopy.style.display="inline"
    if (red_input.value==="" && green_input.value==="" && blue_input.value==="") {
        console.log(red_input.value)
        console.log(green_input.value)
        console.log(blue_input.value)
        color = rgbToHex(0,0,0)
        input_hex_value_tocopy.value=color.toLocaleUpperCase()
    }
    else{
        if(red_input.value===""){red_input.value="0"}
        if(green_input.value===""){green_input.value="0"}
        if(blue_input.value===""){blue_input.value="0"}
        if(parseInt(red_input.value)>255){red_input.value="255"}
        if(parseInt(green_input.value)>255){green_input.value="255"}
        if(parseInt(blue_input.value)>255){blue_input.value="255"}
        console.log(red_input.value)
        console.log(green_input.value)
        console.log(blue_input.value)
        color = rgbToHex(parseInt(red_input.value), parseInt(green_input.value), parseInt(blue_input.value))
        input_hex_value_tocopy.value=color.toLocaleUpperCase()
    }
    color_div_tohex.style.backgroundColor=color
    button_copy_hexcode.style.display="inline"
    if(red_input.value==="0"){red_input.value=""}
    if(green_input.value==="0"){green_input.value=""}
    if(blue_input.value==="0"){blue_input.value=""}
    
})

button_convertto_rgb.addEventListener(("click"),(event)=>{
    event.preventDefault()
    let hex_color;
    
    
    if (input_hex.value.trim()===""){input_hex.value="#000000"}
    hex_color = input_hex.value
    
    hex_color = hex_color.replace("#","")
    if(isHexadecimal(hex_color)){
        color_div_torgb.style.display="block"
        input_rgb_value_tocopy.style.display="inline"
        const rgbTuple = hexToRgb(hex_color);
        input_rgb_value_tocopy.value=`rgb(${rgbTuple})`
    
        color_div_torgb.style.backgroundColor=`rgb(${rgbTuple})`
        button_copy_rgb.style.display="inline"
    }
    else{
        console.log("Not a hex_color")
    }
})

button_copy_hexcode.addEventListener(("click"),(event)=>{
    event.preventDefault()
    copyHexValue()
})

const rgbToHex = (r,g,b)=>"#" + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)

const hexToRgb = (hex) => {
    // Remove the '#' if present
    hex = hex.replace('#', '');

    // Convert hexadecimal to RGB
    const hex_integer = parseInt(hex, 16);
    const r = (hex_integer >> 16) & 255;
    const g = (hex_integer >> 8) & 255;
    const b = hex_integer & 255;

    // Return RGB tuple
    return [r, g, b];
};

const isHexadecimal = (str) =>{
    // regular expression to match hexadecimal strings
    const hex_regex = /^[0-9A-Fa-f]+$/

    // test the string against the regular expression
    return hex_regex.test(str)
}