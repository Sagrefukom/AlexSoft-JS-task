function getNamesList() {
    let names = [];
    fetch('./list.json')
        .then(result => result.json())
        .then(json => {
            json.forEach((item, i) => names[i] = item.name);
        });

    return names;
}

let namesList = getNamesList();

function randLetter() {
    let chars = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function randLettersByAmount(amount) {
    let letters = [];

    for (let i = 0; i < amount; i++) {
        letters[i] = randLetter();
    }

    return letters;
}

function appendOptions(select, optionValues) {
    for (i = 0; i < optionValues.length; i++) {
        let option = document.createElement('option');

        option.value = optionValues[i];
        option.text = optionValues[i];

        select.appendChild(option);
    }
}

let select = document.getElementById('select');
let results = document.getElementById('results');
let letters = randLettersByAmount(5);

appendOptions(select, letters)

select.addEventListener('change', (e) => {
    let selectedValue = e.target.value.toUpperCase();

    results.innerHTML = '';
    namesList.forEach(name => {
       if (false === name.startsWith(selectedValue)) {
           return;
       }

       let nameElement = document.createElement('li');
        nameElement.value = name;
        nameElement.textContent = name;

        results.appendChild(nameElement);
    });

    if (results.innerHTML.length === 0) {
        results.innerHTML = 'No matches...';
    }


});