class ColorConverter{
  constructor(){
    this.rgbToHex = (r,g,b)=>"#" + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)
    this.hexColor='#ff0000'
    this.headingText = document.querySelector('#heading-text')
    this.colorDivToHex = document?.querySelector("#color-div-tohex")
    this.inputHexValueToCopy = document?.querySelector("#input-hex-value-tocopy")
    this.inputRgbValueToCopy = document?.querySelector("#input-rgb-value-tocopy")
    this.redInput = document.querySelector('#red-input')
    this.greenInput = document.querySelector('#green-input')
    this.blueInput = document.querySelector('#blue-input')
    this.color = '#ff0000'
    this.inputHex = document.querySelector(".input-hex")
    this.buttonCopyRgb = document.querySelector('#button-copy-rgb')
    this.buttonCopyHexcode = document.querySelector('#button-copy-hexcode')
    this.colorPallete = document.querySelector('.color-picker')




    
  }
}