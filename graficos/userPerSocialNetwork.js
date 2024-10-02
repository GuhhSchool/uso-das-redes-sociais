import { createGraphic, getCssVar, tickDefaultStyle } from './common.js';
const path = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/numero-usuarios.json';

async function get() {
    const dados = await fetch(path).then(res => res.json());
    const redesArray = Object.keys(dados);
    const valuesArray = Object.values(dados);

    const data = [
        {
            x: redesArray,
            y: valuesArray,
            type: 'bar',
            marker: {
                color: getCssVar('--color-link'),
            }
        }
    ];

    const layout = {
        plot_bgcolor: getCssVar('--bg-color'),
        paper_bgcolor: getCssVar('--bg-color'),
        
        title: {
            text: 'Redes sociais mais usadas no mundo',
            font: {
                color: getCssVar('--color-secundary'),
                family: getCssVar('--font'),
                size: '30',
            }
        },
        
        xaxis: tickDefaultStyle('Nome das Redes Sociais'),
        yaxis: tickDefaultStyle('Quantidade de usuários'),
    };

    createGraphic(data, layout);

    
}

get();