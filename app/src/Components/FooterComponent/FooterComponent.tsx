import { FC } from "react"
import classes from './FooterComponent.module.scss'
import logo from '../../assets/icon/logo.svg'
import gostLogo from '../../assets/icon/gostLogo.svg'
import MainBtn from "Components/MainBtn/MainBtn"
import data from '../../data/test/footerItems.json'
import { Link } from "react-router-dom"
import { FilePdfOutlined, InfoCircleOutlined, VideoCameraOutlined, YoutubeOutlined } from "@ant-design/icons"


const FooterComponent: FC = () => {

    return (
        <footer className={classes.footer}>
            <div className={classes.footer_top}>
                <div className={classes.footer_top_contact}>
                    <div><img src={logo} alt="" /></div>
                    <div>
                        <h1>8 800 841-95-95</h1>
                        <h2>Служба поддержки</h2>
                    </div>
                    <div>
                        <h1>support@sport.ru</h1>
                        <h2>Служба поддержки</h2>
                    </div>
                </div>
                <div className={classes.footer_top_nav}>

                    <h1>Вакансии</h1>
                    <h1>Блог</h1>
                    <h1>Акции</h1>
                    <MainBtn title="Предложить  идею" />

                </div>
            </div>
            <div className={classes.footer_main}>
                {
                    data.map((item, index) => <div key={index} className={classes.footer_main_col}>
                        <h1>{item.title}</h1>
                        <div>
                            {item.items.map((item, index) => <Link key={index} to={item.href}><h2>{item.title}</h2></Link>)}
                        </div>
                    </div>)
                }
            </div>
            <div className={classes.footer_bot}>
                <ul>
                    <li><FilePdfOutlined />PDF  презентация</li>
                    <li><VideoCameraOutlined />Видео инструкция </li>
                    <li><InfoCircleOutlined />FAQ</li>
                    <li><YoutubeOutlined />Мы на YouTube</li>
                    <li>Политика конфиденциальности </li>
                    <li>Лицензионное соглашение</li>
                </ul>
                <p>Настоящая Политика обработки персональных данных разработана в соответствии с Конституцией Российской Федерации, Трудовым кодексом Российской Федерации, Гражданским кодексом Российской Федерации, Федеральным законом от 27 июля 2006 года 149-ФЗ "Об информации, информационных технологиях и о защите информации",</p>
                <div>
                    <img src={gostLogo} alt="" />
                    <h1>Разработка платформы</h1>
                </div>
            </div>
        </footer>
    )
}
export default FooterComponent