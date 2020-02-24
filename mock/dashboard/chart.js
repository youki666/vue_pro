function chart(method) {
    let res = null;
    switch (method) {
        case 'GET':
            res = [80,15,45,67,89,33];
            break;
        case 'POST':
            res = [80,55,45,60,89,33];
            break;
        default:
            res = null;
    }
    return res
}

module.exports = chart;