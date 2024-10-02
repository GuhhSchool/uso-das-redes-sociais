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

export const createGraphic = (data, layout) => {
    const graphicElement = document.createElement('div');
    const divGraphsElement = document.getElementsByClassName('graficos__container')[0];
    const config = { 
        responsive: true,
        displayModeBar: false,
    }
    
    graphicElement.classList.add('grafico');
    divGraphsElement.appendChild(graphicElement);
    Plotly.newPlot(graphicElement, data, layout, config);
};

export const includeInfoText = (innerHTML) => {
    const container = document.querySelector('.graficos__container');
    const pElement = document.createElement('p');
    pElement.classList.add('graficos__p');
    pElement.innerHTML = innerHTML;
    container.appendChild(pElement);
};