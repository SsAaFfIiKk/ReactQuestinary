import React from 'react'

class Instructions {

    static zaslonIns() {
        return (
            <div>
                <p><span>Ограничение по времени: 15 минут</span></p>
                <p>Выберите один наиболее подходящий для вас вариант ответа в каждом приведенном утверждении.
                </p>
            </div>
        )
    }

    static luscjerIns() {
        return (
            <div>
                <p><span>Время прохождения не ограничено</span></p>
                <p>Во время прохождения теста Вам необходимо выбрать из предложенных восьми цветов тот, который больше всего нравится. Вы должны выбрать цвет как таковой, не пытаясь соотнести его с любимым цветом в одежде, цветом глаз и т. п. Выберите наиболее приятный цвет из восьми и нажмите на него. После нажатия прямоугольник сменит цвет на белый. Повторяйте эту процедуру до тех пор, пока все прямоугольники не перекрасятся в белый. Затем повторите прохождение для второго набора карточек, который появится после работы с первым
                </p>
            </div>
        )
    }

    static bigIns() {
        return (
            <div>
                <p><span>Время прохождения не ограничено</span></p>
                <p>Оцените каждое утверждение по шкале от 1 до 7, где 1 - полностью не согласен, 7 - полностью согласен.</p>
            </div>
        )
    }

    static vosIns() {
        return (
            <div>
                <p><span>Время прохождения не ограничено</span></p>
                <p>Распределите 10 баллов в каждом блоке утверждений, которые, по вашему мнению, лучше всего описывают ваше поведение. Баллы необходимо распределить по нескольким утверждениям. В исключительных случая баллы можно распределить между всеми утверждениями  или все десять баллов поставить напротив одного утверждения. Внесите баллы в таблицу. </p>
            </div>
        )

    }

    static omoIns() {
        return (
            <div>
                <p><span>Время прохождения не ограничено</span></p>
                <p>Опросник межличностных ориентаций предназначен для оценки типичных способов Вашего взаимодействия с коллегами. Некоторые вопросы очень похожи друг на друга. Но все-таки они подразумевают разные вещи. Отвечайте, пожалуйста, на каждый вопрос отдельно, без оглядки на другие вопросы. </p>
            </div>
        )
    }

    static kompIns() {
        return (
            <div>
                <p><span>Время прохождения не ограничено</span></p>
                <p>Для каждого вопросы выберите один или несколько подходящих для Вас вариантов ответов.</p>
            </div>
        )
    }

    static ankIns() {
        return (
            <div>
                Пожалуйста, заполните представленные в данной анкете поля. Если у Вас отсутствуют необходимые для заполнения данные, например Вы не зарегистрированы в системе Orcid, оставьте соответствующее поле пустым.
            </div>
        )
    }

    static interIns() {
        return (
            <div>
                <p>
                    Целью онлайн-интервью является уточнение Ваших компетенций для последующего формирования
                    команд исполнителей научных проектов. 
                </p>
                <p>
                    В ходе него Вам будет предложен ряд вопросов, при составлении которых основное внимание уделялось
                    тем темам, которые наиболее существенны для работы в команде. Вопросы разбиты на 3 блока.
                </p>
                <ol>
                    <li>
                        <span>Сфера профессиональных компетенций. </span>
                        Данный блок вопросов оценивает осознание собственного профессионализма и возможность
                        эффективно представлять его другим.
                    </li>
                    <li>
                        <span>Работа в команде. </span>
                        Данный блок оценивает желание в полной мере участвовать в работе в команде, готовность
                        внести эффективный вклад в работу команды.
                    </li>
                    <li>
                        <span>Коммуникация. </span>
                        Данный блок оценивает способность выражать идеи или факты в ясной и убедительной манере.
                    </li>
                </ol>
                <p>
                    <span>
                        Ответы на вопросы должны быть искренними, содержательными и подкреплены аргументами
                        (фактами, примерами из Вашего личного опыта).          
                    </span>
                </p>
                <p>
                    ВАЖНО: между указанными блоками будут вопросы, при ответе на которые необходимо сказать неправду.
                    Такие вопросы буду отмечены специальным красным индикатором с надписью <span>&#171;соврите&#187;</span>.
                    Необходимо дать ответ, в точности противоположный вашему мнению, и попытаться обосновать, почему же именно
                    так (т.е. говорить неправду в течение всего вопроса). 

                </p>
                <p>
                    После нажатия кнопки <span>&#171;Начать интервью&#187;</span> появится окно, которое будет транслировать
                    видеозапись с Вашей камеры. Чуть ниже будет отражаться текущий вопрос, на который Вам необходимо ответить.
                    Внимательно прочитайте вопрос и когда будете готовы отвечать, нажмите кнопку <span>&#171;Начать ответ&#187;</span>.
                    После ответа на вопрос необходимо нажать на кнопку <span>&#171;Cледующий вопрос&#187;</span>, после чего появится
                    новый вопрос. После ответа на все вопросы появится кнопка <span>&#171;Завершить интервью&#187;</span>, по нажатию
                    на которую видеозапись ответа завершится. 
                </p>
                <p>
                    <span>Технические требования к онлайн-интервью</span>
                </p>
                <ol>
                    <li>
                        В кадр должно полностью попадать Ваше лицо. Лицо должно быть отчетливо видно, камера должна
                        быть не сильно далеко от Вас. Изображение лица должно быть четким, строго в анфас.
                    </li>
                    <li>
                        Положение камеры. Вы должны находиться перпендикулярно камере, желательно чтобы камера
                        находилась на уровне глаз. В случае, если камера расположена сбоку от Вас, то после
                        прочтения ответа повернитесь в камеру и давайте ответ, глядя в ее объектив.
                    </li>
                    <li>
                        Качественное освещение. Направьте камеру так, чтобы не было засвеченных участков. 
                        Уберите источники света в кадре (ими могут быть лампы, свет из окна). 
                    </li>
                    <li>
                        Обстановка и внешний фон. Для прохождения видеоинтервью потребуется 15-20 минут,
                        выберите спокойное и комфортное место, чтобы Вас ничего не отвлекало
                        (шум, какие-то посторонние предметы и т.д.)
                    </li>
                </ol>
                <p>
                    Если у Вас остались вопросы, Вы заметили какие-то неточности в работе сервиса
                    или произошел технический сбой, пожалуйста, напишите об этом на адрес электронной почты &nbsp;
                    <a href="mailto:mycandy.date@aol.com">mycandy.date@aol.com</a>.
                </p>
                <p>
                    Спасибо за участие и помощь в создании помощника "Аватар". Успехов!
                </p>
            </div>
        )
    }
}

export default Instructions;