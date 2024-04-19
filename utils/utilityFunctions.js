export const convertDateTime = (date) => {
    return date.toISOString().substring(0, 10);
}
