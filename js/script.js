let color_converter_instance

const updateTimer=()=>{
    color_converter_instance.buttonCopyHexcode.innerText="Copy"
    color_converter_instance.buttonCopyRgb.innerText="Copy"

}

const copyHexValue=()=>{
    color_converter_instance.inputHexValueToCopy.select()
    color_converter_instance.inputHexValueToCopy.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(color_converter_instance?.inputHexValueToCopy.value)
    color_converter_instance.buttonCopyHexcode.innerText="Copied"
    setInterval(updateTimer, 1000)
}

const copyRGBValue=()=>{
    color_converter_instance.inputRgbValueToCopy.select()
    color_converter_instance.inputRgbValueToCopy.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(color_converter_instance?.inputRgbValueToCopy.value)
    color_converter_instance.buttonCopyRgb.innerText="Copied"
    setInterval(updateTimer, 1000)
}
  
function convertToHex(){  
    let color;
    color_converter_instance.colorDivToHex.style.display="block"
    color_converter_instance.inputHexValueToCopy.style.display="inline"
    if (color_converter_instance?.redInput.value==="" && color_converter_instance?.greenInput.value==="" && color_converter_instance?.blueInput.value==="") {
        color = rgbToHex(0,0,0)
        color_converter_instance.inputHexValueToCopy.value=color.toLocaleUpperCase()
    }
    else{
        if(color_converter_instance?.redInput.value===""){color_converter_instance.redInput.value="0"}
        if(color_converter_instance?.greenInput.value===""){color_converter_instance.greenInput.value="0"}
        if(color_converter_instance?.blueInput.value===""){color_converter_instance.blueInput.value="0"}
        if(parseInt(color_converter_instance?.redInput.value)>255){color_converter_instance.redInput.value="255"}
        if(parseInt(color_converter_instance?.greenInput.value)>255){color_converter_instance.greenInput.value="255"}
        if(parseInt(color_converter_instance?.blueInput.value)>255){color_converter_instance.blueInput.value="255"}

        color = rgbToHex(parseInt(color_converter_instance?.redInput.value), parseInt(color_converter_instance?.greenInput.value), parseInt(color_converter_instance?.blueInput.value))
        color_converter_instance.inputHexValueToCopy.value=color.toLocaleUpperCase()
    }
    color_converter_instance.colorDivToHex.style.backgroundColor=color
    color_converter_instance.buttonCopyHexcode.style.display="inline"
    if(color_converter_instance?.redInput.value==="0"){color_converter_instance.redInput.value=""}
    if(color_converter_instance?.greenInput.value==="0"){color_converter_instance.greenInput.value=""}
    if(color_converter_instance?.blueInput.value==="0"){color_converter_instance.blueInput.value=""}
    
}

function convertToRgb(hexColor){
    //event.preventDefault()
    //let hexColor;
    
    if (color_converter_instance?.inputHex.value.trim()===""){color_converter_instance.inputHex.value="#000000"}
    color_converter_instance.hexColor = color_converter_instance?.inputHex.value
    
    hexColor = hexColor.replace("#","")
    if(isHexadecimal(hexColor)){
        //color_div_torgb.style.display="block"
        color_converter_instance.inputRgbValueToCopy.style.display="inline"
        const rgbTuple = hexToRgb(hexColor);
        color_converter_instance.inputRgbValueToCopy.value=`rgb(${rgbTuple})`
        //color_div_torgb.style.backgroundColor=`rgb(${rgbTuple})`
        color_converter_instance.buttonCopyRgb.style.display="inline"
    }
    else{
        console.log("Not a hexColor")
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
  const inputHexvalue = document.querySelector('#input-hex-value-tocopy')
  
  color_converter_instance.buttonCopyHexcode.addEventListener(("click"),(event)=>{
    event.preventDefault()
    copyHexValue()
  })

  color_converter_instance.buttonCopyRgb.addEventListener("click",(event)=>{
      event.preventDefault()
      copyRGBValue()
  })
  
   color_pallete.addEventListener('input', ()=>{
    console.log(color_pallete.value)
    color_converter_instance.colorDivToHex.style.backgroundColor=color_pallete.value
    color_converter_instance.inputHexValueToCopy.value=color_pallete.value
    console.log(hexToRgb('#FF0000'))
    let hex_to_rgb = hexToRgb(color_pallete.value)
    color_converter_instance.redInput.value = hex_to_rgb[0]
    color_converter_instance.greenInput.value = hex_to_rgb[1]
    color_converter_instance.blueInput.value = hex_to_rgb[2]
    convertToRgb(color_pallete.value)

  })
}

document.addEventListener('DOMContentLoaded',()=>{
  color_converter_instance = new ColorConverter()

  color_converter_instance.headingText.setAttribute('data-heading-text', color_converter_instance?.headingText.textContent)

  registerEventListeners()
  convertToHex()
  convertToRgb(color_converter_instance.hexColor)
})