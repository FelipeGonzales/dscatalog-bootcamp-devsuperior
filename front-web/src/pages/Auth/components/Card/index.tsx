import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
}
const AuthCard = ({ children, title }: Props) => {
    return (
        <div className="card-base auth-card">
            <h1 className="auth-card-title">
                {title}
            </h1>
            {children}
        </div>
    )
}

export default AuthCard;