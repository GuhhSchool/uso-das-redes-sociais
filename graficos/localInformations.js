
async function get() {
    const text = 'Em um estudo realizado pela TIC Kids Online Brasil 2023, foi mostrado que pelo menos <span>88%</span> dos jovens entre <span>9 a 17 anos</span> possuem alguma rede social.'
    const containerElement = document.getElementsByClassName('graficos__container')[0];
    const pElement = document.createElement('p');
    

    pElement.classList.add('graficos__p');
    pElement.innerHTML = text;
    containerElement.appendChild(pElement);
}

await get()