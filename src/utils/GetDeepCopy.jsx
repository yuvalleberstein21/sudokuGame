export default function GetDeepCopy(arr) {
    //ensure that the value is interpreted as an integer.
    return JSON.parse(JSON.stringify(arr));
}