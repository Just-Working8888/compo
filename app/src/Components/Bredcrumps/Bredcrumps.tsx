import { FC } from "react";
import classes from './Bredcrumps.module.scss'
import { Link } from "react-router-dom";

type Props = {
    title: string
    href: string
}
type Data = {
    data: Props[]
}
const BredcrumpsItem: FC<Props> = ({ title, href }) => {


    return (
        <Link to={href} className={classes.bredcrumpsItem}>
            / {title}
        </Link>
    );
};

const Bredcrumps: FC<Data> = ({ data }) => {


    return (
        <div className={classes.bredcrumps}>
            {
                data.map((item, index) => <BredcrumpsItem key={index} title={item.title} href={item.href} />)
            }
        </div >
    );
};

export default Bredcrumps;
