import { FC, ReactNode } from "react";
import classes from './Mainbtn.module.scss'
type Props = {
    icon?: ReactNode,
    title: string,
    size?: number,
}
const MainBtn: FC<Props> = ({ icon, title, size }) => {
    return (
        <button style={size ? { height: size + 'px' } : {}} className={classes.button}>
            {icon}
            {title}
        </button>
    )
}
export default MainBtn