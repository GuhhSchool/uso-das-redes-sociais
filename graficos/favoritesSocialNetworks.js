import { createGraphic, getCssVar, includeInfoText } from "./common.js";

async function get() {
    const path = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/redes-favoritas.json';
    const dados = await fetch(path).then(res => res.json());
    
    const namesArray = Object.keys(dados);
    const valuesArray = Object.values(dados);

    const data = [  
        {
            values: valuesArray,
            labels: namesArray,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ];

    const layout = {
        plot_bgcolor: getCssVar('--bg-color'),
        paper_bgcolor: getCssVar('--bg-color'),
        height: 600,
        
        title: {
            text: 'Redes sociais favoritas',
            font: {
                color: getCssVar('--color-secundary'),
                family: getCssVar('--font'),
                size: '30',
            }
        },
        legend: {
            font: {
                color: getCssVar('--color-text'),
                size: 16
            }
        }
    };

    createGraphic(data, layout);

    includeInfoText(`Embora o <span>Facebook</span> seja a rede social mais usada no mundo, percebe-se que o <span>Instagram</span> é a favorita pelos usuários com base em dados globais, seguida de <span>Whatsapp</span> e <span>Facebook</span>.`)
}

get();