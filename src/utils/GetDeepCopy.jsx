export default function GetDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
}