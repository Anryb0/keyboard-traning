// Список клавиш, которые будут использоваться в игре
listKeys = ["A", "S", "D", "F", "G"];
let currentKey = ""; // Переменная для текущей падающей клавиши
let score = 0; // Переменная для хранения очков игрока
let timer = 5;
let lose = false;// Время, отведенное на каждую клавишу
let intervalId; // Идентификатор интервала для управления таймером
// Получаем элементы из HTML
const fallingKeyElement = document.getElementById("fallingKey");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const text = document.getElementById("information");
const spisok = document.getElementById("spisok");
fallingKeyElement.style.display = "none";

function KnopkaStart() {
  currentKey = ""; // Переменная для текущей падающей клавиши
  score = 0; // Переменная для хранения очков игрока
  timer = 5; // Время, отведенное на каждую клавишу
  intervalId; // Идентификатор интервала для управления таймером
  listKeys = ["A", "S", "D", "F", "G"];
  fallingKeyElement.style.display = "block";
  text.style.display = "none";
  scoreElement.innerText = "0";
  document.getElementById("A").style.display = "inline";
  document.getElementById("S").style.display = "inline";
  document.getElementById("D").style.display = "inline";
  document.getElementById("F").style.display = "inline";
  document.getElementById("G").style.display = "inline";
  lose = false;
  startGame();
}

// Функция для запуска игры
function startGame() {
  // Проверяем, остались ли клавиши в списке
  if (listKeys.length === 0) {
    text.innerText = "Игра окончена! Ваши очки: " + score;
    text.style.display = "block";
    lose = true;
    return; // Завершаем игру, если клавиши закончились
  }

  // Выбираем случайную клавишу из списка
  currentKey = listKeys[Math.floor(Math.random() * listKeys.length)];
  fallingKeyElement.textContent = currentKey; // Отображаем клавишу
  console.log(listKeys.indexOf(currentKey) + " " + currentKey);
  // Сбрасываем позицию падающей клавиши
  fallingKeyElement.style.top = "0px";
  fallingKeyElement.style.left = Math.random() * (300 - 50) + "px"; // Случайная горизонтальная позиция

  timer = 5; // Сбрасываем таймер на 5 секунд
  timerElement.textContent = timer; // Обновляем отображение таймера

  // Запускаем интервал для отсчета времени
  intervalId = setInterval(() => {
    timer--; // Уменьшаем таймер на 1 каждую секунду
    timerElement.textContent = timer; // Обновляем отображение таймера

    // Проверяем, истекло ли время
    if (timer <= 0) {
      text.innerText = "Время вышло! Игра окончена."; // Сообщаем игроку об окончании времени
      text.style.display = "block";
      clearInterval(intervalId); // Останавливаем интервал
      return; // Завершаем выполнение функции
    }

    // Перемещаем клавишу вниз на 5 пикселей
    fallingKeyElement.style.top =
      parseInt(fallingKeyElement.style.top) + 5 + "px";

    // Проверяем, не вышла ли клавиша за пределы контейнера
    if (parseInt(fallingKeyElement.style.top) > 500) {
      text.innerText = "Клавиша пропала! Игра окончена."; // Сообщаем игроку об окончании игры
      text.style.display = "block";
      clearInterval(intervalId); // Останавливаем интервал
      return; // Завершаем выполнение функции
    }
  }, 1000); // Интервал срабатывает каждую секунду
}

// Обработчик события нажатия клавиши на клавиатуре
function OnKeyDown(event) {
  if (lose != true) {
    // Проверяем, совпадает ли нажатая клавиша с текущей падающей клавишей
    if (event.key.toUpperCase() === currentKey) {
      score += timer; // Добавляем оставшееся время к очкам
      scoreElement.textContent = score; // Обновляем отображение очков
      delkey = document.getElementById(currentKey);
      delkey.style.display = "none";
      // Убираем нажатую клавишу из списка, чтобы она больше не появлялась
      listKeys.splice(listKeys.indexOf(currentKey), 1);

      clearInterval(intervalId); // Останавливаем текущий интервал
      startGame(); // Запускаем новую игру с новой клавишей
    }
  }
}
document.addEventListener("keydown", OnKeyDown);



