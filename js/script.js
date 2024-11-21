let color_converter_instance

const updateTimer=()=>{
    color_converter_instance.button_copy_hexcode.innerText="Copy"
    color_converter_instance.button_copy_rgb.innerText="Copy"

}

const copyHexValue=()=>{
    color_converter_instance.input_hex_value_tocopy.select()
    color_converter_instance.input_hex_value_tocopy.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(color_converter_instance?.input_hex_value_tocopy.value)
    color_converter_instance.button_copy_hexcode.innerText="Copied"
    setInterval(updateTimer, 1000)
}

const copyRGBValue=()=>{
    color_converter_instance.input_rgb_value_tocopy.select()
    color_converter_instance.input_rgb_value_tocopy.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(color_converter_instance?.input_rgb_value_tocopy.value)
    color_converter_instance.button_copy_rgb.innerText="Copied"
    setInterval(updateTimer, 1000)
}
  
function convertToHex(){  
    let color;
    color_converter_instance.color_div_tohex.style.display="block"
    color_converter_instance.input_hex_value_tocopy.style.display="inline"
    if (color_converter_instance?.red_input.value==="" && color_converter_instance?.green_input.value==="" && color_converter_instance?.blue_input.value==="") {
        color = rgbToHex(0,0,0)
        color_converter_instance.input_hex_value_tocopy.value=color.toLocaleUpperCase()
    }
    else{
        if(color_converter_instance?.red_input.value===""){color_converter_instance.red_input.value="0"}
        if(color_converter_instance?.green_input.value===""){color_converter_instance.green_input.value="0"}
        if(color_converter_instance?.blue_input.value===""){color_converter_instance.blue_input.value="0"}
        if(parseInt(color_converter_instance?.red_input.value)>255){color_converter_instance.red_input.value="255"}
        if(parseInt(color_converter_instance?.green_input.value)>255){color_converter_instance.green_input.value="255"}
        if(parseInt(color_converter_instance?.blue_input.value)>255){color_converter_instance.blue_input.value="255"}

        color = rgbToHex(parseInt(color_converter_instance?.red_input.value), parseInt(color_converter_instance?.green_input.value), parseInt(color_converter_instance?.blue_input.value))
        color_converter_instance.input_hex_value_tocopy.value=color.toLocaleUpperCase()
    }
    color_converter_instance.color_div_tohex.style.backgroundColor=color
    color_converter_instance.button_copy_hexcode.style.display="inline"
    if(color_converter_instance?.red_input.value==="0"){color_converter_instance.red_input.value=""}
    if(color_converter_instance?.green_input.value==="0"){color_converter_instance.green_input.value=""}
    if(color_converter_instance?.blue_input.value==="0"){color_converter_instance.blue_input.value=""}
    
}

function convertToRgb(hex_color){
    //event.preventDefault()
    //let hex_color;
    
    if (color_converter_instance?.input_hex.value.trim()===""){color_converter_instance.input_hex.value="#000000"}
    color_converter_instance.hex_color = color_converter_instance?.input_hex.value
    
    hex_color = hex_color.replace("#","")
    if(isHexadecimal(hex_color)){
        //color_div_torgb.style.display="block"
        color_converter_instance.input_rgb_value_tocopy.style.display="inline"
        const rgbTuple = hexToRgb(hex_color);
        color_converter_instance.input_rgb_value_tocopy.value=`rgb(${rgbTuple})`
        //color_div_torgb.style.backgroundColor=`rgb(${rgbTuple})`
        color_converter_instance.button_copy_rgb.style.display="inline"
    }
    else{
        console.log("Not a hex_color")
    }
}

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

function registerEventListeners(){
  const color_pallete = document.querySelector('.color-picker')
  const input_hexvalue = document.querySelector('#input-hex-value-tocopy')
  
  color_converter_instance.button_copy_hexcode.addEventListener(("click"),(event)=>{
    event.preventDefault()
    copyHexValue()
  })

  color_converter_instance.button_copy_rgb.addEventListener("click",(event)=>{
      event.preventDefault()
      copyRGBValue()
  })
  
   color_pallete.addEventListener('input', ()=>{
    console.log(color_pallete.value)
    color_converter_instance.color_div_tohex.style.backgroundColor=color_pallete.value
    color_converter_instance.input_hex_value_tocopy.value=color_pallete.value
    console.log(hexToRgb('#FF0000'))
    let hex_to_rgb = hexToRgb(color_pallete.value)
    color_converter_instance.red_input.value = hex_to_rgb[0]
    color_converter_instance.green_input.value = hex_to_rgb[1]
    color_converter_instance.blue_input.value = hex_to_rgb[2]
    convertToRgb(color_pallete.value)

  })
}

document.addEventListener('DOMContentLoaded',()=>{
  color_converter_instance = new ColorConverter()

  color_converter_instance.heading_text.setAttribute('data-heading-text', color_converter_instance?.heading_text.textContent)

  registerEventListeners()
  convertToHex()
  convertToRgb(color_converter_instance.hex_color)
})