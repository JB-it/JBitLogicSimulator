class AndGate {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.xPosition = width/2 - this.width/2;
        this.yPosition = height/2 - this.height/2;
        this.activeInputs = true;
        this.isClickable = false;
        this.isInputtable = true;
        this.isOutputtable = true;
        this.inputs = [];
        this.maxInputs = 2;
        this.hasMultipleOutputs = false;
        this.inputIndexes = {};
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
        textSize(28);
        text('and', this.xPosition + 2, this.yPosition + 35);
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
        let count = 0;
        for(let i = 0; i < this.inputs.length; i++) {
            if(this.getActiveOfInput(i)) {
                count++;
            }
        }
        this.active = count == 2;
    }
}

function createAndGate() {
    var n = new AndGate();
}