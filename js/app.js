const calcForm = document.querySelector('.calc__form')
const inputs = document.querySelectorAll('.calc__form input')
const choosePackage = document.querySelector(".calc__select")
const calcSummaryLis = document.querySelectorAll('.calc__summary ul > li')
console.log(calcSummaryLis)
const totalPrice = document.querySelector('.summary__total')

const accountingPrice = 35;
const terminalPrice = 10;

choosePackage.addEventListener('click', basketCalculate)
calcForm.addEventListener('input', basketCalculate)

// ta funkcja, powoduję, że po wpisaniu czegoś w inputach, pokazuje się podsumowanie

function basketCalculate (e) {
    let finalPrice = 0;
    e.currentTarget.classList.toggle('open')

    // Obsługa rozwijanego menu
    if (e.target.tagName === 'LI') {
        e.currentTarget.firstElementChild.innerText = e.target.innerText;
        e.currentTarget.classList.remove('open')

    //Funkcja do wyświetlania wartości pakietu w podsumowaniu
        calcSummaryLis.forEach(function(li) {
            if (li.dataset.id === 'package') {
                li.classList.add('open');
                li.children[1].innerText = e.target.innerText;
                li.children[2].innerText = "$" + e.target.dataset.price;
            }
        })
    }

    // Dodawanie do podsumowania wartości wybranego pakietu
    let selectedPackage = choosePackage.firstElementChild.innerText;
    switch (selectedPackage) {
        case 'Basic':
            finalPrice += 0;
            break;
        case 'Professional':
            finalPrice += 25;
            break;
        case 'Premium':
            finalPrice += 60;
            break;
    }  
        
    inputs.forEach(function(input) {

        // Dodawanie do podsumowania wartości pobranych z inputów oraz zaznaczonych checkboxów
        if (input.checked || input.value !== '') {
            switch (input.id) {
                case 'products':
                    showSumming ('products', 0.50)
                    finalPrice += (parseFloat(input.value) * 0.50);
                    break;

                case 'orders':
                    showSumming ('orders', 1)
                    finalPrice += (parseFloat(input.value) * 1);
                    break;

                case 'accounting':
                    showSumming ('accounting', accountingPrice)
                    finalPrice += accountingPrice
                    break;
                
                case 'terminal':
                    showSumming ('terminal', terminalPrice)
                    finalPrice += terminalPrice
                    break;
            }

            //Funkcja do wyświetlania wartości w podsumowaniu
            function showSumming (id, itemPrice) {
                calcSummaryLis.forEach(function(li) {
                    if (li.dataset.id === id && input.type !== 'checkbox') {
                        li.classList.add('open');
                        li.children[1].innerText = `${input.value} * $${itemPrice.toFixed(2)}`;
                        li.children[2].innerText = '$' + ((input.value) * itemPrice).toFixed(2);
                        console.log('Ten input nie jest chechboxem')
                    }

                    //nie działa jak powinno
                    if ((li.dataset.id === id && input.type === 'checkbox' && input.checked)) {
                    
                        li.classList.add('open');
                        li.children[1].innerText = '$' + input.dataset.price;
                    }
                })
            }
        }

        // Odejmowanie od podsumowania wartości pobranych z inputów oraz odznaczonych checkboxów
        if (input.checked === false) {
            switch (input.id) {
                case 'accounting':
                    hideSumming ('accounting')
                    finalPrice -= accountingPrice
                    break;
                
                case 'terminal':
                    hideSumming ('terminal')
                    finalPrice -= terminalPrice
                    break;
            }

            //Funkcja do ukrywania wartości w podsumowaniu
            function hideSumming (id) {
                calcSummaryLis.forEach(function(li) {
                    if ((li.dataset.id === id && input.type === 'checkbox')) {
                        li.classList.remove('open');
                    }
                })
            }
        }
    })

    totalPrice.classList.add('open')
    totalPrice.lastElementChild.innerText = "$" + finalPrice.toFixed(2);
}
    




// TRZECIA WERSJA

// if (e.target.checked || e.target.value !== '') {
    //     calcSummaryLis.forEach(function(li) {
    //         if (e.target['id'] === li.dataset.id) {
    //             li.classList.add('open');

    //             switch (e.target['id']) {
    //                 case 'products':
    //                     li.children[1].innerText = `${e.target.value} * $0.50`;
    //                     li.children[2].innerText = '$' + ((e.target.value) * 0.50).toFixed(2);
    //                     finalPrice += (parseFloat((e.target.value) * 0.50));
    //                     break;

    //                 case 'orders':
    //                     li.children[1].innerText = `${e.target.value} * $0.80`;
    //                     li.children[2].innerText = '$' + ((e.target.value) * 0.80).toFixed(2);
    //                     finalPrice += (parseFloat((e.target.value) * 0.80))
    //                     break;

    //                 case 'accounting':
    //                     li.children[1].innerText = `$${accountingPrice}`;
    //                     finalPrice += accountingPrice
    //                     break;
                    
    //                 case 'terminal':
    //                     li.children[1].innerText = `$${terminalPrice}`;
    //                     finalPrice += terminalPrice
    //                     break
    //             }
    //         }
    //     })
    // }

    // if (e.target.checked === false) {
    //             calcSummaryLis.forEach(function(li) {
    //                 if (e.target['id'] === li.dataset.id && e.target['type'] === 'checkbox') {
    //                     console.log('checkbox znika')
    //                     li.classList.remove('open');
    //                 }
    //             })
    //         }





