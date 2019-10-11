class ToggleButton {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.xPosition = width/2 - this.width/2;
        this.yPosition = height/2 - this.height/2;
        this.active = false;
        this.isClickable = true;
        this.isInputtable = false;
        this.isOutputtable = true;
        this.isClock = false;
        objects.push(this);
    }

    setPosition(posX, posY) {
        this.xPosition = posX - this.width/2;
        this.yPosition = posY - this.height/2;
    }

    toggle() {
        this.active = !this.active;
    }

    show() {
        if(this.active) fill(255,55,55)
        else fill(155,55,55);
        noStroke();
        rect(this.xPosition, this.yPosition, this.width, this.height);
    }

    mouseInside() {
        if(mouseX < this.xPosition || mouseX > this.xPosition + this.width)  return false;
        if(mouseY < this.yPosition || mouseY > this.yPosition + this.height) return false;
        return true;
    }
}

function createToggleButton() {
    var t = new ToggleButton();
}