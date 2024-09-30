const path = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/dados-globais.json';

async function get() {
    const dados = await fetch(path)
        .then(res => res.json());
    
    const pessoasConectadas = (dados.total_pessoas_conectadas / 1e9);
    const pessoasMundo = (dados.total_pessoas_mundo / 1e9);
    const horasConectadas = parseInt(dados.tempo_medio);
    const minutosConectados = Math.round((dados.tempo_medio - horasConectadas) * 60);
    const porcentagemConectadas = (100 * pessoasConectadas / pessoasMundo).toFixed(2);

    const containerElement = document.getElementsByClassName('graficos__container')[0];
    const pElement = document.createElement('p');

    pElement.classList.add('graficos__p');
    pElement.innerHTML = `Você sabia que o mundo tem <span>${pessoasMundo} bilhões </span> pessoas e que aproximadamente <span>${pessoasConectadas} bilhões</span> estão conectadas em alguma rede social, que passam em média <span>${horasConectadas} horas</span> e <span>${minutosConectados} minutos</span> conectadas por dia?<br/><br/>Isso significa que pelo menos <span>${porcentagemConectadas}%</span> das pessoas no mundo estão conectadas.`;
    containerElement.appendChild(pElement);
}

await get()