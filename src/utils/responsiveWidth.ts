export const px2vw = (size: number, width: number = 1440): string =>
    `${(size / width) * 100}vw`

export const px2vh = (size: number, width: number = 1440): string =>
    `${(size / width) * 100}vh`
