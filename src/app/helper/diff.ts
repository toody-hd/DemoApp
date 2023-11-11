export function symmetricDiff(firstArray: string[], secondArray: string[]) {
    return [
        ...firstArray.filter(el1 => !secondArray.includes(el1)),
        ...secondArray.filter(el2 => !firstArray.includes(el2))
    ]
}