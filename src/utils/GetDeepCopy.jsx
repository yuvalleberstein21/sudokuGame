export default function GetDeepCopy(arr) {
    //Convert the array to a JSON string and then parse it back to an object
    return JSON.parse(JSON.stringify(arr));
}