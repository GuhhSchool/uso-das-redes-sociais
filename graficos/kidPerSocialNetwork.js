import { getCssVar, tickDefaultStyle } from './common.js';

async function get() {
    const dados = {
        Youtube: 88,
        Whatsapp: 78,
        Instagram: 66,
        TikTok: 63,
        Facebook: 41,
    };

    const redesArray = Object.keys(dados);
    const valuesArray = Object.values(dados);

    const data = [
        {
            x: redesArray,
            y: valuesArray,
            type: 'bar',
            marker: { color: getCssVar('--color-link') }
        }
    ];

    const layout = {
        plot_bgcolor: getCssVar('--bg-color'),
        paper_bgcolor: getCssVar('--bg-color'),
        
        title: {
            text: 'Porcentagem de Redes Sociais usadas por adolecentes',
            font: {
                color: getCssVar('--color-secundary'),
                family: getCssVar('--font'),
                size: '30',
            }
        },
        
        xaxis: tickDefaultStyle('Nome das Redes Sociais'),
        yaxis: tickDefaultStyle('Porcentagem de adolecentes (%)'),
    };

    const graphicElement = document.createElement('div');
    const divGraphsElement = document.getElementsByClassName('graficos__container')[0];
    graphicElement.classList.add('grafico');
    divGraphsElement.appendChild(graphicElement);
    Plotly.newPlot(graphicElement, data, layout);
}

get();