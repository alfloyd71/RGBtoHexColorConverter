let colorConverterInstance

function updateTimer(){
    colorConverterInstance.buttonCopyHexcode.innerText="Copy"
    colorConverterInstance.buttonCopyRgb.innerText="Copy"

}

function copyHexValue(){
    colorConverterInstance.inputHexValueToCopy.select()
    colorConverterInstance.inputHexValueToCopy.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(colorConverterInstance?.inputHexValueToCopy.value)
    colorConverterInstance.buttonCopyHexcode.innerText="Copied"
    setInterval(updateTimer, 1000)
}

function copyRGBValue(){
    colorConverterInstance.inputRgbValueToCopy.select()
    colorConverterInstance.inputRgbValueToCopy.setSelectionRange(0, 99999)

    navigator.clipboard.writeText(colorConverterInstance?.inputRgbValueToCopy.value)
    colorConverterInstance.buttonCopyRgb.innerText="Copied"
    setInterval(updateTimer, 1000)
}
  
function convertToHex(){  
    let color;
    colorConverterInstance.colorDivToHex.style.display="block"
    colorConverterInstance.inputHexValueToCopy.style.display="inline"
    if (colorConverterInstance?.redInput.value==="" && colorConverterInstance?.greenInput.value==="" && colorConverterInstance?.blueInput.value==="") {
        color = rgbToHex(0,0,0)
        colorConverterInstance.inputHexValueToCopy.value=color.toLocaleUpperCase()
    }
    else{
        if(colorConverterInstance?.redInput.value===""){colorConverterInstance.redInput.value="0"}
        if(colorConverterInstance?.greenInput.value===""){colorConverterInstance.greenInput.value="0"}
        if(colorConverterInstance?.blueInput.value===""){colorConverterInstance.blueInput.value="0"}
        if(parseInt(colorConverterInstance?.redInput.value)>255){colorConverterInstance.redInput.value="255"}
        if(parseInt(colorConverterInstance?.greenInput.value)>255){colorConverterInstance.greenInput.value="255"}
        if(parseInt(colorConverterInstance?.blueInput.value)>255){colorConverterInstance.blueInput.value="255"}

        color = colorConverterInstance?.rgbToHex(parseInt(colorConverterInstance?.redInput.value), parseInt(colorConverterInstance?.greenInput.value), parseInt(colorConverterInstance?.blueInput.value))
        colorConverterInstance.inputHexValueToCopy.value=color.toLocaleUpperCase()
    }
    colorConverterInstance.colorDivToHex.style.backgroundColor=color
    colorConverterInstance.buttonCopyHexcode.style.display="inline"
    if(colorConverterInstance?.redInput.value==="0"){colorConverterInstance.redInput.value=""}
    if(colorConverterInstance?.greenInput.value==="0"){colorConverterInstance.greenInput.value=""}
    if(colorConverterInstance?.blueInput.value==="0"){colorConverterInstance.blueInput.value=""}
    
}

function convertToRgb(hexColor){
    //event.preventDefault()
    //let hexColor;
    
    //if (colorConverterInstance?.inputHex.value.trim()==="")colorConverterInstance.inputHex.value="#000000"
    colorConverterInstance.hexColor = colorConverterInstance?.inputHex.value
    
    hexColor = hexColor.replace("#","")
    if(isHexadecimal(hexColor)){
        //color_div_torgb.style.display="block"
        colorConverterInstance.inputRgbValueToCopy.style.display="inline"
        const rgbTuple = hexToRgb(hexColor);
        colorConverterInstance.inputRgbValueToCopy.value=`rgb(${rgbTuple})`
        //color_div_torgb.style.backgroundColor=`rgb(${rgbTuple})`
        colorConverterInstance.buttonCopyRgb.style.display="inline"
    }
    else{
        console.log("Not a hexColor")
    }
}

function hexToRgb(hex){
    // Remove the '#' if present
    hex = hex.replace('#', '');

    // Convert hexadecimal to RGB
    const hexInteger = parseInt(hex, 16);
    const r = (hexInteger >> 16) & 255;
    const g = (hexInteger >> 8) & 255;
    const b = hexInteger & 255;

    // Return RGB tuple
    return [r, g, b];
};

function isHexadecimal(str){
    // regular expression to match hexadecimal strings
    const hexRegex = /^[0-9a-fA-F]+$/

    // test the string against the regular expression
    return hexRegex.test(str)
}



function changeColor(){
  colorConverterInstance.colorDivToHex.style.backgroundColor=this.value
  if(this.className==='color-picker') colorConverterInstance.inputHexValueToCopy.value=colorConverterInstance?.colorPallete.value

  if(this.className==='input-hex') colorConverterInstance.colorPallete.value = this.value
  let hexToRgbVar = hexToRgb(colorConverterInstance?.colorPallete.value)
  colorConverterInstance.redInput.value = hexToRgbVar[0]
  colorConverterInstance.greenInput.value = hexToRgbVar[1]
  colorConverterInstance.blueInput.value = hexToRgbVar[2]

  if(this.className!=='input-rgbvalue')convertToRgb(colorConverterInstance?.colorPallete.value)

}

function registerEventListeners(){
  colorConverterInstance.buttonCopyHexcode.addEventListener(("click"),(event)=>{
    event.preventDefault()
    copyHexValue()
  })

  colorConverterInstance.buttonCopyRgb.addEventListener("click",(event)=>{
      event.preventDefault()
      copyRGBValue()
  })
  
  colorConverterInstance?.colorPallete.addEventListener('input', changeColor)

  //colorConverterInstance?.inputHexValueToCopy.addEventListener('change', changeColor)
  colorConverterInstance?.inputHexValueToCopy.addEventListener('keyup', changeColor)
  //colorConverterInstance?.inputRgbValueToCopy.addEventListener('change', changeColor)
  colorConverterInstance?.inputRgbValueToCopy.addEventListener('keyup', changeColor)

}

document.addEventListener('DOMContentLoaded',()=>{
  colorConverterInstance = new ColorConverter()

  colorConverterInstance.headingText.setAttribute('data-heading-text', colorConverterInstance?.headingText.textContent)

  registerEventListeners()
  convertToHex()
  convertToRgb(colorConverterInstance.hexColor)
})