// DRUGA WERSJA

// function showDropmenu (e) {
//     e.currentTarget.classList.toggle('open')

//     if (e.target.tagName === 'LI') {
//         e.currentTarget.firstElementChild.innerText = e.target.innerText;
//         e.currentTarget.classList.remove('open')
//         totalPrice.classList.add('open')

//         calcSummaryLis.forEach(function(li) {
//             if (li.dataset.id === 'package') {
//                 li.classList.add('open');
//                 li.children[1].innerText = e.target.innerText;

//                 switch (e.target.innerText) {
//                     case 'Basic':
//                         li.children[2].innerText = '$0';
//                         finalPrice += 0;
//                         break;
//                     case 'Professional':
//                         li.children[2].innerText = '$25';
//                         finalPrice += 25;
//                         break;
//                     case 'Premium':
//                         li.children[2].innerText = '$60';
//                         finalPrice += 60;
//                         break;
//                 }
//             }
//         })
//     }
// }

// function showCalculation (e) {

//     if (e.target.checked || e.target.value !== '') {
//         console.log(e.target.value)
//         calcSummaryLis.forEach(function(li) {
//             if (e.target['id'] === li.dataset.id) {
//                 li.classList.add('open');

//                 switch (e.target['id']) {
//                     case 'products':
//                         li.children[1].innerText = `${e.target.value} * $0.50`;
//                         li.children[2].innerText = '$' + ((e.target.value) * 0.50).toFixed(2);
//                         finalPrice += (parseFloat((e.target.value) * 0.50));
//                         break;

//                     case 'orders':
//                         li.children[1].innerText = `${e.target.value} * $0.80`;
//                         li.children[2].innerText = '$' + ((e.target.value) * 0.80).toFixed(2);
//                         finalPrice += (parseFloat((e.target.value) * 0.80))
//                         break;

//                     case 'accounting':
//                         li.children[1].innerText = `$${accountingPrice}`;
//                         finalPrice += accountingPrice
//                         break;
                    
//                     case 'terminal':
//                         li.children[1].innerText = `$${terminalPrice}`;
//                         finalPrice += terminalPrice
//                         break
//                 }
//             }
//         })
//     }

//     if (e.target.checked === false) {
//         calcSummaryLis.forEach(function(li) {
//             if (e.target['id'] === li.dataset.id && e.target['type'] === 'checkbox') {
//                 console.log('checkbox znika')
//                 li.classList.remove('open');
//             }
//         })
//     }

//     totalPrice.classList.add('open')
//     totalPrice.lastElementChild.innerText = "$" + finalPrice;

// }





    // PIERWSZA WERSJA

    //     if ((e.target['id']) === 'products') {
    //     calcSummaryLis.forEach(function(li) {
    //         if (li.dataset.id === 'products') {
    //             li.classList.add('open');
    //             li.children[1].innerText = `${e.target.value} * $0.50`;
    //             li.children[2].innerText = '$' + ((e.target.value) * 0.50).toFixed(2);
    //             finalPrice += (parseFloat((e.target.value) * 0.50))
    //         }
    //     })
    // }

    // if ((e.target['id']) === 'orders') {
    //     calcSummaryLis.forEach(function(li) {
    //         if (li.dataset.id === 'orders') {
    //             li.classList.add('open');
    //             li.children[1].innerText = `${e.target.value} * $0.80`;
    //             li.children[2].innerText = '$' + ((e.target.value) * 0.80).toFixed(2);
    //             finalPrice += (parseFloat((e.target.value) * 0.80))
    //         }
    //     })
    // }

    // if (e.target.checked && e.target["id"] === "accounting") {
    //     calcSummaryLis.forEach(function(li) {
    //         if (li.dataset.id === 'accounting') {
    //             li.classList.add('open');
    //             li.children[1].innerText = `$${accountingPrice}`;
    //             finalPrice += accountingPrice;
    //         }
    //     })
    // }

    // if (e.target.checked && e.target["id"] === "terminal") {
    //     calcSummaryLis.forEach(function(li) {
    //         if (li.dataset.id === 'terminal') {
    //             li.classList.add('open');
    //             li.children[1].innerText = `$${terminalPrice}`;
    //             finalPrice += terminalPrice;
    //         }
    //     })
    // }

