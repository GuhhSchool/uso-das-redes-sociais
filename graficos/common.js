export const getCssVar = (value = '') => getComputedStyle(document.body).getPropertyValue(value);

export const tickDefaultStyle = (text = '') => {
    return {
        title: {
            text: text,
            font: {
                color: getCssVar('--color-text'),
            }
        },
        tickfont: {
            color: getCssVar('--color-tick'),
            size: 16
        }
    }
}; 