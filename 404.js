import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className={styles.container}>
            <h1>404 - Страница не найдена</h1>
            <p>К сожалению, мы не смогли найти страницу, которую вы ищете.</p>
            <Link href="/">
                <a>Вернуться на главную страницу</a>
            </Link>
        </div>
    );
};

export default Custom404;