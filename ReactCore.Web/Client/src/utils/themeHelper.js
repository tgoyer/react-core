export const color = {
    brightness: (colorHex, amount) => {
        const usePound = (colorHex[0] === "#");
  
        if (usePound) {
            colorHex = colorHex.slice(1);
        }
     
        const num = parseInt(colorHex, 16);
        let b = ((num >> 8) & 0x00FF) + amount;
        let g = (num & 0x0000FF) + amount;
        let r = (num >> 16) + amount;
     
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
     
        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
     
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
}

export default {
    color
}