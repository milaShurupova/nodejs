module.exports = {
    
    dateToString(input) {
        
        const year = input.getFullYear().toString();
        const month = (input.getMonth() + 1).toString().padStart(2, "0");
        const date = (input.getDate()).toString().padStart(2, "0");
        const hour = (input.getHours()).toString().padStart(2, "0");
        const minute = (input.getMinutes()).toString().padStart(2, "0");
        const second = (input.getSeconds()).toString().padStart(2, "0");

        return `${year}${month}${date} ${hour}:${minute}:${second}`
    }
}