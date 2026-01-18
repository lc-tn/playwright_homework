export function formatPrice(price: string) {
    return Number(price.match(/\d+/)?.[0])
}