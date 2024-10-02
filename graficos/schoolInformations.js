import { createGraphic, getCssVar, includeInfoText } from "./common.js";
const mainElement = document.querySelector('main');
const h1Element = document.createElement('h1');

async function get() {
    const dadosLocais = localStorage.getItem('respostaRedesSociais');

    if (dadosLocais) {
        const dados = JSON.parse(dadosLocais);
        processarDados(dados);
    }

    else {
        loading();
        const path = 'https://script.googleusercontent.com/macros/echo?user_content_key=b2wOxT4aiaE00mTHvoHlLB1wSk763zCIXba18UjG7eMu37L5VHnpGgN5HBz_E3Hj8vl12FG-PQKUI9AMNLtbjOde_AW8Ppb6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnH8efq-jK4DKAya2yH6T2u6FecSr86LZIT_k_whirv1ZEdjPteqs7yUfsmKZ3XN6heVGVprAhgpCDts600fKmuy22-MiZnusMw&lib=MeMRlnQqjazq57HlgIw4KwJ4xdzIA2VTK';
        const dados = await fetch(path).then(res => res.json());
        localStorage.setItem('respostaRedesSociais', JSON.stringify(dados));
        mainElement.removeChild(h1Element);
        processarDados(dados);
    }
}

function processarDados(dados) {
    const favoriteNetwork = dados.slice(1).map(redes => redes[1]);
    const reasonToUse = dados.slice(1).map(redes => redes[2]);

    const formattedFavNet = convert(favoriteNetwork);
    const formattedUse = convert(reasonToUse);
    
    ShowFavoriteNetwork(formattedFavNet);
    ShowReasonToUse(formattedUse);

    function convert(obj) {
        let newObj = obj.reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
        }, {}); 
        newObj = Object.fromEntries(
            Object.entries(newObj).sort(([,a],[,b]) => b-a)
        );
        return newObj;
    }
} 

function ShowFavoriteNetwork(dados) {
    const namesArray = Object.keys(dados);
    const valuesArray = Object.values(dados);
    const userCount = valuesArray.reduce((v, cur) => v + cur, 0);

    const data = [
        {
            labels: namesArray,
            values: valuesArray,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ]

    const layout = {
        plot_bgcolor: getCssVar('--bg-color'),
        paper_bgcolor: getCssVar('--bg-color'),
        height: 600,

        title: {
            text: 'Redes sociais favoritas na minha escola',
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

    includeInfoText(`Assim como no mundo, ${userCount} alunos do <span>Colégio Estadual Professora Edithe</span> responderam o formulário e concluiram que o <span>Instagram</span> é a rede social favorita deles.`);
    createGraphic(data, layout);
}

function ShowReasonToUse(dados) {
    const namesArray = Object.keys(dados);
    const valuesArray = Object.values(dados);
    const userCount = valuesArray.reduce((v, cur) => v + cur, 0);

    const data = [
        {
            x: namesArray,
            y: valuesArray,
            type: 'bar',
        }
    ]

    const layout = {
        plot_bgcolor: getCssVar('--bg-color'),
        paper_bgcolor: getCssVar('--bg-color'),

        title: {
            text: 'Motivos de usar as redes sociais',
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
    includeInfoText(`Essa estatística mostra os principais motivos de usarem as redes sociais listadas no gráfico anterior.`);
}


async function loading() {
    h1Element.innerText = 'Carregando Dados...';
    mainElement.appendChild(h1Element);
}

get();