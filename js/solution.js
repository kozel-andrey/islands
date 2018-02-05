(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        //Длина островов
        var X = map[0].length;
        var islandIndexes = completeIslandIndexes(map, X);
        return calculateLandsCount(islandIndexes, X);
    }

    /**
     * Функция перебирает по порядку все острова и добавляет в Set потенциально возможные острова
     * если како-либо из перебираемых остров содержится в сете - то он является частью другого острова
     *
     * @param {number[]} islandIndexes упорядоченные индексы островов
     * @param {number} X ширина карты
     * @return {number} количество островов
     */
    function calculateLandsCount(islandIndexes, X) {
        var lands = 0;
        var nearestLand = new Set();
        islandIndexes.forEach(function(island) {
            if(!nearestLand.has(island)) {
                lands++;
            }
            nearestLand.add(island);
            if(!isLastInRow(island, X)) {
                nearestLand.add(island + 1);
            }
            nearestLand.add(island + X);
        });
        return lands;
    }

    function isLastInRow(island, X) {
        return (island + 1) % X == 0;
    }

    /**
     * Функция выбирает все острова и возвращает упорядоченный массив из их порядковых номеров
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @param {number} X ширина карты
     * @returns {number[]} индексы островов
     */

    function completeIslandIndexes(map, X) {
        var islandIndexes = [];

        map.forEach(function (row) {
            var offset = map.indexOf(row) * X;
            addIslandToArray(row, offset, islandIndexes);
        });

        return islandIndexes;
    }

    /**
     *
     * @param {number[]} row ряд из карты.
     * @param {number} offset отступ от первой ячейки
     * @param {number[]} islandIndexes массив значений, в который добавляются индексы найденных островов
     * добавляет порядковый номер острова из ряда к массиву островов
     */
    function addIslandToArray(row, offset, islandIndexes) {
        for (var cellIndex = 0; cellIndex < row.length; cellIndex++) {
            if (row[cellIndex] == ISLAND) {
                islandIndexes.push(offset + cellIndex);
            }
        }
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
