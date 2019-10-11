class BinaryCounter {
    constructor() {
        this.width = 50;
        this.height = 100;
        this.xPosition = width/2 - this.width/2;
        this.yPosition = height/2 - this.height/2;
        this.activeInputs = true;
        this.isClickable = false;
        this.isInputtable = true;
        this.isOutputtable = true;
        this.isClock = false;
        this.inputs = [];
        this.maxInputs = 1;
        this.hasMultipleOutputs = true;
        this.inputIndexes = {};
        this.outputs = [false, false, false, false, false, false, false, false];
        this.counter = 0;
        this.pInput = false;
        objects.push(this);
    }

    setPosition(posX, posY) {
        this.xPosition = posX - this.width/2;
        this.yPosition = posY - this.height/2;
    }

    show() {
        fill(0);
        stroke(255);
        rect(this.xPosition, this.yPosition, this.width, this.height);
        fill(255);
        text('CLK',  this.xPosition + 4,  this.yPosition + 55);
        text('0',  this.xPosition + 40, this.yPosition + 15);
        text('1',  this.xPosition + 40, this.yPosition + 26);
        text('2',  this.xPosition + 40, this.yPosition + 37);
        text('3',  this.xPosition + 40, this.yPosition + 48);
        text('4',  this.xPosition + 40, this.yPosition + 60);
        text('5',  this.xPosition + 40, this.yPosition + 71);
        text('6',  this.xPosition + 40, this.yPosition + 82);
        text('7',  this.xPosition + 40, this.yPosition + 93);
    }

    mouseInside() {
        if(mouseX < this.xPosition || mouseX > this.xPosition + this.width)  return false;
        if(mouseY < this.yPosition || mouseY > this.yPosition + this.height) return false;
        return true;
    }

    setInputs(object) {
        if(this.inputs.indexOf(object) >= 0) {
            this.inputs.splice(this.inputs.indexOf(object),1);
        } else {
            if(this.inputs.length < this.maxInputs) {
                if(object.hasMultipleOutputs) {
                    let inputIndex = prompt("Enter the input index: ");
                    if(inputIndex >= object.outputs.length) {
                        alert("Input out of range");
                        return;
                    }
                    this.inputIndexes[object] = inputIndex;
                }
                this.inputs.push(object);
            }
        }
    }

    getActiveOfInput(i) {
        let obj = this.inputs[i];
        let isActive = null;
        if(obj.hasMultipleOutputs) {
            isActive = obj.outputs[this.inputIndexes[obj]];
        } else {
            isActive = obj.active;
        }
        return isActive;
    }

    setActive() {
        if(this.inputs.length > 0) {
            if(this.getActiveOfInput(0) && !this.pInput) {
                this.counter++;
                this.counter %= 256;
            }
            this.pInput = this.getActiveOfInput(0);
        }
        let bCounter = this.counter;
        for(let i = 7; i >= 0; i--) {
            let divider = Math.pow(2, i);
            if(divider <= bCounter) {
                this.outputs[i] = true;
                bCounter -= divider;
            } else {
                this.outputs[i] = false;
            }
        }
    }
}

function createBinaryCounter() {
    var b = new BinaryCounter();
}