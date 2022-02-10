const plex = "'BinanceRegular', Arial, sans-serif";
const plexCondensed = "'BinanceMedium', Arial, sans-serif";
const plexComma = "'IBM Plex Sans', sans-serif";
const white = '#ffffff';
const red = '#f6465d';
const green = '#0ecb81';
const yellow = '#f0b90b';
const CLIENTS = [
    {
        name: 'Мальцев',
        id: '39672901',
    },
    {
        name: 'Доронин',
        id: '44632377',
    },
    {
        name: 'Шевченко',
        id: '32783012',
    },
    {
        name: 'Александр(Санта)',
        id: '354277848',
    },
    {
        name: 'Брагин',
        id: '174608558',
    },
    {
        name: 'Беспалов',
        id: '143990080',
    },
    {
        name: 'Диденко',
        id: '61836051',
    },
    {
        name: 'Клиент1',
        id: '45542939',
    },
];

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

        drawText(fields['xxx'].value, fields['xxx'].value.length === 3 ? 312 : 302, 213, `400 30px ${plex}`, white);

        drawText(fields['coin'].value.toUpperCase() + '  Бессрочный', 430, 213, `400 30px ${plex}`);

        drawText(`+${fields['percent'].value} %`, 115, 315, `400 95px ${plexCondensed}`, green);

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
    if (text && text.includes(',')) {
        measureComma(text, x, y, font);
    } else {
        context.fillText(text, x, y);
    }
}

function getReferral(name) {
    switch (name) {
        case 'Мальцев': return '39672901'
        case 'Доронин' : return '44632377'
        case 'Шевченко' : return '32783012'
        case 'Александр(Санта)' : return '354277848'
        case 'Брагин' : return '174608558'
        case 'Беспалов' : return '143990080'
        case 'Диденко' : return '61836051'
        case 'Клиент1' : return '45542939'
        case 'Клиент2' : return '173867694'
        case 'Клиент3' : return '185340163'
        case 'Клиент4' : return '204108810'
        case 'Клиент5' : return '159585839'
        case 'Клиент6' : return '38740560'
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
        window.open(URL.createObjectURL(blob), '_self');
    });
}

function measureComma(text, x, y, font) {
    let arr = text.split(',');
    let numWidth = context.measureText(arr[0]).width;
    let commaWidth = context.measureText(',').width;
    context.fillText(arr[0], x, y);
    context.font = `400 ${font.split(' ')[1]} ${plexComma}`;
    context.fillText(`,`, x + numWidth, y);
    context.font = font;
    context.fillText(arr[1], x + numWidth + commaWidth, y);
}

// function setClients() {
//     const ref = document.querySelector('#referral');
//     CLIENTS.forEach(client => {
//         document.createElement()
//     })
// }