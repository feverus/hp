import $ from 'jquery';

export function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}

export function findLongestWord(str) {
  var longestWord = str.split(' ').reduce(function(longest, currentWord) {
    return currentWord.length > longest.length ? currentWord : longest;
  }, "");
  return longestWord.length;
}

export function pxWidth(text,size) {
	$('#winsbartest').html(text);
	$('#winsbartest').css('font-size', size);
	//console.log(text+' '+size+' '+$('#winsbartest').width());
	return $('#winsbartest').width();
}

export function toClipboard(text) {
  window.navigator.clipboard.writeText(text)
    .then(() => console.log('copy>>'+text))
    .catch((err) => console.error(err));
}

//преобразователи цвета
export function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

  return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

export function hex2rgb(c) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 1
  } : null;
}

//генератор имен для новых игроков
export function nameGen() {
  var a=["Активный", "Азартный", "Амбициозный", "Бодрый", "Быстрый", "Боевой", "Башковитый", "Благонадежный", "Возвышенный", "Великолепный", "Веселый", "Величественный", "Всезнающий", "Громкий", "Грозный", "Грациозный", "Говорливый", "Гордый", "Деловой", "Добрый", "Дружелюбный", "Динамичный", "Доминирующий", "Едкий", "Естественный", "Ехидный", "Живой", "Жизнерадостный", "Жадный", "Жгучий", "Жесткий", "Заводной", "Задорный", "Задумчивый", "Здравомыслящий", "Знающий", "Ироничный", "Инициативный", "Интеллектуальный", "Интуитивный", "Красивый", "Коммуникабельный", "Красноречивый", "Колоритный", "Любвеобильный", "Ласковый", "Лидирующий", "Легкомысленный", "Лиричный", "Мужественный", "Молчаливый", "Мудрый", "Максималист", "Надежный", "Настойчивый", "Нежный", "Необъяснимый", "Насмешливый", "Общительный", "Ответственный", "Обаятельный", "Отзывчивый", "Осторожный", "Прямой", "Прямодушный", "Плавный", "Позитивный", "Покладистый", "Рассудительный", "Расточительный", "Рачительный", "Рисковый", "Разговорчивый", "Сознательный", "Сосредоточенный", "Свободолюбивый", "Сострадательный", "Трудолюбивый", "Тактичный", "Творческий", "Требовательный", "Терпеливый", "Упрямый", "Упорный", "Умный", "Усердный", "Уязвимый", "Флегматичный", "Феноменальный", "Харизматичный", "Хладнокровный", "Хлебосольный", "Хозяйственный", "Целеустремленный", "Цепкий", "Цельный", "Церемонный", "Цивилизованный", "Честный", "Честолюбивый", "Чинный", "Чувствительный", "Широкий", "Шумный", "Шустрый", "Шаловливый", "Щедрый", "Щепетильный", "Экстравагантный", "Эксклюзивный", "Экспрессивный", "Экономный", "Эрудированный", "Юный", "Юркий", "Язвительный", "Яркий", "Яростный", "Находчивый", "Опытный", "Меткий", "Беспечный", "Тёмный", "Безумный", "Удачливый", "Симпатичный", "Забавный"];
  var b=["авантюрист", "актёр", "алхимик", "аристократ", "ассасин", "астроном", "бард", "боец", "боярин", "бродяга", "бунтарь", "ведьмак", "воин", "волшебник", "вор", "всадник", "гвардеец", "герой", "гладиатор", "гном", "гонщик", "граф", "гробовщик", "дворянин", "десница короля", "детектив", "дипломат", "дух", "защитник", "злодей", "игрок", "исследователь", "коллекционер", "контрабандист", "конюх", "король", "кочевник", "крестьянин", "кузнец", "купец", "лесоруб", "лич", "лорд", "лучник", "людоед", "маг", "мастер", "менестрель", "мертвец", "мечник", "монах", "моряк", "мудрец", "мясник", "наёмник", "некромант", "орк", "оружейник", "охотник", "охотник за головами", "паладин", "палач", "пекарь", "пивовар", "пират", "плут", "повар", "посредник", "поэт", "правитель", "привратник", "пророк", "профессор", "путник", "разбойник", "рыбак", "рыцарь", "священник", "скелет", "следопыт", "советник", "солдат", "стражник", "странник", "судья", "телохранитель", "торговец", "травник", "ученик", "учитель", "фермер", "хозяин", "хранитель", "целитель", "чемпион", "шаман", "шпион", "эльф", "ювелир"];  
  return a[Math.floor(Math.random() * a.length)]+' '+b[Math.floor(Math.random() * b.length)];
}
