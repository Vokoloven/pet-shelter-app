export const px2vw = (size: number, width: number = 1440): string =>
    `${(size / width) * 100}vw`

export const innerHight = `${window.innerHeight - 85}px`
