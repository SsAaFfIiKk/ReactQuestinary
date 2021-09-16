import React, { Component } from 'react'
import "../css/AboutSelf.css"

export default class AboutSelf extends Component {
    render() {
        return (
            <div>
                <div className="instruction">
                    <p>Инструкция: </p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa amet augue mattis eleifend elit eros fermentum. Tellus pellentesque nunc id nisl mauris vitae, quis tincidunt pharetra. Ultricies eget nibh nunc leo morbi lacus tempor urna purus. Amet, dui mauris, molestie nunc, sit ut. Vivamus semper id amet mauris. Nunc urna et consequat fames sit. Morbi urna, dapibus euismod nulla sem sem morbi dui. In sapien fames integer morbi eget. Leo nulla eros ac elementum gravida enim vestibulum porttitor faucibus.
                </div>
                <form method="POST">
                    <div>
                        <p>Elibray id</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Scopus id</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Orcid id</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Ссылка на VK</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Ссылка на Instagram</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Ссылка на Facebook</p>
                        <input type="text"></input>
                    </div>
                    <div>
                        <p>Возраст</p>
                        <input type="number" min="1" max="100"></input>
                    </div>
                    <div>
                        <p>Пол</p>
                        <label htmlFor="1">Мужкской</label>
                        <input type="radio" name="gender" value="male" id="1"></input>
                        <label htmlFor="2">Женский</label>
                        <input type="radio" name="gender" value="female" id="2"></input>
                    </div>
                    <div>
                        <p>Курс</p>
                        <input type="number"></input>
                    </div>
                    <div>
                        <p>Образование</p>
                        <label htmlFor="3">Бакалавр</label>
                        <input type="radio" name="kurs" value="bak" id="3"></input>
                        <label htmlFor="4">Магистр</label>
                        <input type="radio" name="kurs" value="mag" id="4"></input>
                    </div>
                    <div>
                        <p>Факультет</p>
                        <input type="text"></input>
                    </div>
                    <button type="submit"> Отправить</button>
                </form>
            </div>
        )
    }
}