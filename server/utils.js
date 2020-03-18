exports.pad = function (string, length) {
    if (string.length < length) {
        return 0 + exports.pad(string, length-1);
    } else {
        return string;
    }
}