






export interface DateInterface{
    dataString(data:Date | string | number | undefined):string;
    dataNameString(data:Date | string | number | undefined):string;
    dataMinuteString(data:Date | string | number | undefined):string;
}

const MOUNT = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'

];



export let DateUtils:DateInterface = {
    dataString(data: Date | string | number | undefined): string {
        data = getDate(data);
        return `${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}`;
    },
    dataNameString(data: Date | string | number | undefined): string {
        data = getDate(data);
        return `${MOUNT[data.getMonth()]} ${data.getDate()}`;
    },
    dataMinuteString(data: Date | string | number | undefined): string {
        data = getDate(data);
        return `${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()} ${data.getHours()}:${data.getMinutes()}`;
    }
}


function getDate(data: Date | string | number | undefined):Date{
    if (data === undefined) return  new  Date();
    if( typeof data === "string") data = new Date(data);
    if(typeof data === "number") data = new Date(data);
    return  data;
}
