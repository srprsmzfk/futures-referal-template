const plex = "'BinanceRegular', Arial, sans-serif";
const plexCondensed = "'BinanceMedium', Arial, sans-serif";
const white = '#ffffff';
const red = '#b55270';
const green = '#30b47e';
const yellow = '#baa620';

let canvas = document.createElement('canvas');
let context = canvas.getContext("2d");

document.querySelector('.btn').addEventListener('click', () => generateCard())

function generateCard() {
    const fields = document.forms[0].elements;
    let img = new Image();
    img.src = 'assets/template.png';
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        context.lineWidth = 1;

        drawText(fields['sell-buy'].value, fields['sell-buy'].value === 'Продать' ? 120 : 135, 213, `400 30px ${plex}`, fields['sell-buy'].value === 'Продать' ? red : green );

        drawText(fields['xxx'].value, fields['xxx'].value.length === 3 ? 314 : 302, 213, `400 30px ${plex}`, white);

        drawText(fields['coin'].value.toUpperCase() + '  Бессрочный', 430, 213, `400 30px ${plex}`);

        drawText(`+${fields['percent'].value} %`, 115, 315, `95px ${plexCondensed}`, green);

        drawText(fields['entry'].value, 390, 366, `400 30px ${plex}`, yellow);
        drawText(fields['exit'].value, 390, 400, `400 30px ${plex}`, yellow);

        setReferral(fields['referral'].value);
    };
}

function drawText(text, x, y, font, color) {
    if (font) {
        context.font = font;
    }
    if (color) {
        context.fillStyle = color;
    }
    context.fillText(text, x, y);
}

function getReferral(name) {
    switch (name) {
        case 'Мальцев': return 39672901
        case 'Доронин' : return 44632377
        case 'Шевченко' : return 32783012
    }
}

function setReferral(name) {
    drawText(getReferral(name), 240, 522, `500 40px ${plex}`, white);
    let qr = new Image();
    qr.src = `./assets/${name}.png`;
    qr.onload = () => {
        context.drawImage(qr, 114, 459, 102, 102);
        openImg();
    }
}

function openImg() {
    // document.querySelector('.container').appendChild(canvas);
    canvas.toBlob((blob) => {
        window.open(URL.createObjectURL(blob));
    });
}