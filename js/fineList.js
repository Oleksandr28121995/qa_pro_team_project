"use strict";
window.fineList = {
    searchFines : searchFines
}

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

function searchFines(searchKey) {
    const normalizedSearchKey = searchKey.normalize().toLowerCase().trim();
    // Визначаємо, чи введений рядок може бути номером штрафу
    const isNumberFormat = /^\d+$/.test(normalizedSearchKey); // Припускаємо, що номери штрафів складаються лише з цифр

    const filteredFines = DB.filter(fine => {
        const normalizedFineNumber = fine.номер.normalize().toLowerCase().trim();
        const normalizedFineType = fine.тип.normalize().toLowerCase().trim();

        // Якщо searchKey відповідає формату номера штрафу, проводимо пошук лише за номером
        if (isNumberFormat) {
            return normalizedFineNumber === normalizedSearchKey;
        } 
        // В іншому випадку вважаємо, що пошук здійснюється за типом штрафу
        else {
            return normalizedFineType.includes(normalizedSearchKey) && !isNumberFormat;
        }
    });

    return filteredFines;
}

