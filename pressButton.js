class PressButton {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.xPosition = width/2 - this.width/2;
        this.yPosition = height/2 - this.height/2;
        this.active = false;
        this.isClickable = false;
        this.isInputtable = false;
        this.isOutputtable = true;
        this.isClock = false;
        objects.push(this);
    }

    setPosition(posX, posY) {
        this.xPosition = posX - this.width/2;
        this.yPosition = posY - this.height/2;
    }

    setActive() {
        this.active = this.mouseInside();
    }

    show() {
        if(this.active) fill(255,55,55)
        else fill(155,55,55);
        noStroke();
        ellipse(this.xPosition + this.width/2, this.yPosition + this.height/2, this.width, this.height);
    }

    mouseInside() {
        if(mouseX < this.xPosition || mouseX > this.xPosition + this.width)  return false;
        if(mouseY < this.yPosition || mouseY > this.yPosition + this.height) return false;
        return true;
    }
}

function createPressButton() {
    var p = new PressButton();
}