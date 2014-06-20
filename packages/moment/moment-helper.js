/**
 * Created by ec on 14-6-20.
 */
Package.ui.UI.registerHelper('moment', function (time,format) {
    if(time == void(0)){
        return '';
    }
    if(typeof time === 'number'){
        return moment(time).format(format)
    }
    if(typeof time === 'string'){
        return moment(time,format)
    }
});